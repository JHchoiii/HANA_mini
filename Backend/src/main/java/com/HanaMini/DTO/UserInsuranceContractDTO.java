package com.HanaMini.DTO;

import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInsuranceContractDTO {
  private String contractId; // Contract ID
  private String productName; // 보험상품명
  private String insuredPerson; // 피보험자
  private String insurancePeriod; // 보험기간 (시작일 - 종료일)
  private String status; // 계약상태 (정상, 종료, 만료 등)
  private Integer currentPremium;
  private Integer totalPremium; // 보험료
  private String terms; // 약관
  private String insuranceType; // 보험 유형 ('장기', '미니')
  private Map<String, Object> additionalInformation;; // 추가 상세 정보
  private Boolean isReviewed;
}
