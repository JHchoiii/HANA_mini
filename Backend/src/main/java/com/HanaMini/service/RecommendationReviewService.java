package com.HanaMini.service;

import com.HanaMini.DTO.RecommendationReviewDTO;
import com.HanaMini.DTO.ReviewWithInsuranceDTO;
import com.HanaMini.entity.InsuranceContract;
import com.HanaMini.entity.Member;
import com.HanaMini.entity.PointDetails;
import com.HanaMini.entity.RecommendationReview;
import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.repository.PointDetailsRepository;
import com.HanaMini.repository.RecommendationReviewRepository;
import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RecommendationReviewService {
  @Autowired
  private RecommendationReviewRepository reviewRepository;

  @Autowired
  private InsuranceContractRepository insuranceContractRepository;

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private PointDetailsRepository pointDetailsRepository;

  @Transactional
  public void submitReview(RecommendationReviewDTO reviewDTO) {
    // 1. 보험 계약 조회
    InsuranceContract contract = insuranceContractRepository.findById(reviewDTO.getContractId())
        .orElseThrow(() -> new RuntimeException("보험 계약을 찾을 수 없습니다."));

    // 2. 리뷰 생성 및 저장
    RecommendationReview review = RecommendationReview.builder()
        .contractId(reviewDTO.getContractId())
        .memberId(reviewDTO.getMemberId())
        .reviewScore(reviewDTO.getReviewScore())
        .reviewContent(reviewDTO.getReviewContent())
        .build(); // createdDate는 @Builder.Default로 자동 설정
    reviewRepository.save(review);

    // 3. 보험 계약의 isReviewed 필드 업데이트
    contract.setIsReviewed(true);
    insuranceContractRepository.save(contract);

    // 4. 회원 조회
    Member member = memberRepository.findById(reviewDTO.getMemberId())
        .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));

    // 5. 회원의 포인트 업데이트
    Integer currentPoint = member.getPoint();
    if (currentPoint == null) {
      currentPoint = 0;
    }
    Integer updatedPoint = currentPoint + 500;
    member.setPoint(updatedPoint);
    memberRepository.save(member);

    // 6. PointDetails 생성 및 저장
    PointDetails pointDetails = PointDetails.builder()
        .memberId(reviewDTO.getMemberId())
        .pointIncrease(500)
        .pointDecrease(0) // 감소는 0으로 설정
        .description("리뷰 작성")
        .changeDate(new Timestamp(System.currentTimeMillis())) // 현재 날짜와 시간
        .build();
    pointDetailsRepository.save(pointDetails);
  }

  // 사용자 리뷰 조회
  // 사용자 리뷰 조회
  public List<ReviewWithInsuranceDTO> getUserReviews(String memberId) {
    List<RecommendationReview> reviews = reviewRepository.findByMemberId(memberId);
    return reviews.stream().map(review -> {
      InsuranceContract contract = insuranceContractRepository.findById(review.getContractId())
          .orElse(null);
      if (contract != null && contract.getInsuranceProduct() != null) {
        return new ReviewWithInsuranceDTO(
            review.getContractId(),
            contract.getInsuranceProduct().getInsuranceName(),
            contract.getInsuranceProduct().getProductType(),
            review.getReviewScore(),
            review.getReviewContent(),
            review.getCreatedDate()
        );
      } else {
        return new ReviewWithInsuranceDTO(
            review.getContractId(),
            "Unknown Insurance",
            "Unknown Product",
            review.getReviewScore(),
            review.getReviewContent(),
            review.getCreatedDate()
        );
      }
    }).collect(Collectors.toList());
  }

}
