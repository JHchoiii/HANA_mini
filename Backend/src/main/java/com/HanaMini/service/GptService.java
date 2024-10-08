// src/main/java/com/HanaMini/service/GptService.java

package com.HanaMini.service;

import com.HanaMini.DTO.ChatRequest;
import com.HanaMini.DTO.ChatResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GptService {

  @Value("${openai.api.key}")
  private String openaiApiKey;

  @Value("${openai.api.url}")
  private String openaiApiUrl;

  @Value("${openai.model}")
  private String openaiModel;

  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;

  public GptService() {
    this.restTemplate = new RestTemplate();
    this.objectMapper = new ObjectMapper();
  }

  public ChatResponse getChatResponse(ChatRequest chatRequest) {
    // Prepare messages for OpenAI API
    List<Map<String, String>> messages = new ArrayList<>();

    // 시스템 메시지 추가
    Map<String, String> systemMessage = new HashMap<>();
    systemMessage.put("role", "system");
    systemMessage.put("content", "너는 숙련된 보험 전문가야. 사용자가 국내 여행 관련 질문을 하면, 해당 여행지나 상황에 맞는 보험 상품을 최대 3가지 정도 추천해 주는 역할을 해. 각 추천 항목은 카테고리, 보험 상품 이름, 간단한 설명을 포함해야 해. 또한 product_name은 [원데이 자동차 보험, 자전거 / 킥보드 보험, 미니 이륜차 보험, 미니 전기차 보험, 원데이 운전자 보험, 미니 국내 여행자 보험, 원데이 하나 골프 보험, 투데이 레저 보험] 이 리스트 안에서 카테고리에 맞게 보험을 추천해줘야해. 카테고리 즉 category는 [자동차, 운전자, 여행, 골프, 여행자, 액티비티] 이 리스트 안에서 알맞게 설정해서 지정하고 이에 맞게 적당한 구어체의 description을 예시와 같이 만들어. 또한 text에 구어체 한문장으로 국내 여행에 대한 보험은 다음과 같은게 있다는 문구를 만들어서 text에 넣어. 응답은 다음과 같은 JSON 형식으로 반환해: { \"text\":\"요청된 문장\", \"recommendations\": [ { \"category\": \"카테고리1\", \"product_name\": \"보험 상품 이름1\", \"description\": \"보험 상품 설명1\" }, { \"category\": \"카테고리2\", \"product_name\": \"보험 상품 이름2\", \"description\": \"보험 상품 설명2\" }, { \"category\": \"카테고리3\", \"product_name\": \"보험 상품 이름3\", \"description\": \"보험 상품 설명3\" } ] } **예시:** **사용자 질문:** 제주도 여행갈 때 보험 어떤 게 필요할까? **응답:** { \"text\":\"제주도 여행을 떠나시군요! 국내 여행시 많이 이용되고 추천되는 보험은 다음과 같습니다.\", \"recommendations\": [ { \"category\": \"자동차\", \"product_name\": \"원데이 자동차 보험\", \"description\": \"제주도에서 렌트카 이용할 때 필수적인 원데이 자동차 보험입니다.\" }, { \"category\": \"여행자\", \"product_name\": \"미니 국내 여행자 보험\", \"description\": \"제주도 여행 중 발생할 수 있는 다양한 사고와 상황에 대비하는 보험입니다.\" }, { \"category\": \"액티비티\", \"product_name\": \"투데이 레저 보험\", \"description\": \"제주도에서의 다양한 레저 활동 중 발생할 수 있는 사고를 보장합니다.\" } ] }");
    messages.add(systemMessage);

    // 채팅 히스토리 추가
    if (chatRequest.getChatHistory() != null) {
      for (ChatRequest.ChatMessage msg : chatRequest.getChatHistory()) {
        Map<String, String> userOrAssistantMessage = new HashMap<>();
        userOrAssistantMessage.put("role", msg.getSender().equals("user") ? "user" : "assistant");
        userOrAssistantMessage.put("content", msg.getText());
        messages.add(userOrAssistantMessage);
      }
    }

    // 사용자 메시지 추가
    Map<String, String> userMessage = new HashMap<>();
    userMessage.put("role", "user");
    userMessage.put("content", chatRequest.getUserInput());
    messages.add(userMessage);

    // OpenAI API 요청 본문 준비
    Map<String, Object> requestBody = new HashMap<>();
    requestBody.put("model", openaiModel);
    requestBody.put("messages", messages);
    requestBody.put("max_tokens", 500); // 응답 길이에 따라 조정 가능
    requestBody.put("temperature", 0.7); // 창의성 조절

    // HTTP 헤더 설정
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);
    headers.setBearerAuth(openaiApiKey);

    HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

    // OpenAI API 호출
    ResponseEntity<String> responseEntity = restTemplate.exchange(
        openaiApiUrl,
        HttpMethod.POST,
        entity,
        String.class
    );

    // 응답 처리
    if (responseEntity.getStatusCode() == HttpStatus.OK) {
      String responseBody = responseEntity.getBody();
      try {
        JsonNode root = objectMapper.readTree(responseBody);
        JsonNode choices = root.path("choices");
        if (choices.isArray() && choices.size() > 0) {
          JsonNode messageNode = choices.get(0).path("message");
          String assistantText = messageNode.path("content").asText();

          // JSON 형식으로 응답을 반환한다고 가정
          ChatResponse chatResponse = objectMapper.readValue(assistantText, ChatResponse.class);
          return chatResponse;
        }
      } catch (Exception e) {
        e.printStackTrace();
      }
    }

    // 기본 응답
    ChatResponse chatResponse = new ChatResponse();
    chatResponse.setText("죄송합니다. 이해하지 못했습니다.");
    chatResponse.setRecommendations(new ArrayList<>());
    return chatResponse;
  }
}
