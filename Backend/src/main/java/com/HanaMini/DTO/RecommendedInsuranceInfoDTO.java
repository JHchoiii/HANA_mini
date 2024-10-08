package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommendedInsuranceInfoDTO {
  private String insuranceId; // 보험 ID
  private String productName; // 보험 상품명
  private String type; //
  private String description; // 보험 설명
  private String recommendationType; // 추천 유형 (고객 맞춤 추천 or AI 기반 추천)
}