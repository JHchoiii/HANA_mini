package com.HanaMini.service;

import com.HanaMini.DTO.InsuranceContractRequestDTO;
import com.HanaMini.DTO.UserInsuranceContractDTO;
import com.HanaMini.entity.GiftBox;
import com.HanaMini.entity.InsuranceContract;
import com.HanaMini.entity.InsuranceProduct;
import com.HanaMini.repository.GiftBoxRepository;
import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.InsuranceProductRepository;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceContractService {

  @Autowired
  private InsuranceContractRepository insuranceContractRepository;
  @Autowired
  private InsuranceProductRepository insuranceProductRepository;
  @Autowired
  private GiftBoxRepository giftBoxRepository;
  @Autowired
  private GiftBoxService giftBoxService;

  private static final SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");


  public String generateNewContractId(String prefix) {
    // 마지막으로 생성된 계약 ID를 가져옴
    String lastContractId = insuranceContractRepository.findLastContractIdByPrefix(prefix);

    int nextNumber = 1; // 기본값 1
    if (lastContractId != null) {
      // contractId 형식: '17510-315' 이므로 '-'를 기준으로 분리하여 뒷자리 숫자를 추출
      String[] parts = lastContractId.split("-");
      int lastNumber = Integer.parseInt(parts[1]);
      nextNumber = lastNumber + 1; // 숫자를 1 증가
    }

    // 새로운 계약 ID 생성 (예: '17510-316')
    return prefix + "-" + nextNumber;
  }

  public List<UserInsuranceContractDTO> getUserInsuranceContracts(String memberId) {
    List<InsuranceContract> contracts = insuranceContractRepository.findContractsExcludingGiftsSentByMember(memberId);

    return contracts.stream()
        .map(contract -> UserInsuranceContractDTO.builder()
            .contractId(contract.getContractId())
            .productName(contract.getInsuranceProduct().getInsuranceName()) // InsuranceProduct에서 productName 가져옴
            .insuredPerson(contract.getInsuredPerson())
            .insurancePeriod(
                (contract.getStartDate() != null ? dateFormat.format(contract.getStartDate()) : "N/A")
                    + " ~ " +
                    (contract.getEndDate() != null ? dateFormat.format(contract.getEndDate()) : "N/A")
            )            .status(contract.getStatus())
            .totalPremium(contract.getTotalPremium())
            .currentPremium(contract.getCurrentPremium())
            .insuranceType(contract.getInsuranceProduct().getInsuranceType()) // 보험 유형 추가
            .additionalInformation(contract.getAdditionalInformation()) // 필요시 추가 정보 반환
            .isReviewed(contract.getIsReviewed())
            .build())
        .collect(Collectors.toList());
  }


  // 기존 메서드 수정
  public void createGiftContract(InsuranceContractRequestDTO requestDTO) {
    InsuranceProduct insuranceProduct = insuranceProductRepository.findById(requestDTO.getInsuranceId())
        .orElseThrow(() -> new ResourceNotFoundException("Insurance Product not found"));

    String newContractId = generateNewContractId("17510"); // 나중에 코드성에서 찾아오기

    String lastGiftId = giftBoxRepository.findMaxGiftId();
    String newGiftId = giftBoxService.generateNextGiftId(lastGiftId);

    // 현재 시간으로부터 30일 뒤의 타임스탬프 생성
    Timestamp thirtyDaysLater = Timestamp.from(Instant.now().plus(30, ChronoUnit.DAYS));

    InsuranceContract contract = InsuranceContract.builder()
        .contractId(newContractId)  // 랜덤으로 contract ID 생성
        .memberId(requestDTO.getMemberId())
        .insuranceProduct(insuranceProduct)
        .specialContractStatus(false)
        .totalPremium(requestDTO.getTotalPremium())
        .insuredPerson(requestDTO.getInsuredPerson())
        .contractor(requestDTO.getContractor())
        .contractDays(requestDTO.getContractDays())
        .additionalInformation(requestDTO.getAdditionalInformation())
        .status("미등록")
        .isGift(true)
        .currentPremium(requestDTO.getTotalPremium())
        .lastPaymentDate(new Timestamp(System.currentTimeMillis())) // lastPaymentDate를 30일 뒤로 설정
        .startDate(null)
        .endDate(null) // endDate를 30일 뒤로 설정
        .build();

    insuranceContractRepository.save(contract);

    // 선물함에 추가할 GiftBox 생성
    GiftBox giftBox = GiftBox.builder()
        .giftId(newGiftId)
        .senderId(requestDTO.getMemberId())
        .receiverId(requestDTO.getInsuredPersonId())
        .giftMsg(null)
        .insuranceContract(contract)
        .registrationStatus("미등록")
        .expirationDate(thirtyDaysLater) // expirationDate를 30일 뒤로 설정
        .build();

    // GiftBox 저장 (ID는 자동으로 생성됨)
    giftBoxRepository.save(giftBox);
  }

  public boolean updateContractStatus(String contractId) {
    Optional<InsuranceContract> optionalContract = insuranceContractRepository.findById(contractId);
    Optional<GiftBox> optionalGiftBox = giftBoxRepository.findByInsuranceContractContractId(contractId);

    if (optionalContract.isPresent() && optionalGiftBox.isPresent()) {
      InsuranceContract contract = optionalContract.get();
      GiftBox giftBox = optionalGiftBox.get();

      // GiftBox와 Contract 상태를 "등록"으로 변경
      giftBox.setRegistrationStatus("등록");
      contract.setStatus("등록");

      // 현재 시각의 하루 뒤 00:00:00 시각 설정
      LocalDateTime tomorrowMidnight = LocalDateTime.of(LocalDate.now().plusDays(1), LocalTime.MIDNIGHT);
      Timestamp startDate = Timestamp.valueOf(tomorrowMidnight);  // Timestamp로 변환

      // contractDays 만큼 startDate에 더해서 endDate 설정
      if (contract.getContractDays() != null) {
        int contractDays = contract.getContractDays();
        LocalDateTime endDateTime = tomorrowMidnight.plusDays(contractDays); // contractDays를 더함
        Timestamp endDate = Timestamp.valueOf(endDateTime);  // Timestamp로 변환
        contract.setEndDate(endDate);
      }

      // 시작일 설정
      contract.setStartDate(startDate);

      // 변경된 값을 저장
      insuranceContractRepository.save(contract);
      return true;
    }

    return false;
  }
}
