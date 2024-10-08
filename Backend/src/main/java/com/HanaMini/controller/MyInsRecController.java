package com.HanaMini.controller;

import com.HanaMini.DTO.ApplicableBenefitDTO;
import com.HanaMini.DTO.InsuranceProductDTO;
import com.HanaMini.DTO.RecommendedInsuranceSaveRequestDTO;
import com.HanaMini.DTO.UserAnswerDTO;
import com.HanaMini.service.InsuranceLinkService;
import com.HanaMini.service.InsuranceProductService;
import com.HanaMini.service.InsuranceRecommendationService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/my-ins-Rec/")
public class MyInsRecController {

  @Autowired
  private InsuranceProductService insuranceProductService;
  @Autowired
  private InsuranceRecommendationService recommendationService;
  @Autowired
  private InsuranceLinkService insuranceLinkService;


  @GetMapping("/get-recommendations/test")
  public Map<String, List<InsuranceProductDTO>> getRecommendations() {
    // Mocked Insurance IDs from FastAPI
    List<String> fastApiRecommendations = List.of(
        "INS010301", "INS010302", "INS010303", // 맞춤 추천 3개
        "INS010304", "INS010305", "INS010306", // AI 추천 3개
        "INS010307", "INS010308", "INS010309", // 인기도 추천 3개
        "INS010310", "INS010311", "INS010312"  // 보험사 추천 3개
    );

    // 보험 상품 정보를 서비스로부터 가져옴
    List<InsuranceProductDTO> products = insuranceProductService.getRecommendations(
        fastApiRecommendations);

    // 카테고리별로 나누어 반환할 Map 구조
    Map<String, List<InsuranceProductDTO>> categorizedRecommendations = new HashMap<>();

    // 각각 3개의 상품을 카테고리로 나누기
    categorizedRecommendations.put("custom", products.subList(0, 3));    // 맞춤 추천
    categorizedRecommendations.put("ai", products.subList(3, 6));        // AI 추천
    categorizedRecommendations.put("popular", products.subList(6, 9));   // 인기도 추천
    categorizedRecommendations.put("insCompany", products.subList(9, 12)); // 보험사 추천

    return categorizedRecommendations;

  }

  @GetMapping("/get-recommendations")
  public Map<String, List<InsuranceProductDTO>> getRecommendations(@RequestParam String userId) {
    // FastAPI로부터 보험 추천 ID 리스트 받아오기
    List<String> fastApiRecommendations = recommendationService.getRecommendationsFromFastApi(
        userId);

    // 고정된 인기도 추천과 보험사 추천
    List<String> popularRecommendations = List.of("INS010307", "INS010308",
        "INS010309"); // 인기도 추천 고정
    List<String> insuranceCompanyRecommendations = List.of("INS010310", "INS010311",
        "INS010312"); // 보험사 추천 고정

    List<String> allRecommendationIds = new ArrayList<>();
    allRecommendationIds.addAll(fastApiRecommendations);        // 맞춤 추천
    allRecommendationIds.addAll(popularRecommendations);        // 인기도 추천
    allRecommendationIds.addAll(insuranceCompanyRecommendations);

    // 보험 상품 정보를 서비스로부터 가져옴
    List<InsuranceProductDTO> products = insuranceProductService.getRecommendations(
        fastApiRecommendations);

    // 카테고리별로 나누어 반환할 Map 구조
    Map<String, List<InsuranceProductDTO>> categorizedRecommendations = new HashMap<>();

    // 각각 3개의 상품을 카테고리로 나누기
    categorizedRecommendations.put("ai", products.subList(0, 3));        // AI 추천
    categorizedRecommendations.put("popular", products.subList(0, 3));   // 인기도 추천
    categorizedRecommendations.put("insCompany", products.subList(0, 3)); // 보험사 추천

    return categorizedRecommendations;
  }

  @PostMapping("/get-recommendations-cos")
  public ResponseEntity<?> getCOSRecommendation(@RequestBody UserAnswerDTO userAnswersDTO) {
    // answers 필드에서 사용자 응답을 가져옴
    List<Integer> answers = userAnswersDTO.getAnswers();

    // FastAPI로부터 코사인 유사도 기반 맞춤 추천 3개를 받아옴
    List<String> customRecommendations = recommendationService.getCosineRecommendations(answers);

    // 고정된 인기도 추천과 보험사 추천
    List<String> popularRecommendations = List.of("INS010307", "INS010308",
        "INS010309"); // 인기도 추천 고정
    List<String> insuranceCompanyRecommendations = List.of("INS010310", "INS010311",
        "INS010312"); // 보험사 추천 고정

    // 모든 추천 ID를 합침
    List<String> allRecommendationIds = new ArrayList<>();
    allRecommendationIds.addAll(customRecommendations);        // 맞춤 추천
    allRecommendationIds.addAll(popularRecommendations);        // 인기도 추천
    allRecommendationIds.addAll(insuranceCompanyRecommendations); // 보험사 추천

    // 보험 상품 정보를 서비스로부터 가져옴
    List<InsuranceProductDTO> products = insuranceProductService.getRecommendations(
        allRecommendationIds);

    // 카테고리별로 나누어 반환할 Map 구조 생성
    Map<String, List<InsuranceProductDTO>> categorizedRecommendations = new HashMap<>();
    categorizedRecommendations.put("custom", products.subList(0, 3));    // 맞춤 추천 3개
    categorizedRecommendations.put("popular", products.subList(3, 6));   // 인기도 추천 3개
    categorizedRecommendations.put("insCompany", products.subList(6, 9)); // 보험사 추천 3개

    return ResponseEntity.ok(categorizedRecommendations);
  }

  @PostMapping("/save-recommendations")
  public String saveRecommendations(@RequestBody RecommendedInsuranceSaveRequestDTO saveRequest) {
    recommendationService.saveRecommendations(saveRequest);
    return "추천 그룹과 세부사항이 성공적으로 저장되었습니다.";
  }

  @GetMapping("/{memberId}/benefits")
  public ResponseEntity<List<ApplicableBenefitDTO>> getUserBenefits(@PathVariable String memberId) {
    List<ApplicableBenefitDTO> benefits = insuranceLinkService.getApplicableBenefits(memberId);
    return ResponseEntity.ok(benefits);
  }
}
