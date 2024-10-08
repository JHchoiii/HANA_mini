package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FraudPredictionResultDTO {
  private String claimId;
  private double fraudProbability;
  private int isFraud;
  private int claimDelayDays;
  private double claimsRatio; // 계약 청구 수 비율
  private double fraudCountRatio; // 회원 사기 횟수 비율
}
