package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SignalMessage {
  private String type;
  private String roomId;
  private String sender;
  private String data;
  private String clientId; // 클라이언트 고유 ID 추가

}
