package com.HanaMini.DTO;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecommendedInsuranceGroupDTO {
  private String recommendationGroupId; // 추가
  private LocalDateTime recommendationDate;
  private String recommendationName;
  private List<RecommendedInsuranceInfoDTO> insuranceList;
}
