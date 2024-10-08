package com.HanaMini.entity;

import com.HanaMini.utils.JsonConverter;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.sql.Timestamp;
import java.util.Map;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "InsuranceContract")
public class InsuranceContract {

  @Id
  @Column(name = "contract_id", length = 20, nullable = false)
  private String contractId;

  @Column(name = "member_id", length = 20, nullable = false)
  private String memberId;

  @ManyToOne(fetch = FetchType.LAZY)  // Lazy Loading으로 설정
  @JoinColumn(name = "insurance_id", nullable = false)
  private InsuranceProduct insuranceProduct;

  @Column(name = "special_contract_status", length = 10)
  private Boolean specialContractStatus;

  @Column(name = "last_payment_date", nullable = false)
  private Timestamp lastPaymentDate;

  @Column(name = "start_date") //등록 하면 입력 될것
  private Timestamp startDate;

  @Column(name = "end_date") //등록 하면 입력 될것
  private Timestamp endDate;

  @Column(name = "contract_days")
  private Integer contractDays;

  @Column(name = "total_premium", precision = 9) //
  private Integer totalPremium;

  @Column(name = "current_premium", precision = 9) //초기에 0으로 세팅
  private Integer currentPremium;

  @Column(name = "status", length = 10, nullable = false) // 선물일 시 미등록
  private String status;

  @Column(name = "contractor", nullable = false) // 로그인한 사람
  private String contractor;

  @Column(name = "insured_Person") // 전화번호 해쉬값
  private String insuredPerson;

  @Column(name = "is_gift")
  private Boolean isGift;  // 선물 여부를 나타내는 컬럼 추가

  @Convert(converter = JsonConverter.class)
  @Column(name = "additional_information", columnDefinition = "CLOB")
  private Map<String, Object> additionalInformation;  // JSON 정보를 담는 필드

  @Column(name = "is_reviewed")
  private Boolean isReviewed = false;  // 리뷰 작성 여부를 나타내는 컬럼 추가
}
