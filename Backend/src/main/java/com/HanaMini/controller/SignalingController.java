package com.HanaMini.controller;

import com.HanaMini.DTO.SignalMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
public class SignalingController {

  private final SimpMessageSendingOperations messagingTemplate;

  public SignalingController(SimpMessageSendingOperations messagingTemplate) {
    this.messagingTemplate = messagingTemplate;
  }

  @MessageMapping("/signal")
  public void signaling(@Payload SignalMessage message) {
    // 대상에게 메시지 전송
    messagingTemplate.convertAndSend("/topic/signal/" + message.getRoomId(), message);
  }
}
