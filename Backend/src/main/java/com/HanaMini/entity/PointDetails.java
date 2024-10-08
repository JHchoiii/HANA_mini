package com.HanaMini.entity;

import jakarta.persistence.*;
import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PointDetails")
public class PointDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 자동 생성되는 ID

  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @Column(name = "point_increase", precision = 9)
  private Integer pointIncrease;

  @Column(name = "point_decrease", precision = 9)
  private Integer pointDecrease;

  @Column(name = "description", length = 200, nullable = false)
  private String description;

  @Column(name = "change_date", nullable = false)
  private Timestamp changeDate;

  // Getter, Setter
}
