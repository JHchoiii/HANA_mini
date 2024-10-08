package com.HanaMini.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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
@Table(name = "GiftBox")
public class GiftBox {

  @Id
  @Column(name = "gift_id", length = 20, nullable = false)
  private String giftId;

  @Column(name = "sender_id", length = 20, nullable = false)
  private String senderId; // 선물을 보낸 회원의 ID

  @Column(name = "receiver_id", length = 20, nullable = false)
  private String receiverId; // 선물을 받은 회원의 ID

  @Column(name = "gift_msg", length = 200)
  private String giftMsg;

  @ManyToOne(fetch = FetchType.LAZY)  // Lazy Loading으로 설정
  @JoinColumn(name = "contract_id", nullable = false)
  private InsuranceContract insuranceContract;

  @Column(name = "registration_status", length = 20, nullable = false)
  private String registrationStatus; // 등록완료/미등록 상태

  @Column(name = "expiration_date")
  private Timestamp expirationDate; // 선물 만료일

  // Getter, Setter
}
