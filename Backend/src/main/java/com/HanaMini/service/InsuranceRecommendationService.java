package com.HanaMini.service;

import com.HanaMini.DTO.RecommendationResponse;
import com.HanaMini.DTO.RecommendedInsuranceGroupDTO;
import com.HanaMini.DTO.RecommendedInsuranceInfoDTO;
import com.HanaMini.DTO.RecommendedInsuranceSaveRequestDTO;
import com.HanaMini.DTO.UpdateRecommendationNameDTO;
import com.HanaMini.entity.InsuranceProduct;
import com.HanaMini.entity.InsuranceRecDetails;
import com.HanaMini.entity.InsuranceRecGroup;
import com.HanaMini.repository.InsuranceProductRepository;
import com.HanaMini.repository.InsuranceRecDetailsRepository;
import com.HanaMini.repository.InsuranceRecGroupRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@Service
public class InsuranceRecommendationService {

  private final RestTemplate restTemplate;

  @Autowired
  public InsuranceRecommendationService(RestTemplate restTemplate) {
    this.restTemplate = restTemplate;
  }

  @Autowired
  private InsuranceRecGroupRepository recGroupRepository;

  @Autowired
  private InsuranceRecDetailsRepository recDetailsRepository;

  @Autowired
  private InsuranceProductRepository productRepository;

  public List<String> getRecommendationsFromFastApi(String userId) {
    String fastApiUrl = "http://127.0.0.1:8000/get-recommendations/";

    // 요청 본문 생성
    Map<String, String> requestBody = new HashMap<>();
    requestBody.put("user_id", userId);

    // 요청 헤더 생성
    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    // HttpEntity 객체로 본문과 헤더를 함께 설정
    HttpEntity<Map<String, String>> entity = new HttpEntity<>(requestBody, headers);

    // RestTemplate을 사용하여 POST 요청 전송
    ResponseEntity<RecommendationResponse> response = restTemplate.postForEntity(fastApiUrl, entity, RecommendationResponse.class);

    // 응답 본문에서 보험 ID 리스트 반환
    return response.getBody().getInsuranceIds();
  }

  // FastAPI로 코사인 유사도 기반 맞춤 추천 요청
  public List<String> getCosineRecommendations(List<Integer> answers) {
    String fastApiUrl = "http://127.0.0.1:8000/get-recommendations-cos"; // FastAPI URL

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    // FastAPI로 보낼 JSON 객체 생성
    Map<String, Object> requestBody = new HashMap<>();
    requestBody.put("answers", answers);

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

    // FastAPI에서 응답을 Map으로 받음
    ResponseEntity<Map> response = restTemplate.postForEntity(fastApiUrl, request, Map.class);

    if (response.getStatusCode().is2xxSuccessful()) {
      // 응답에서 'insurance_ids' 필드를 추출
      Map<String, Object> responseBody = response.getBody();
      List<String> insuranceIds = (List<String>) responseBody.get("insurance_ids");
      return insuranceIds;
    } else {
      throw new RuntimeException("Failed to fetch recommendations from FastAPI");
    }
  }




  public List<RecommendedInsuranceGroupDTO> getRecommendationsForUser(String memberId) {
    List<InsuranceRecGroup> recGroups = recGroupRepository.findByMemberIdOrderByRecommendationDateDesc(memberId);

    return recGroups.stream().map(group -> {
      List<RecommendedInsuranceInfoDTO> insuranceInfoList = recDetailsRepository
          .findByInsuranceRecGroup(group)
          .stream()
          .map(detail -> RecommendedInsuranceInfoDTO.builder()
              .insuranceId(detail.getInsuranceProduct().getInsuranceId()) // 보험 ID
              .productName(detail.getInsuranceProduct().getInsuranceName()) // 보험 이름 가져오기
              .description(detail.getDescription())
              .type(detail.getInsuranceProduct().getProductType()) // 보험 타입 설정
              .recommendationType(detail.getRecommendationType())
              .build())
          .collect(Collectors.toList());

      return RecommendedInsuranceGroupDTO.builder()
          .recommendationGroupId(group.getRecommendationGroupId()) // 추가
          .recommendationDate(group.getRecommendationDate()) // LocalDateTime 사용
          .recommendationName(group.getRecommendationName())
          .insuranceList(insuranceInfoList)
          .build();
    }).collect(Collectors.toList());
  }

  public void saveRecommendations(RecommendedInsuranceSaveRequestDTO saveRequest) {
    String newGroupId = generateNewRecommendationGroupId();
    // 1. 추천 그룹 생성
    InsuranceRecGroup recGroup = InsuranceRecGroup.builder()
        .recommendationGroupId(newGroupId) // 랜덤 ID 생성
        .memberId(saveRequest.getMemberId()) // 사용자의 ID
        .recommendationName("추천 저장 " + LocalDate.now()) // 추천 이름 (예시)
        .recommendationDate(LocalDateTime.now()) // 현재 날짜
        .build();

    recGroupRepository.save(recGroup);

    // 2. 추천 디테일 저장
    saveRequest.getRecommendations().forEach(rec -> {
      InsuranceProduct product = productRepository.findById(rec.getInsuranceId())
          .orElseThrow(() -> new RuntimeException("보험 상품을 찾을 수 없습니다: " + rec.getInsuranceId()));

      // 맞춤 추천과 AI 추천 구분
      String recommendationType = rec.getRecommendationType();

      InsuranceRecDetails recDetails = InsuranceRecDetails.builder()
          .insuranceRecGroup(recGroup)
          .insuranceProduct(product)
          .recommendationType(recommendationType)
          .description(rec.getDescription()) // 추천 설명
          .build();

      recDetailsRepository.save(recDetails); // 추천 디테일 저장
    });
  }

  private String generateNewRecommendationGroupId() {
    String maxId = recGroupRepository.findMaxRecommendationGroupId();

    // maxId가 null인 경우 "RG0000001"로 시작
    if (maxId == null) {
      return "RG0000001";
    }

    // "RG0000001" 형식에서 숫자 부분만 추출하고 1 증가
    int numericPart = Integer.parseInt(maxId.substring(2));
    numericPart += 1;

    // 숫자 부분을 다시 "RG"와 결합하여 새로운 ID 생성
    return String.format("RG%07d", numericPart);  // RG + 7자리 숫자
  }

  @Transactional
  public void updateRecommendationName(UpdateRecommendationNameDTO updateDTO) {
    InsuranceRecGroup recGroup = recGroupRepository.findById(updateDTO.getRecommendationGroupId())
        .orElseThrow(() -> new RuntimeException("추천 그룹을 찾을 수 없습니다."));
    recGroup.setRecommendationName(updateDTO.getNewRecommendationName());
    recGroupRepository.save(recGroup);
  }

}
