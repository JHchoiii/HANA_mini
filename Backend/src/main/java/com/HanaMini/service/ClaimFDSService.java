package com.HanaMini.service;

import com.HanaMini.DTO.FraudPredictionResultDTO;
import com.HanaMini.entity.Claim;
import com.HanaMini.entity.InsuranceContract;
import com.HanaMini.entity.Member;
import com.HanaMini.repository.ClaimRepository;
import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.utils.EncodingMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class ClaimFDSService {

  @Autowired
  private ClaimRepository claimRepository;

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private InsuranceContractRepository contractRepository;

  @Autowired
  private EncodingMapper encodingMapper;

  private final RestTemplate restTemplate;

  @PersistenceContext
  private EntityManager entityManager;

  public ClaimFDSService() {
    this.restTemplate = new RestTemplate();
  }

  public FraudPredictionResultDTO calculateFraudScore(String claimId) {

    FraudPredictionResultDTO result = new FraudPredictionResultDTO();

    try {
      Map<String, Object> response = new HashMap<>();
      // 6. PL/SQL 프로시저 호출하여 기존 사기 점수 및 여부 받기
      callPlSqlProcedure();

      // 1. Claim 정보 조회
      Claim claim = claimRepository.findById(claimId)
          .orElseThrow(() -> new Exception("Claim not found"));

      // 2. Member 정보 조회
      Member member = memberRepository.findById(claim.getMemberId())
          .orElseThrow(() -> new Exception("Member not found"));

      // 3. InsuranceContract 정보 조회
      InsuranceContract contract = contractRepository.findById(claim.getContractId())
          .orElseThrow(() -> new Exception("Insurance Contract not found"));

      // 4. 피처 엔지니어링 수행
      Map<String, Object> featureMap = performFeatureEngineering(claim, member, contract);

      // 5. FastAPI 호출하여 예측된 사기 확률 받기
      Double fraudProbability = callFastApi(featureMap);

// 7. 추가 지표 계산
      double claimsRatio = calculateClaimsRatio(contract.getContractId());
      double fraudCountRatio = calculateFraudCountRatio(member.getFraudCount());


//      // 7. 결과 구성
//      response.put("claim_id", claimId);
//      response.put("predicted_fraud_probability", fraudProbability);
//      response.put("plsql_fraud_score", claim.getFraud_score());
//      response.put("plsql_is_fraud", claim.getEstimatedFraud());
//      response.put("is_fraud", claim.getIsFraud());

      LocalDate accidentDate = claim.getAccidentDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
      LocalDate reportedDate = claim.getReportedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

      // 두 날짜 간의 차이 계산 (일 단위)
      long delayDays = ChronoUnit.DAYS.between(accidentDate, reportedDate);

      // 8. 결과 구성
      result.setClaimId(claimId);
      result.setFraudProbability(fraudProbability);
      result.setIsFraud(Integer.parseInt(claim.getEstimatedFraud()));
      result.setClaimDelayDays(Long.valueOf(delayDays).intValue());
      result.setClaimsRatio(claimsRatio);
      result.setFraudCountRatio(fraudCountRatio);

    } catch (Exception e) {
      e.printStackTrace();
    }

    return result;
  }

  private Map<String, Object> performFeatureEngineering(Claim claim, Member member, InsuranceContract contract) {
    Map<String, Object> features = new HashMap<>();

    // 룰 1: 과거 사기 횟수는 이미 `fraud_count`로 존재
    features.put("fraud_count", member.getFraudCount());

    // 룰 2: 계약 기간 대비 청구 빈도
    Long claimCount = claimRepository.countQuickClaims(claim.getContractId());
    features.put("claim_frequency", (double) claimCount / contract.getContractDays());

    // 룰 3: 이메일 중복 사용 횟수 (email_dup_count)
    Long emailDupCount = memberRepository.countByEmail(member.getEmail()) - 1;
    features.put("email_dup_count", Math.max(emailDupCount.intValue(), 0));

    // 룰 4: 동일 서류 발급처를 통한 청구 중복 횟수 (issuer_dup_count)
    Long issuerDupCount = claimRepository.countByDocumentIssuer(claim.getDocumentIssuer()) - 1;
    features.put("issuer_dup_count", Math.max(issuerDupCount.intValue(), 0));

    // 룰 5: 청구 제출 지연 일수
    calculateDelayDays(claim, features);

    // 룰 6: 계약 시작 직후 청구 발생 횟수
    Long quickClaimsCount = claimRepository.countQuickClaims(claim.getContractId());
    features.put("quick_claims_flag", quickClaimsCount >= 3 ? 1 : 0);

    Long claim_count = claimRepository.countByContractId(claim.getContractId());
    features.put("claim_count", claim_count);


    // 나이 계산 (birth_date를 나이로 변환)
    int age = calculateAge(member.getBirthDate());
    features.put("age", age);

    // 추가적인 FE: 날짜 관련 특성
    java.time.LocalDate accidentDate = claim.getAccidentDate().toInstant().atZone(java.time.ZoneId.systemDefault()).toLocalDate();
    features.put("accident_month", accidentDate.getMonthValue());
//    features.put("accident_dayofweek", accidentDate.getDayOfWeek().getValue() % 7);  // 월=1, 일=7 -> 일=0

    // 계약 관련 정보 (공유 인코딩 매핑 사용)
    features.put("contract_id", encodingMapper.encode("contract_id", contract.getContractId()));
    features.put("document_issuer", encodingMapper.encode("document_issuer", claim.getDocumentIssuer()));
    features.put("email", encodingMapper.encode("email", member.getEmail()));
    features.put("insurance_id", encodingMapper.encode("insurance_id", contract.getInsuranceProduct().getInsuranceId()));
    features.put("claim_type", encodingMapper.encode("claim_type", claim.getClaimType()));
    features.put("status_x", encodingMapper.encode("status_x", claim.getStatus()));
    features.put("status_y", encodingMapper.encode("status_y", contract.getStatus()));


    // 추가 피처: rule1_score, rule2_score, ..., rule6_score
    features.put("rule1_score", claim.getRule1Score());
    features.put("rule2_score", claim.getRule2Score());
    features.put("rule3_score", claim.getRule3Score());
    features.put("rule4_score", claim.getRule4Score());
    features.put("rule5_score", claim.getRule5Score());
    features.put("rule6_score", claim.getRule6Score());

    // 추가 피처: identification_number, gender, point, total_premium, is_reviewed, documents
    features.put("identification_number", member.getIdentificationNumber());
    features.put("gender", encodingMapper.encode("gender", member.getGender()));
    features.put("point", member.getPoint());  // float 또는 double 타입
    features.put("total_premium", contract.getTotalPremium());  // float 또는 double 타입
    features.put("is_reviewed", contract.getIsReviewed()); // boolean
//    features.put("documents", -1);
    features.put("contract_days", contract.getContractDays());

    int quickClaim = calculateQuickClaim(claim, contract);
    features.put("quick_claim", quickClaim);

    return features;
  }

  private int calculateAge(String birthDateStr) {
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    try {
      Date birthDate = sdf.parse(birthDateStr);
      Date now = new Date();
      long ageInMillis = now.getTime() - birthDate.getTime();
      return (int) (ageInMillis / (1000L * 60 * 60 * 24 * 365));
    } catch (ParseException e) {
      // 로그를 남기거나 기본 값을 반환할 수 있습니다.
      return 0;
    }
  }
  private int calculateQuickClaim(Claim claim, InsuranceContract contract) {
    Timestamp accidentTimestamp = claim.getAccidentDate();
    Timestamp contractStartTimestamp = contract.getStartDate();
    int contractDays = contract.getContractDays();

    if (accidentTimestamp == null || contractStartTimestamp == null ) {
      return 0;  // 기본값 설정
    }

    long diffInMillis = accidentTimestamp.getTime() - contractStartTimestamp.getTime();
    long diffInDays = diffInMillis / (1000 * 60 * 60 * 24);

    double threshold = contractDays * 0.1;

    return (diffInDays <= threshold) ? 1 : 0;
  }

  private Double callFastApi(Map<String, Object> featureMap) throws Exception {
    String url = "http://localhost:8000/predict";  // FastAPI 서버 주소

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_JSON);

    HttpEntity<Map<String, Object>> request = new HttpEntity<>(featureMap, headers);

    ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);

    if (response.getStatusCode().is2xxSuccessful()) {
      Map<String, Object> responseBody = response.getBody();
      if (responseBody != null && responseBody.containsKey("fraud_probability")) {
        return Double.parseDouble(responseBody.get("fraud_probability").toString());
      } else {
        throw new Exception("Invalid response from FastAPI");
      }
    } else {
      throw new Exception("FastAPI request failed with status: " + response.getStatusCode());
    }
  }

  private void callPlSqlProcedure() {
    String procedureName = "CALCULATE_FRAUD_SCORES2";

    StoredProcedureQuery query = entityManager.createStoredProcedureQuery(procedureName);

    query.execute();
  }

  public void calculateDelayDays(Claim claim, Map<String, Object> features) {
    // 사고 날짜와 신고 날짜를 LocalDate로 변환
    LocalDate accidentDate = claim.getAccidentDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
    LocalDate reportedDate = claim.getReportedDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

    // 두 날짜 간의 차이 계산 (일 단위)
    long delayDays = ChronoUnit.DAYS.between(accidentDate, reportedDate);

    // 계산된 지연 일수를 features에 추가
    features.put("claim_delay_days", delayDays);
  }

  private double calculateClaimsRatio(String contractId) {
    // 계약 ID로 청구한 청구 수
    long totalClaimsContract = claimRepository.countByContractId(contractId);

    // 모든 계약의 평균 청구 수
    double avgClaimsContract = claimRepository.findAverageClaimsPerContract();

    if (avgClaimsContract == 0) {
      return 0;
    }

    return totalClaimsContract / avgClaimsContract;
  }

  private double calculateFraudCountRatio(int memberFraudCount) {
    // 모든 회원의 평균 fraud_count
    double avgFraudCount = memberRepository.findAverageFraudCount();

    if (avgFraudCount == 0) {
      return 0;
    }

    return memberFraudCount / avgFraudCount;
  }
}