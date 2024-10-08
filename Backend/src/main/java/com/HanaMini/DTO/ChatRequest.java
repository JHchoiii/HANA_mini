package com.HanaMini.DTO;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequest {

  @NotBlank(message = "User input must not be blank")
  private String userInput;
  @Valid
  private List<ChatMessage> chatHistory;

  @Data
  @Builder
  @AllArgsConstructor
  @NoArgsConstructor
  public static class ChatMessage {

    private String sender;
    private String text;
  }
}
