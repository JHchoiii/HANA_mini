package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStatsDTO {
  private Long totalClaims;
  private Long fraudClaims;
  private Long totalMembers;
  private Long totalGiftBoxesSent;
  private Long totalGiftBoxesReceived;
  private Long activeContracts;
  private Double averageReviewScore;
}