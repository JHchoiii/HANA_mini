package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Claim")
public class Claim {

  @Id
  @Column(name = "claim_id", length = 20, nullable = false)
  private String claimId;

  @Column(name = "contract_id", length = 20, nullable = false)
  private String contractId;

  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @Column(name = "claim_details", length = 200)
  private String claimDetails;

  @Column(name = "accident_date")
  private Timestamp accidentDate;

  @Column(name = "reported_date")
  private Timestamp reportedDate;

  @Column(name = "claim_type", length = 10)
  private String claimType;

  @Column(name = "document_issuer", length = 100)  // 서류 발급처
  private String documentIssuer;

  @Column(name = "documents", length = 500)  // 서류 파일 경로 또는 파일명
  private String documents;

  @Column(name = "status", length = 10, nullable = false)
  private String status;

  @Column(name = "fraud_score", length = 40)
  private String fraud_score;

  @Column(name = "is_fraud", length = 10)
  private String isFraud;

  @Column(name = "estimated_fraud", length = 10)
  private String estimatedFraud;

  // 룰별 점수 컬럼 추가
  @Column(name = "rule1_score", length = 10)
  private Double rule1Score;

  @Column(name = "rule2_score", length = 10)
  private Double rule2Score;

  @Column(name = "rule3_score", length = 10)
  private Double rule3Score;

  @Column(name = "rule4_score", length = 10)
  private Double rule4Score;

  @Column(name = "rule5_score", length = 10)
  private Double rule5Score;

  @Column(name = "rule6_score", length = 10)
  private Double rule6Score;

  // 룰별 정규화 점수 컬럼 추가 (선택 사항)
  @Column(name = "rule1_score_normalized", length = 10)
  private Double rule1ScoreNormalized;

  @Column(name = "rule2_score_normalized", length = 10)
  private Double rule2ScoreNormalized;

  @Column(name = "rule3_score_normalized", length = 10)
  private Double rule3ScoreNormalized;

  @Column(name = "rule4_score_normalized", length = 10)
  private Double rule4ScoreNormalized;

  @Column(name = "rule5_score_normalized", length = 10)
  private Double rule5ScoreNormalized;

  @Column(name = "rule6_score_normalized", length = 10)
  private Double rule6ScoreNormalized;
  // Getter, Setter
}
