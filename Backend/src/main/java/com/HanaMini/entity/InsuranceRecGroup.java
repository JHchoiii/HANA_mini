package com.HanaMini.entity;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
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
@Table(name = "InsuranceRecGroup")
public class InsuranceRecGroup {

  @Id
  @Column(name = "recommendation_group_id", length = 20, nullable = false)
  private String recommendationGroupId;

  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @Column(name = "recommendation_name", length = 50)
  private String recommendationName;

  @Column(name = "recommendation_date", nullable = false)
  private LocalDateTime recommendationDate;

  // OneToMany 관계 설정
  @OneToMany(mappedBy = "insuranceRecGroup", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<InsuranceRecDetails> insuranceRecDetails;

}
