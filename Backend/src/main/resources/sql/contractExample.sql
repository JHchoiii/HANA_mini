INSERT INTO insurance_contract (
    CONTRACT_ID,
    CONTRACTOR,
    CURRENT_PREMIUM,
    END_DATE,
    INSURANCE_ID,
    INSURED_PERSON,
    LAST_PAYMENT_DATE,
    MEMBER_ID,
    SPECIAL_CONTRACT_STATUS,
    START_DATE,
    STATUS,
    TOTAL_PREMIUM,
    IS_GIFT,
    CONTRACT_DAYS,
    ADDITIONAL_INFORMATION
)
VALUES (
           '32510-100',
           '최배달',
           10000,
           TIMESTAMP '2024-01-02 00:00:00',
           'LINS010201',  -- 올바른 insurance_id로 수정
           'a',
           TIMESTAMP '2024-01-01 00:00:00',
           'a',
           0,
           TIMESTAMP '2024-01-01 00:00:00',
           '만기',
           10000,
           0,
           365,
           NULL
       );


INSERT INTO insurance_contract (
    CONTRACT_ID,
    CONTRACTOR,
    CURRENT_PREMIUM,
    END_DATE,
    INSURANCE_ID,
    INSURED_PERSON,
    LAST_PAYMENT_DATE,
    MEMBER_ID,
    SPECIAL_CONTRACT_STATUS,
    START_DATE,
    STATUS,
    TOTAL_PREMIUM,
    IS_GIFT,
    CONTRACT_DAYS,
    ADDITIONAL_INFORMATION
)
VALUES (
           '32510-100',
           '최배달',
           10000,
           TIMESTAMP '2025-01-01 00:00:00',
           'INS010303',  -- 올바른 insurance_id로 수정
           'a',
           TIMESTAMP '2024-01-01 00:00:00',
           'a',
           0,
           TIMESTAMP '2024-01-01 00:00:00',
           '등록',
           10000,
           0,
           365,
           NULL
       );
