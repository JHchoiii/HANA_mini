package com.HanaMini.DTO;

import com.HanaMini.entity.RecommendationReview;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendationReviewDTO {
  private String contractId;
  private String memberId;
  private Integer reviewScore;
  private String reviewContent;

  // Entity에서 DTO로 변환하는 생성자
  public RecommendationReviewDTO(RecommendationReview review) {
    this.contractId = review.getContractId();
    this.memberId = review.getMemberId();
    this.reviewScore = review.getReviewScore();
    this.reviewContent = review.getReviewContent();
  }
}