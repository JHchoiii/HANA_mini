package com.HanaMini.service;

import com.HanaMini.DTO.GiftResponseDTO;
import com.HanaMini.DTO.InsuranceProductWithGuaranteesDTO;
import com.HanaMini.DTO.ReceivedGiftDTO;
import com.HanaMini.DTO.SentGiftDTO;
import com.HanaMini.entity.GiftBox;
import com.HanaMini.entity.Guarantee;
import com.HanaMini.entity.InsuranceContract;
import com.HanaMini.entity.InsuranceProduct;
import com.HanaMini.repository.GiftBoxRepository;
import com.HanaMini.repository.GuaranteeRepository;
import com.HanaMini.repository.InsuranceContractRepository;
import java.sql.Timestamp;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GiftBoxService {

  @Autowired
  private GiftBoxRepository giftBoxRepository;

  @Autowired
  private InsuranceContractRepository insuranceContractRepository;

  @Autowired
  private GuaranteeRepository guaranteeRepository;

  private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd");


  public Long countGiftBoxByMemberId(String memberId) {
    Long sentCount = giftBoxRepository.countBySenderId(memberId); // 보낸 선물 카운트
    Long receivedCount = giftBoxRepository.countByReceiverId(memberId);
    return sentCount + receivedCount;
  }

  public InsuranceProductWithGuaranteesDTO getInsuranceProductByContractId(String contractId) {
    // Fetch the contract
    InsuranceContract contract = insuranceContractRepository.findById(contractId)
        .orElseThrow(() -> new ResourceNotFoundException("Contract not found"));

    // Get the associated insurance product
    InsuranceProduct product = contract.getInsuranceProduct();


// Fetch the GiftBox using contractId
    GiftBox giftBox = giftBoxRepository.findByInsuranceContractContractId(contractId)
        .orElseThrow(() -> new ResourceNotFoundException("GiftBox not found for contractId: " + contractId));


    // Get the guarantees for the insurance product
    List<Guarantee> guarantees = guaranteeRepository.findByInsuranceId(product.getInsuranceId());

    // Convert guarantees to DTOs
    List<InsuranceProductWithGuaranteesDTO.GuaranteeDTO> guaranteeDTOs = guarantees.stream()
        .map(guarantee -> InsuranceProductWithGuaranteesDTO.GuaranteeDTO.builder()
            .guaranteeType(guarantee.getGuaranteeType())
            .guaranteeFee(guarantee.getGuaranteeFee())
            .guaranteeContent(guarantee.getGuaranteeContent())
            .build())
        .collect(Collectors.toList());

    // Convert expirationDate to formatted string
    String formattedExpirationDate = convertTimestampToLocalDateString(giftBox.getExpirationDate());

    // Build the final DTO including fields from the contract and expirationDate
    return InsuranceProductWithGuaranteesDTO.builder()
        .insuranceId(product.getInsuranceId())
        .insuranceName(product.getInsuranceName())
        .basePrice(product.getBasePrice())
        .dailyIncrease(product.getDailyPrice())
        .guarantees(guaranteeDTOs)
        // Include fields from InsuranceContract
        .contractor(contract.getContractor())
        .insuredPerson(contract.getInsuredPerson())
        .totalPremium(contract.getTotalPremium())
        .contractDays(contract.getContractDays())
        // Include expirationDate from GiftBox
        .expirationDate(formattedExpirationDate)
        .build();
  }

  private String convertTimestampToLocalDateString(Timestamp timestamp) {
    if (timestamp == null) {
      return "";
    }
    return timestamp.toInstant()
        .atZone(ZoneId.systemDefault())
        .toLocalDate()
        .format(DATE_FORMATTER);
  }

  public GiftResponseDTO getUserGifts(String memberId) {

    // 받은 선물 조회
    List<ReceivedGiftDTO> receivedGifts = giftBoxRepository.findByReceiverId(memberId).stream()
        .map(giftBox -> {
          InsuranceContract contract = giftBox.getInsuranceContract();
          InsuranceProduct product = contract.getInsuranceProduct();
          String formattedExpirationDate = convertTimestampToLocalDateString(giftBox.getExpirationDate());
          String formattedStartDate = convertTimestampToLocalDateString(contract.getStartDate());
          String formattedLastPaymentDate = convertTimestampToLocalDateString(contract.getLastPaymentDate());


          return ReceivedGiftDTO.builder()
              .giftId(giftBox.getGiftId())
              .senderId(giftBox.getSenderId())
              .giftMsg(giftBox.getGiftMsg())
              .contractId(giftBox.getInsuranceContract().getContractId()) // 수정된 부분
              .registrationStatus(giftBox.getRegistrationStatus())
              .productName(product.getInsuranceName()) // 추가
              .contractor(contract.getContractor()) // 추가
              .insuredPerson(contract.getInsuredPerson())
              .expirationDate(formattedExpirationDate)
              .startDate(formattedStartDate)
              .lastPaymentDate(formattedLastPaymentDate)
              .build();
        })
        .collect(Collectors.toList());

    // 보낸 선물 조회
    List<SentGiftDTO> sentGifts = giftBoxRepository.findBySenderId(memberId).stream()
        .map(giftBox -> {
          InsuranceContract contract = giftBox.getInsuranceContract();
          InsuranceProduct product = contract.getInsuranceProduct();

          String formattedExpirationDate = convertTimestampToLocalDateString(giftBox.getExpirationDate());
          String formattedStartDate = convertTimestampToLocalDateString(contract.getStartDate());
          String formattedLastPaymentDate = convertTimestampToLocalDateString(contract.getLastPaymentDate());

          return SentGiftDTO.builder()
              .giftId(giftBox.getGiftId())
              .receiverId(giftBox.getReceiverId())
              .giftMsg(giftBox.getGiftMsg())
              .contractId(contract.getContractId())
              .registrationStatus(giftBox.getRegistrationStatus())
              .productName(product.getInsuranceName()) // 추가
              .contractor(contract.getContractor()) // 추가
              .insuredPerson(contract.getInsuredPerson())
              .lastPaymentDate(formattedLastPaymentDate)
              .build();
        })
        .collect(Collectors.toList());

    // 결과를 GiftResponseDTO에 담아 반환
    return GiftResponseDTO.builder()
        .receivedGifts(receivedGifts)
        .sentGifts(sentGifts)
        .build();
  }


  // giftId를 생성하는 로직
  public String generateNextGiftId(String lastGiftId) {
    if (lastGiftId == null) {
      return "G000001";  // 첫 번째 giftId
    }

    // 숫자 부분만 추출하여 증가
    int number = Integer.parseInt(lastGiftId.substring(1));
    number++;

    // 새로운 giftId 반환 (G로 시작하고, 숫자는 6자리로 맞춤)
    return String.format("G%06d", number);
  }

}
