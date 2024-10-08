from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import torch
from recbole.config import Config
from recbole.data import create_dataset, data_preparation
from recbole.data.interaction import Interaction
from recbole.model.general_recommender import BPR
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os
import lightgbm as lgb
import pandas as pd
from typing import Optional

# 요청과 응답 모델 정의
class RecommendationRequest(BaseModel):
    user_id: str

class RecommendationResponse(BaseModel):
    insurance_ids: List[str]

# FastAPI 앱 생성
app = FastAPI()

# 1. 모델과 데이터셋 로드 함수 정의
def load_bpr_model(config_path, model_path):
    config = Config(model='BPR', config_file_list=[config_path])
    dataset = create_dataset(config)
    train_data, valid_data, test_data = data_preparation(config, dataset)

    # BPR 모델 로드
    model = BPR(config, train_data.dataset).to(config['device'])
    
    # 모델 파라미터 로드
    checkpoint = torch.load(model_path, map_location=config['device'])
    model.load_state_dict(checkpoint['state_dict'])  # 파라미터만 로드
    
    return model, dataset


# 모델 및 데이터셋 경로 설정 (Colab에서 가져온 모델과 설정 파일 경로)
config_path = 'config.yaml'  # Colab에서 다운로드한 config.yaml 파일 경로
model_path = 'BPR-Sep-17-2024_07-32-08.pth'  # Colab에서 저장한 모델 파일 경로

# 2. 서버 시작 시 모델과 데이터셋 로드
model, dataset = load_bpr_model(config_path, model_path)

def recommend_top3_for_user(user_id, model, dataset, k=3):
    model.eval()  # 모델을 평가 모드로 전환
    user_idx = dataset.field2token_id['user_id'][user_id]  # 유저 ID를 인덱스로 변환

    # 유저가 이미 가입한 보험 상품 추출 (인덱스를 실제 보험 ID로 변환)
    interacted_items_idx = list(set(dataset.inter_feat[dataset.inter_feat['user_id'] == user_idx]['insurance_id'].tolist()))
    interacted_items = [dataset.id2token('insurance_id', idx) for idx in interacted_items_idx]  # 인덱스를 보험 ID로 변환
    print(f"Interacted items for user {user_id}: {interacted_items}")  # 이미 가입한 아이템 출력

    # 모든 보험 상품 ID 중에서 유저가 가입하지 않은 상품만을 후보로 설정
    all_items = list(dataset.field2token_id['insurance_id'].keys())  # 모든 보험 상품 ID
    candidate_items = [item for item in all_items if item not in interacted_items and item != '[PAD]']  # 가입하지 않은 상품 필터링
    print(f"Candidate items: {candidate_items}")  # 후보 아이템 출력

    # Interaction 객체로 변환
    interaction = Interaction({'user_id': torch.tensor([user_idx], device=model.device)})

    # BPR 모델로 점수 계산 (아이템 전체에 대한 점수를 계산)
    scores = model.full_sort_predict(interaction)

    # 점수를 Numpy 배열로 변환
    scores = scores.cpu().detach().numpy().flatten()

    # 모든 아이템에 대한 점수 확인
    item_scores = {item: scores[i] for i, item in enumerate(all_items) if item != '[PAD]'}  # [PAD] 제거
    print(f"Scores: {item_scores}")  # 모든 아이템에 대한 점수 출력

    # 점수가 높은 순으로 정렬된 아이템 리스트
    top_k_items_idx = scores.argsort()[::-1]  # 점수가 높은 순으로 정렬
    top_k_items = [all_items[i] for i in top_k_items_idx if all_items[i] not in interacted_items and all_items[i] != '[PAD]']

    # 우선순위 항목 (INS010312 > INS010311 > INS010310 > INS010309)에서 하나만 선택
    conflict_items_priority = ['INS010312', 'INS010311', 'INS010310', 'INS010309']
    selected_conflict_item = None

    # 우선순위대로 첫 번째 추천 가능한 아이템 선택
    for item in conflict_items_priority:
        if item in top_k_items:
            selected_conflict_item = item
            top_k_items.remove(item)  # 이미 추천된 아이템은 리스트에서 제거
            break

    # 우선순위 아이템을 추가하고, 나머지 항목 중 상위 점수 아이템들을 가져옴
    final_recommendations = []
    if selected_conflict_item:
        final_recommendations.append(selected_conflict_item)  # 우선순위 항목 추가
        remaining_items = [item for item in top_k_items if item not in conflict_items_priority]  # 나머지 후보 중 우선순위 항목 제외
        final_recommendations.extend(remaining_items[:k-1])  # 나머지 항목 추가 (총 k개의 항목)
    else:
        final_recommendations.extend(top_k_items[:k])  # 우선순위 항목이 없을 때

    # 추천된 아이템과 점수 함께 출력
    final_recommendations_with_scores = {item: item_scores[item] for item in final_recommendations}
    print(f"Final recommendations (with scores): {final_recommendations_with_scores}")  # 최종 추천 결과와 점수

    return final_recommendations_with_scores


