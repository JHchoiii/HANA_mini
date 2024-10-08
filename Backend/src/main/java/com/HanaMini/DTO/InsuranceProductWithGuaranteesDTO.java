package com.HanaMini.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsuranceProductWithGuaranteesDTO {

  private String insuranceId;
  private String insuranceName; // 보험 상품명 추가
  private Integer basePrice;
  private Integer dailyIncrease;

  // New fields from InsuranceContract
  private String contractor;        // 계약자
  private String insuredPerson;     // 피보험자
  private Integer totalPremium;     // 총 보험료
  private Integer contractDays;
  private String expirationDate;    // 선물 만료일

  // 보장 내용 (Guarantee)
  @Data
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class GuaranteeDTO {
    private String guaranteeType;       // 보장 유형
    private Integer guaranteeFee;       // 보장 금액
    private String guaranteeContent;    // 보장 내용
  }

  private List<GuaranteeDTO> guarantees;  // 보장 내용 리스트
}
