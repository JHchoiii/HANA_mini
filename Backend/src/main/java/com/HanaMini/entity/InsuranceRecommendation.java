package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "InsuranceRecommendation")
public class InsuranceRecommendation {

  @Id
  @Column(name = "recommendation_id", length = 20, nullable = false)
  private String recommendationId;

  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @Column(name = "insurance_id", length = 20, nullable = false)
  private String insuranceId;

  // Getter, Setter
}
