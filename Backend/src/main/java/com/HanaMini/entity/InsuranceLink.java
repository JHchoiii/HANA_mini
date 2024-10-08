package com.HanaMini.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Entity
@Table(name = "InsuranceLink")
@Getter
@Setter
public class InsuranceLink {

  @Id
  @Column(name = "link_id", nullable = false)
  private String linkId;

  // 여러 개의 미니 보험을 연계
  @ElementCollection
  @CollectionTable(name = "InsuranceLink_InsuranceName", joinColumns = @JoinColumn(name = "link_id"))
  @Column(name = "insurance_name")
  private List<String> insuranceNames;

  // 하나의 장기 보험과 연계
  @ManyToOne
  @JoinColumn(name = "long_term_insurance_id", nullable = false)
  private InsuranceProduct longTermInsuranceProduct;

  // 추가 필드가 필요하면 여기에 추가
}
