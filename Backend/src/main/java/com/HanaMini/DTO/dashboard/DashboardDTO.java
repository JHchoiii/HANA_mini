// src/main/java/com/HanaMini/dto/DashboardDTO.java

package com.HanaMini.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DashboardDTO {
  // 통계 데이터
  private Long totalMembers;
  private Long totalClaims;
  private Long totalFraudClaims;
  private Long totalGiftBoxes;
  private Long totalContracts;

  // 차트 데이터
  private List<ClaimsOverTimeDTO> claimsOverTime;
  private List<ClaimsByTypeDTO> claimsByType;
  private List<MembersByGenderDTO> membersByGender;
  private List<GiftBoxesByStatusDTO> giftBoxesByStatus;
}
