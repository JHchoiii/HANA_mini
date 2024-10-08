
------------ 자동차 보험 --------------


-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010105', '미니 이륜차 보험', 18000, '미니', '이륜차형', '일납', 0, 0, '이륜차를 위한 미니 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010105', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010105', '이륜차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010105', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010105', '운전자보험');
-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010106', '자전거 / 킥보드 보험', 12000, '미니', '레저형', '일납', 0, 0, '자전거 및 킥보드를 위한 전용 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010106', '자전거');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010106', '킥보드');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010106', '레저보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010106', '미니형');
-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010107', '미니 전기 자동차 보험', 22000, '미니', '전기차형', '일납', 0, 0, '전기차 전용 미니 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010107', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010107', '전기차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010107', '친환경');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010107', '미니형');
-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010108', '미니 에코플러스 자동차 보험', 25000, '미니', '에코플러스형', '일납', 0, 0, '에코플러스 자동차를 위한 친환경 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010108', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010108', '에코플러스');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010108', '친환경');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010108', '미니형');

INSERT INTO Member (member_id,  password, name, identification_number, birth_date, gender, phone_number, email)
VALUES ('a',  'a', '최배달', '9609291111111', '960929', 'M', '010-1234-5678', 'hong@example.com');

-- 첫 번째 보험: 종합형
-- 첫 번째 보험: 종합형
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010101', '원데이 자동차 보험', 11530, '미니', '종합형', '일납', 5300, NULL, '원데이 자동차 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010101', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010101', '종합형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010101', '단기');

-- 두 번째 보험: 기초형
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010102', '원데이 자동차 보험', 8750, '미니', '기초형', '일납', 4000, NULL, '원데이 자동차 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010102', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010102', '기초형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010102', '단기');

-- 세 번째 보험: 최소형
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010103', '원데이 자동차 보험', 7000, '미니', '최소형', '일납', 3200, NULL, '원데이 자동차 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010103', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010103', '최소형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010103', '단기');

-- 네 번째 보험: 차량손배형
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010104', '원데이 자동차 보험', 1750, '미니', '차량손배형', '일납', 800, NULL, '원데이 자동차 보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010104', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010104', '차량손배형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010104', '단기');






------------ 건강 보험 --------------


-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010301', '하나로 다모은 종합 건강보험', 50000, '미니', 'Premium', '일괄', 0, 0, '종합 건강보장을 제공하는 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010302', '하나로 다모은 종합 건강보험', 40000, '미니', 'Basic', '일괄', 0, 0, '기본적인 건강보장을 제공하는 상품입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010301', '종합형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010301', '건강보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010301', '가족형');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010302', '종합형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010302', '건강보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010302', '기본형');

-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010303', '미니 암보험', 30000, '미니', '최소형', '일납', 0, 0, '암에 대한 최소 보장을 제공하는 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010304', '미니 암보험', 50000, '미니', '최대형', '일납', 0, 0, '암에 대한 최대 보장을 제공하는 상품입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010303', '암보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010303', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010303', '최소형');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010304', '암보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010304', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010304', '최대형');


-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010305', '미니 치아보험', 15000, '미니', '기본형', '일납', 0, 0, '기본적인 치아 치료를 보장하는 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010306', '미니 치아보험', 25000, '미니', '프리미엄형', '일납', 0, 0, '프리미엄 치아 치료를 보장하는 상품입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010305', '치아보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010305', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010305', '기본형');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010306', '치아보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010306', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010306', '프리미엄형');


-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010307', '간편 3대 질환 보험', 40000, '미니', '노멀형', '일납', 0, 0, '3대 질병을 보장하는 기본 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010308', '간편 3대 질환 보험', 60000, '미니', '프리미엄형', '일납', 0, 0, '3대 질병을 더 강화하여 보장하는 프리미엄 상품입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010307', '질병보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010307', '3대질환');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010307', '노멀형');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010308', '질병보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010308', '3대질환');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010308', '프리미엄형');

-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010309', '미니 Grade 건강보험', 20000, '미니', 'Grade1', '일괄', 0, 0, '1년간 보장되는 건강보험 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010310', '미니 Grade 건강보험', 26000, '미니', 'Grade2', '일괄', 0, 0, '1년간 보장되는 건강보험 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010311', '미니 Grade 건강보험', 33000, '미니', 'Grade3', '일괄', 0, 0, '1년간 보장되는 건강보험 상품입니다.'
       );

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010312', '미니 Grade 건강보험', 37500, '미니', 'Grade4', '일괄', 0, 0, '1년간 보장되는 건강보험 상품입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010309', 'Grade1');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010309', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010309', '건강보험');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010310', 'Grade2');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010310', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010310', '건강보험');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010311', 'Grade3');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010311', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010311', '건강보험');

INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010312', 'Grade4');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010312', '미니형');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010312', '건강보험');


-- 보험 정보 삽입
INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010313', '하나 가득담은 3.2.5 미니건강보험', 30000, '미니', '3.0.0', '일납', 0, 0, '1년간 보장되는 미니 건강보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010313', '3.0.0');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010313', '건강보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010313', '미니형');

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010314', '하나 가득담은 3.2.5 미니건강보험', 40000, '미니', '3.0.5', '일납', 0, 0, '1년간 보장되는 미니 건강보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010314', '3.0.5');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010314', '건강보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010314', '미니형');

INSERT INTO Insurance_product (
    insurance_id, insurance_name, base_price, insurance_type, product_type, payment_type, daily_price, monthly_price, description
)
VALUES (
           'INS010315', '하나 가득담은 3.2.5 미니건강보험', 40000, '미니', '3.2.5', '일납', 0, 0, '1년간 보장되는 미니 건강보험입니다.'
       );

-- 태그 삽입
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010315', '3.2.5');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010315', '건강보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010315', '미니형');



------------ 운전자 보험 --------------


-- 첫 번째 보험
INSERT INTO Insurance_Product (insurance_id, insurance_name, base_price, insurance_category, insurance_type, product_type, payment_type, daily_price, monthly_price, description)
VALUES ('INS010201', '원데이 운전자보험', 20000, '운전자', '미니', '기본형', '일납', 1500, 20000, '하루 보험으로 간편하게 운전자 보호');

-- 첫 번째 보험 태그
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010201', '운전자');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010201', '일시납');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010201', '하루보험');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010201', '자동차');

-- 두 번째 보험
INSERT INTO Insurance_Product (insurance_id, insurance_name, base_price, insurance_category, insurance_type, product_type, payment_type, daily_price, monthly_price, description)
VALUES ('INS010202', '미니 하나 가득 담은 운전자 보험', 30000, '운전자', '미니', '프리미엄형', '일납', 2500, 30000, '운전자 보호를 위한 프리미엄 보험');

-- 두 번째 보험 태그
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010202', '운전자');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010202', '프리미엄');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010202', '자동차');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010202', '종합형');

-- 세 번째 보험
INSERT INTO Insurance_Product (insurance_id, insurance_name, base_price, insurance_category, insurance_type, product_type, payment_type, daily_price, monthly_price, description)
VALUES ('INS010203', '라이더+오토바이 운전자', 15000, '운전자', '미니', '기본형', '일납', 1200, 15000, '라이더 및 오토바이를 위한 운전자 보험');

-- 세 번째 보험 태그
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010203', '운전자');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010203', '오토바이');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010203', '라이더');
INSERT INTO insurance_tags (insurance_id, tag) VALUES ('INS010203', '자동차');
