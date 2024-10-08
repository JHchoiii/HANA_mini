package com.HanaMini.DTO.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClaimsOverTimeDTO {
  private String month; // 예: "2024-01"
  private Long claimCount;
}