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
public class RecommendedInsuranceSaveRequestDTO {
  private String memberId; // 저장할 사용자의 ID
  private List<RecommendedInsuranceInfoDTO> recommendations; // 추천 보험 리스트
}
