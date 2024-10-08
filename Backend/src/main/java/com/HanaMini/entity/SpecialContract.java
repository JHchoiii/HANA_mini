package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table(name = "SpecialContract")
@IdClass(SpecialContractId.class) // 복합키를 위한 클래스 정의
public class SpecialContract {

  @Id
  @Column(name = "contract_id", length = 20, nullable = false)
  private String contractId;

  @Id
  @Column(name = "special_contract_id", length = 20, nullable = false)
  private String specialContractId;

  // Getter, Setter
}