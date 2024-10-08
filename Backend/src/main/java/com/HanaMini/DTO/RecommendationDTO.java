package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationDTO {
  private String recommendationDate; // 추천 생성 날짜
  private List<RecommendedInsuranceInfoDTO> insuranceList; // 보험 상품 정보 리스트
}
