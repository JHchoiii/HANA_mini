package com.HanaMini.repository;

import com.HanaMini.entity.InsuranceContract;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface InsuranceContractRepository extends
    JpaRepository<InsuranceContract, String> {

  Long countByMemberId(String memberId); // member_id로 보험 개수 세기

  List<InsuranceContract> findByMemberId(String memberId);

  InsuranceContract findByContractId(String contractId);

  @Query("SELECT c.contractId FROM InsuranceContract c WHERE c.contractId LIKE ?1% ORDER BY c.contractId DESC LIMIT 1")
  String findLastContractIdByPrefix(String prefix);

  @Query("SELECT ic FROM InsuranceContract ic LEFT JOIN GiftBox gb ON ic.contractId = gb.insuranceContract.contractId "
      + "WHERE ic.memberId = :memberId AND ic.isGift = false OR "
      + "(ic.isGift = true AND (ic.status = '등록' OR ic.status = '만기') AND gb.receiverId = :memberId) ")
  List<InsuranceContract> findContractsExcludingGiftsSentByMember(@Param("memberId") String memberId);

  @Query("SELECT COUNT(isub) FROM InsuranceContract isub "
      + "LEFT JOIN GiftBox gb ON isub.contractId = gb.insuranceContract.contractId "
      + "WHERE isub.memberId = :memberId AND (isub.isGift = false OR gb.senderId != :memberId)")
  Long countExcludingGiftsSentByMember(@Param("memberId") String memberId);
}
