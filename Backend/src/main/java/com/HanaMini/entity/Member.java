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
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "Member")
public class Member {

  @Id
  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @Column(name = "password", length = 20, nullable = false)
  private String password;

  @Column(name = "name", length = 10, nullable = false)
  private String name;

  @Column(name = "identification_number", length = 30, nullable = false)
  private String identificationNumber;

  @Column(name = "birth_date", length = 10, nullable = false)
  private String birthDate;

  @Column(name = "gender", length = 5, nullable = false)
  private String gender;

  @Column(name = "phone_number", length = 30, nullable = false)
  private String phoneNumber;

  @Column(name = "email", length = 100)
  private String email;

  @Column(name = "point", length = 100)
  private Integer point;

  @Column(name = "fraud_count")
  private Integer fraudCount = 0;  // 기본값 0
  // Getter, Setter
}

