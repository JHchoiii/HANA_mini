package com.HanaMini.controller;

import com.HanaMini.DTO.GiftMemberCheck;
import com.HanaMini.DTO.GiftMemberCheckResponse;
import com.HanaMini.DTO.InsuranceContractRequestDTO;
import com.HanaMini.DTO.InsuranceProductWithGuaranteesDTO;
import com.HanaMini.entity.Member;
import com.HanaMini.service.EmailService;
import com.HanaMini.service.GiftBoxService;
import com.HanaMini.service.InsuranceContractService;
import com.HanaMini.service.InsuranceProductService;
import com.HanaMini.service.MemberService;
import jakarta.mail.MessagingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/my-gift")
public class MyGiftController {

  @Autowired
  private InsuranceProductService insuranceProductService;

  @Autowired
  private InsuranceContractService insuranceContractService;

  @Autowired
  private MemberService memberService;

  @Autowired
  private GiftBoxService giftBoxService;

  @Autowired
  private EmailService emailService;

  @GetMapping("/insurance-products/type/{prefix}")
  public ResponseEntity<List<InsuranceProductWithGuaranteesDTO>> getInsuranceProductsWithGuarantees(
      @PathVariable String prefix) {
    // 보험 상품과 보장 내용 DTO를 가져옴
    List<InsuranceProductWithGuaranteesDTO> insuranceProductsWithGuarantees = insuranceProductService.getInsuranceProductsWithGuarantees(
        prefix);

    return ResponseEntity.ok(insuranceProductsWithGuarantees);
  }

  @GetMapping("/insurance-products/contract/{contractId}")
  public ResponseEntity<InsuranceProductWithGuaranteesDTO> getInsuranceProductByContractId(
      @PathVariable String contractId) {
    // 서비스 레이어를 통해 데이터 가져오기
    InsuranceProductWithGuaranteesDTO dto = giftBoxService.getInsuranceProductByContractId(contractId);
    return ResponseEntity.ok(dto);
  }

  @PostMapping("/insurance-contract")
  public ResponseEntity<String> createInsuranceContract(
      @RequestBody InsuranceContractRequestDTO requestDTO) {
    insuranceContractService.createGiftContract(requestDTO);
    return ResponseEntity.ok("Insurance contract created successfully");
  }

  @PostMapping("/check-member")
  public ResponseEntity<?> checkMember(@RequestBody GiftMemberCheck request) {
    Optional<Member> member = memberService.findMemberByBirthDateAndPhoneNumber(request.getBirthDate(), request.getPhoneNumber());

    if (member.isPresent()) {
      // 성공적으로 회원 조회
      Member foundMember = member.get();
      return ResponseEntity.ok(new GiftMemberCheckResponse(foundMember.getMemberId(), foundMember.getName()));
    } else {
      // 회원이 존재하지 않음
      return ResponseEntity.status(404).body("Member not found");
    }
  }

  @PutMapping("/register/{contractId}")
  public ResponseEntity<String> registerContract(@PathVariable String contractId) {
    boolean isUpdated = insuranceContractService.updateContractStatus(contractId);

    if (isUpdated) {
      return ResponseEntity.ok("Contract status updated to '등록'.");
    } else {
      return ResponseEntity.badRequest().body("Contract not found.");
    }
  }

  @PostMapping("/send-email")
  public ResponseEntity<String> sendEmail(
      @RequestParam("contractId") String contractId,
      @RequestParam("agreements") String agreements,
      @RequestParam("signature") String signature // Base64 데이터 URL 형식
  ) {
    try {
      Map<String, Object> data = new HashMap<>();
      data.put("agreements", agreements);
      data.put("signature", signature);

      emailService.sendInsurancePolicyEmail(contractId, data);

      return ResponseEntity.ok("Email sent successfully");
    } catch (MessagingException e) {
      e.printStackTrace();
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body("Error while sending email");
    }
  }
  @PostMapping("/{memberId}/deduct-points")
  public ResponseEntity<String> deductPoints(@PathVariable String memberId, @RequestParam Integer usedPoint) {
    try {
      memberService.deductPoints(memberId, usedPoint);
      return ResponseEntity.ok("Points deducted successfully");
    } catch (IllegalArgumentException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
