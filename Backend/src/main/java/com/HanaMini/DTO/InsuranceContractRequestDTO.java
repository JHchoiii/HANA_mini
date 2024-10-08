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
public class InsuranceContractRequestDTO {
  private String insuranceId;
  private String memberId;
  private Integer totalPremium;
  private String insuredPerson;
  private String insuredPersonId;
  private String contractor;
  private Integer contractDays;
  private Map<String, Object> additionalInformation;  // vehicleNumber 등
}
