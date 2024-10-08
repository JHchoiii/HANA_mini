package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SentGiftDTO {
  private String giftId;
  private String receiverId;
  private String giftMsg;
  private String contractId;
  private String registrationStatus;
  private String productName; // 추가
  private String contractor;  // 추가
  private String insuredPerson;
  private String lastPaymentDate;
}
