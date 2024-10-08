-- 추천 그룹 (InsuranceRecGroup) 삽입
INSERT INTO Insurance_Rec_Group (recommendation_group_id, member_id, recommendation_name, recommendation_date)
VALUES ('rec_group_001', 'member001', '2024년 9월 추천', '2024-09-11');

-- 고객 맞춤 추천 데이터 삽입
INSERT INTO Insurance_Rec_Details (recommendation_id, insurance_id, recommendation_type, description)
VALUES ('rec_group_001', 'INS010301', '고객 맞춤 추천', '하나로 다모은 종합 건강보험 - 종합 건강보장을 제공하는 상품입니다.');

INSERT INTO Insurance_Rec_Details (recommendation_id, insurance_id, recommendation_type, description)
VALUES ('rec_group_001', 'INS010315', '고객 맞춤 추천', '하나 가득담은 3.2.5 미니건강보험 - 1년간 보장되는 미니 건강보험입니다.');

INSERT INTO Insurance_Rec_Details (recommendation_id, insurance_id, recommendation_type, description)
VALUES ('rec_group_001', 'INS010314', '고객 맞춤 추천', '하나 가득담은 3.2.5 미니건강보험 - 1년간 보장되는 미니 건강보험입니다.');

-- AI 기반 추천 데이터 삽입
INSERT INTO Insurance_Rec_Details (recommendation_id, insurance_id, recommendation_type, description)
VALUES ('rec_group_001', 'INS010313', 'AI 기반 추천', '하나 가득담은 3.2.5 미니건강보험 - 1년간 보장되는 미니 건강보험입니다.');

INSERT INTO Insurance_Rec_Details (recommendation_id, insurance_id, recommendation_type, description)
VALUES ('rec_group_001', 'INS010312', 'AI 기반 추천', '미니 Grade 건강보험 - 1년간 보장되는 건강보험 상품입니다.');

INSERT INTO Insurance_Rec_Details (recommendation_id, insurance_id, recommendation_type, description)
VALUES ('rec_group_001', 'INS010311', 'AI 기반 추천', '미니 Grade 건강보험 - 1년간 보장되는 건강보험 상품입니다.');
