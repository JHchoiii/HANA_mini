package com.HanaMini.entity;

import jakarta.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "InsuranceProduct")
public class InsuranceProduct {

  @Id
  @Column(name = "insurance_id", length = 20, nullable = false)
  private String insuranceId;

  @Column(name = "insurance_name", length = 30, nullable = false)
  private String insuranceName;

  @Column(name = "base_price", precision = 9)
  private Integer basePrice;

  @Column(name = "insurance_category", length = 20)
  private String insuranceCategory;

  @Column(name = "insurance_type", length = 20, nullable = false)
  private String insuranceType;

  @Column(name = "product_type", length = 20)
  private String productType;

  @Column(name = "payment_type", length = 20)
  private String paymentType; // 월별, 일괄, 일납

  @Column(name = "daily_price", precision = 9)
  private Integer dailyPrice;

  @Column(name = "monthly_price", precision = 9)
  private Integer monthlyPrice;

  // 태그 필드를 컬렉션으로 정의
  @ElementCollection
  @CollectionTable(name = "insurance_tags", joinColumns = @JoinColumn(name = "insurance_id"))
  @Column(name = "tag")
  private List<String> tags;

  // 간단한 설명 필드 추가
  @Column(name = "description", length = 255)
  private String description;

}