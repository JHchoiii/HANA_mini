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
public class ClaimDTO {
  private String claimId;
  private String memberId;
  private String status;
  private String selectedInsurance;
  private String accidentDate;
  private String description;
  private String documentIssuer; // 추가된 필드
  private List<DocumentDTO> documents; // 첨부 서류 리스트

  private String contractId;
  private String claimDetails;
  private String reportedDate; // ISO 형식의 문자열로 변환
  private String claimType;

  private String fraudScore;
  private String isFraud;
  private String estimatedFraud;
  private Double rule1Score;
  private Double rule2Score;
  private Double rule3Score;
  private Double rule4Score;
  private Double rule5Score;
  private Double rule6Score;
}
