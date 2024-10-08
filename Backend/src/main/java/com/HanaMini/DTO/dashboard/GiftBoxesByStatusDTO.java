package com.HanaMini.DTO.dashboard;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GiftBoxesByStatusDTO {
  private String registrationStatus;
  private Long count;
}