package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "RecommendationReview")
@IdClass(RecommendationReviewId.class) // 복합키를 위한 클래스 정의
public class RecommendationReview {

  @Id
  @Column(name = "contract_id", length = 20, nullable = false)
  private String contractId;

  @Id
  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @Column(name = "review_score", nullable = false)
  private Integer reviewScore;

  @Column(name = "review_content", length = 200)
  private String reviewContent;

  @Temporal(TemporalType.TIMESTAMP)
  @Column(name = "created_date")
  @Builder.Default // Lombok의 기본값 적용을 위해 추가
  private Date createdDate = new Date(); // 리뷰 작성 시간
  // Getter, Setter
}

