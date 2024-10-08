package com.HanaMini.controller;

import com.HanaMini.DTO.ChatRequest;
import com.HanaMini.DTO.ChatResponse;
import com.HanaMini.service.GptService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
@Validated
public class GptController {

  @Autowired
  private GptService chatService;

  @PostMapping
  public ResponseEntity<ChatResponse> chatWithGPT(@Valid @RequestBody ChatRequest chatRequest) {
    ChatResponse chatResponse = chatService.getChatResponse(chatRequest);
    return new ResponseEntity<>(chatResponse, HttpStatus.OK);
  }
}
