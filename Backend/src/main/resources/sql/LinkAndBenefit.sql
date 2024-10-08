-- 장기 보험 (운전자종합상해보험) 삽입
INSERT INTO Insurance_Product (insurance_id, insurance_name, base_price, insurance_category, insurance_type, product_type, payment_type, daily_price, monthly_price, description)
VALUES ('LINS010201', '운전자종합상해보험', 500000, '상해', '장기', '종합', '월별', 0, 50000, '운전자를 위한 종합 상해 보험입니다.');

-- 혜택 대상 보험 상품 (LINS010301 - 하나로 가득담은 종합 건강보험) 삽입
INSERT INTO Insurance_Product (insurance_id, insurance_name, base_price, insurance_category, insurance_type, product_type, payment_type, daily_price, monthly_price, description)
VALUES ('LINS010301', '하나로 가득담은 종합 건강보험', 700000, '건강', '장기', '종합', '월별', 0, 70000, '종합 건강 보장 보험입니다.');

-- InsuranceLink (원데이 운전자보험과 연계된 장기 보험) 삽입
INSERT INTO Insurance_Link (link_id, long_term_insurance_id)
VALUES ('LINK001', 'LINS010301');

-- 연계된 미니 보험의 이름들 추가 (원데이 운전자보험)
INSERT INTO Insurance_Link_Insurance_Name (link_id, insurance_name)
VALUES ('LINK001', '원데이 운전자보험');

-- 혜택 정의 (5번 가입 시 포인트 혜택)
INSERT INTO SCOTT.INSURANCE_LINK_BENEFIT (benefit_id, link_id, benefit_content, benefit_type, benefit_value, min_count)
VALUES ('BENEFIT001', 'LINK001', '포인트 500 적립', '포인트', 500, 5);

-- 혜택 정의 (10번 가입 시 캐쉬백 혜택)
INSERT INTO SCOTT.INSURANCE_LINK_BENEFIT (benefit_id, link_id, benefit_content, benefit_type, benefit_value, min_count)
VALUES ('BENEFIT002', 'LINK001', '캐쉬백 10000원', '캐쉬백', 10000, 10);

-- 장기 보험 (하나로 가득담은 종합 건강보험) 삽입 (이미 위에서 삽입되었으므로 중복된 내용은 무시 가능)
INSERT INTO Insurance_Product (insurance_id, insurance_name, base_price, insurance_category, insurance_type, product_type, payment_type, daily_price, monthly_price, description)
VALUES ('LINS010301', '하나로 가득담은 종합 건강보험', 700000, '건강', '장기', '종합', '월별', 0, 70000, '종합 건강 보장 보험입니다.');

-- InsuranceLink (미니 암보험, 미니 치아보험, 미니 Grade 건강보험과 연계된 장기 보험) 삽입
INSERT INTO Insurance_Link (link_id, long_term_insurance_id)
VALUES ('LINK002', 'LINS010301');

-- 연계된 미니 보험의 이름들 추가 (미니 암보험, 미니 치아보험, 미니 Grade 건강보험)
INSERT INTO Insurance_Link_Insurance_Name (link_id, insurance_name)
VALUES ('LINK002', '미니 암보험');
INSERT INTO Insurance_Link_Insurance_Name (link_id, insurance_name)
VALUES       ('LINK002', '미니 치아보험');
INSERT INTO Insurance_Link_Insurance_Name (link_id, insurance_name)
 VALUES      ('LINK002', '미니 Grade 건강보험');

-- 혜택 정의 (각 미니 보험 1번씩 가입 시 혜택)
INSERT INTO SCOTT.INSURANCE_LINK_BENEFIT (benefit_id, link_id, benefit_content, benefit_type, benefit_value, min_count)
VALUES ('BENEFIT003', 'LINK002', '종합 건강보험 혜택 제공', '특약 무료', NULL, 1);


