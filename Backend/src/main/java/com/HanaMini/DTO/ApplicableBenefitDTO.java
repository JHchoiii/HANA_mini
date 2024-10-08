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
public class ApplicableBenefitDTO {
  private String benefitId;
  private String benefitType;
  private String benefitContent;
  private Integer benefitValue;
  private List<InsuranceNameCountDTO> contributingInsurances; // Names and counts
  private InsuranceProductDTO longTermInsurance;
}
