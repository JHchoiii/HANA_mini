package com.HanaMini.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "InsuranceLinkBenefit")
@Getter
@Setter
public class InsuranceLinkBenefit {

  @Id
  @Column(name = "benefit_id", nullable = false)
  private String benefitId;

  // InsuranceLink와의 다대일 관계 설정
  @ManyToOne
  @JoinColumn(name = "link_id", nullable = false)
  private InsuranceLink insuranceLink;

  @Column(name = "benefit_content", nullable = false)
  private String benefitContent;

  @Column(name = "benefit_type", length = 20)
  private String benefitType; // 예: 할인, 포인트 적립, 특약 무료 등

  @Column(name = "benefit_value", precision = 9)
  private Integer benefitValue; // 할인율, 포인트 수 등

  @Column(name = "min_count")
  private Integer minCount;

  // 기타 필요한 필드 및 Getter, Setter
}
