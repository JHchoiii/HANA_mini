package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MyInsuranceDTO {
  private String productName;
  private String contractNumber;
  private String insuredPerson;
  private String insurancePeriod;
  private String status;
  private String startDate;
}
