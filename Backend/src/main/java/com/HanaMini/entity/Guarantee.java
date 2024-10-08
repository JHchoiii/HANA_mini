package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
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
@Table(name = "Guarantee")
public class Guarantee {

  @Id
  @Column(name = "guarantee_id", length = 20, nullable = false)
  private String guaranteeId;

  @Column(name = "insurance_id", length = 20, nullable = false)
  private String insuranceId;

  @Column(name = "guarantee_type", length = 20)
  private String guaranteeType;

  @Column(name = "guarantee_content", length = 200)
  private String guaranteeContent;

  @Column(name = "guarantee_fee", precision = 9 )
  private Integer guaranteeFee;

  // Getter, Setter
}