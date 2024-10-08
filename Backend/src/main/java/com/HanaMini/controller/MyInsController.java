package com.HanaMini.controller;

import com.HanaMini.DTO.ClaimCreateDTO;
import com.HanaMini.DTO.ClaimDTO;
import com.HanaMini.DTO.ClaimStatusDTO;
import com.HanaMini.DTO.GiftResponseDTO;
import com.HanaMini.DTO.PointHistoryDTO;
import com.HanaMini.DTO.RecommendationReviewDTO;
import com.HanaMini.DTO.RecommendedInsuranceGroupDTO;
import com.HanaMini.DTO.ReviewWithInsuranceDTO;
import com.HanaMini.DTO.UpdateRecommendationNameDTO;
import com.HanaMini.DTO.UserInsuranceContractDTO;
import com.HanaMini.service.ClaimService;
import com.HanaMini.service.GiftBoxService;
import com.HanaMini.service.InsuranceContractService;
import com.HanaMini.service.InsuranceRecommendationService;
import com.HanaMini.service.PointDetailsService;
import com.HanaMini.service.RecommendationReviewService;
import java.io.IOException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user/my-ins/")
public class MyInsController {
  @Autowired
  private GiftBoxService giftBoxService;

  @Autowired
  private InsuranceContractService insuranceContractService;

  @Autowired
  private PointDetailsService pointDetailsService;

  @Autowired
  private ClaimService claimService;

  @Autowired
  private InsuranceRecommendationService insuranceRecommendationService;

  @Autowired
  private RecommendationReviewService reviewService;

//  @Autowired


  @GetMapping("/count-insurances")
  public Long getInsuranceCount(@RequestParam String memberId) {
    return (long) insuranceContractService.getUserInsuranceContracts(memberId).size();
  }

  @GetMapping("/count-giftBoxes")
  public Long getGiftBoxCount(@RequestParam String memberId) {
    return giftBoxService.countGiftBoxByMemberId(memberId);
  }

  @GetMapping("/points")
  public ResponseEntity<Integer> getPoints(@RequestParam String memberId) {
    Integer points = pointDetailsService.getPoints(memberId);
    return ResponseEntity.ok(points);
  }

  @GetMapping("/my-insurances")
  public List<UserInsuranceContractDTO> getUserInsuranceContracts(@RequestParam String memberId) {
    return insuranceContractService.getUserInsuranceContracts(memberId);
  }

  @GetMapping("/my-gifts")
  public GiftResponseDTO getUserGifts(@RequestParam String memberId) {
    return giftBoxService.getUserGifts(memberId);
  }

  @GetMapping("/point-details")
  public List<PointHistoryDTO> getPointHistory(@RequestParam String memberId) {
    return pointDetailsService.getPointHistory(memberId);
  }

  @GetMapping("/my-claims")
  public List<ClaimDTO> getClaimsByMemberId(@RequestParam String memberId) {
    return claimService.getClaimsByMemberId(memberId);
  }


  @GetMapping("/insRecList")
  public List<RecommendedInsuranceGroupDTO> getUserInsRecLists(@RequestParam String memberId) {
    return insuranceRecommendationService.getRecommendationsForUser(memberId);
  }

  @PutMapping("/update-recommendation-name")
  public ResponseEntity<?> updateRecommendationName(@RequestBody UpdateRecommendationNameDTO updateDTO) {
    try {
      insuranceRecommendationService.updateRecommendationName(updateDTO);
      return ResponseEntity.ok("추천 이름이 성공적으로 수정되었습니다.");
    } catch (Exception e) {
      // 상세한 로그를 위해 예외 메시지 추가
      return ResponseEntity.status(500).body("추천 이름 수정에 실패했습니다: " + e.getMessage());
    }
  }

  @GetMapping("/claim-status")
  public List<ClaimStatusDTO> getClaimStatus(@RequestParam String memberId) {
    return claimService.getClaimStatusCountByMemberId(memberId);
  }

  // 클레임 생성
  @PostMapping("/claim")
  public ResponseEntity<String> createClaim(
      @RequestPart("claim") ClaimCreateDTO claimCreateDTO,
      @RequestPart("files") MultipartFile[] files) {

    try {
      // 파일 설정
      claimCreateDTO.setDocuments(files);
      // 클레임 생성 로직 호출
      claimService.createClaim(claimCreateDTO);

      return ResponseEntity.ok("청구가 성공적으로 제출되었습니다.");
    } catch (IOException e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("파일 업로드에 실패했습니다.");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("청구 제출에 실패했습니다.");
    }
  }

  @PostMapping("/submit-review")
  public ResponseEntity<String> submitReview(@RequestBody RecommendationReviewDTO reviewDTO) {
    try {
      reviewService.submitReview(reviewDTO);
      return ResponseEntity.ok("리뷰가 성공적으로 제출되었습니다.");
    } catch (Exception e) {
      return ResponseEntity.status(500).body("리뷰 제출에 실패했습니다.");
    }
  }

  @GetMapping("/my-reviews")
  public List<ReviewWithInsuranceDTO> getUserReviews(@RequestParam String memberId) {
    return reviewService.getUserReviews(memberId);
  }


}
