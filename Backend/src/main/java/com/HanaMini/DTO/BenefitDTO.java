package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BenefitDTO {
  private String benefitId;
  private String benefitContent;
  private String benefitType;
  private Integer benefitValue;
}
