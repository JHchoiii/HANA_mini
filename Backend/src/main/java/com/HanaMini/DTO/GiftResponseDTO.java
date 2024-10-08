package com.HanaMini.DTO;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GiftResponseDTO {
  private List<ReceivedGiftDTO> receivedGifts;
  private List<SentGiftDTO> sentGifts;
}
