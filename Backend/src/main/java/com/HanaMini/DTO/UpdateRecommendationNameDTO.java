package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateRecommendationNameDTO {
  private String recommendationGroupId; // 변경
  private String newRecommendationName;
}
