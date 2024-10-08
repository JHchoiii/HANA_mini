package com.HanaMini.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "InsuranceRecDetails")
public class InsuranceRecDetails {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "detail_id")
  private Long detailId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "recommendation_id", nullable = false)
  private InsuranceRecGroup insuranceRecGroup;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "insurance_id", nullable = false)
  private InsuranceProduct insuranceProduct; // 보험 상품과의 연관관계 설정

  @Column(name = "recommendation_type", length = 50, nullable = false)
  private String recommendationType; // 고객 맞춤 추천 / AI 추천

  @Column(name = "description", length = 200, nullable = false)
  private String description;
}
