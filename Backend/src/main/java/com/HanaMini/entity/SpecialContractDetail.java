package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "특약")
public class SpecialContractDetail {

  @Id
  @Column(name = "special_contract_id", length = 20, nullable = false)
  private String specialContractId;

  @Column(name = "special_contract_content", length = 20, nullable = false)
  private String specialContractContent;

  @Column(name = "additional_fee", precision = 9, nullable = false)
  private Integer additionalFee;

  @Column(name = "insurance_id", length = 20, nullable = false)
  private String insuranceId;

  // Getter, Setter
}