class UserResponses(BaseModel):
    answers: list[int] # 사용자가 선택한 답변 리스트 (예: [1, 2, 3, 3])

# 4. FastAPI 엔드포인트: 추천 요청
@app.post("/get-recommendations/", response_model=RecommendationResponse)
def get_recommendations(request: RecommendationRequest):
    user_id = request.user_id
    recommended_items_with_scores = recommend_top3_for_user(user_id, model, dataset, k=3)
    recommended_ids = list(recommended_items_with_scores.keys())  # 추천된 아이템의 ID 목록
    return RecommendationResponse(insurance_ids=recommended_ids)


##########################################################################################################################


# 보험 상품 벡터 (원핫 인코딩된 값, 각 질문에 대해 4개의 선택지가 있다고 가정)
insurance_vectors = {
    'INS010301': np.array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]),
    'INS010302': np.array([0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]),
    'INS010303': np.array([0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0]),
    'INS010304': np.array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0]),
    'INS010305': np.array([1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0]),
    'INS010306': np.array([0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0]),
    'INS010307': np.array([0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0]),
    'INS010308': np.array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0]),
    'INS010309': np.array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0]),
    'INS010310': np.array([0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]),
    'INS010311': np.array([0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0]),
    'INS010312': np.array([0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0]),
    'INS010313': np.array([1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]),
    'INS010314': np.array([0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0]),
    'INS010315': np.array([0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0]),
    'INS010316': np.array([0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0]),
    'INS010317': np.array([1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0]),
    'INS010318': np.array([0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0]),
}

# 원핫 인코딩 함수
def one_hot_encode(answers, num_choices=4):
    encoded = []
    for answer in answers:
        one_hot = [0] * num_choices
        one_hot[answer - 1] = 1  # answer는 1-based index로, 이를 0-based로 맞춤
        encoded.extend(one_hot)
    return np.array(encoded)

# 사용자 응답을 기반으로 코사인 유사도를 계산하여 보험 추천
@app.post("/get-recommendations-cos")
async def get_recommendations_cos(user_responses: UserResponses):
    # 사용자의 응답을 원핫 인코딩으로 변환
    user_responses_encoded = one_hot_encode(user_responses.answers)

    # 코사인 유사도를 계산하고 유사도 높은 순서대로 정렬
    similarities = {}
    for name, vector in insurance_vectors.items():
        sim = cosine_similarity([user_responses_encoded], [vector])[0][0]
        similarities[name] = sim

    # 유사도가 가장 높은 상위 3개의 보험을 반환
    top_recommendations = sorted(similarities.items(), key=lambda item: item[1], reverse=True)[:3]
    top_recommendation_ids = [insurance_id for insurance_id, _ in top_recommendations]
    print(top_recommendation_ids)
    return {"insurance_ids": top_recommendation_ids}

##########################################################################################################################

def load_lgb(lgb_model_path): 
    # LightGBM 모델 로드
    LGBM = lgb.Booster(model_file=lgb_model_path)
    return LGBM

# 애플리케이션 시작 시 모델 로드
LGBM = load_lgb('lightgbm_model2.txt')  # 실제 모델 파일 경로로 변경하세요.

# Pydantic 모델 정의 (모든 피처가 숫자 형태로 들어옴)
class FeatureData(BaseModel):
    fraud_count: int
    claim_frequency: float
    email_dup_count: int
    issuer_dup_count: int
    claim_delay_days: int
    quick_claims_flag: int
    age: int
    accident_month: int
    # accident_dayofweek: int
    contract_id: int
    document_issuer: int
    email: int
    insurance_id: int
    claim_type: int
    status_x: int
    status_y: int
    rule1_score: float
    rule2_score: float
    rule3_score: float
    rule4_score: float
    rule5_score: float
    rule6_score: float
    identification_number: int
    gender: int
    point: float
    total_premium: float
    is_reviewed: int
    # documents: int
    quick_claim: int
    contract_days: int
    claim_count: int

@app.post("/predict")
def predict_fraud(feature_data: FeatureData):
    try:
        # 입력 데이터를 DataFrame으로 변환
        df = pd.DataFrame([feature_data.dict()])

        df = df.sort_index(axis=1).reset_index(drop=True)

        # 입력 데이터를 CSV로 저장 (디버깅 용도)
        csv_filename = f"input_features_{feature_data.contract_id}.csv"
        df.to_csv(csv_filename, index=False)
        print(f"Saved input data to {csv_filename}")
        print(f"df : {df}")        

        # 모델 예측
        y_pred = LGBM.predict(df)[0]  # LightGBM predict는 확률을 반환
        print(y_pred)
        return {"fraud_probability": y_pred}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))