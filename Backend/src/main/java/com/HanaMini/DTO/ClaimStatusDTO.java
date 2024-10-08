package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClaimStatusDTO {
  private String status; // 승인 완료, 승인 대기, 거부
  private Long count;
}
