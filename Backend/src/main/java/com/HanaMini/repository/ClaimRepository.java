package com.HanaMini.repository;

import com.HanaMini.DTO.dashboard.ClaimsByTypeDTO;
import com.HanaMini.DTO.dashboard.ClaimsOverTimeDTO;
import com.HanaMini.entity.Claim;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ClaimRepository extends JpaRepository<Claim, String> {
  List<Claim> findByMemberId(String memberId);
  List<Claim> findAllByOrderByClaimIdDesc();
  // 가장 큰 claim_id 조회
  @Query("SELECT c.claimId FROM Claim c WHERE c.claimId LIKE 'C%' ORDER BY c.claimId DESC LIMIT 1")
  String findMaxClaimId();


  @Query(value = "SELECT COUNT(*) FROM Claim c JOIN Insurance_Contract ic ON c.contract_id = ic.contract_id " +
      "WHERE c.contract_id = :contractId " +
      "AND (TRUNC(c.accident_date) - TRUNC(ic.start_date)) <= (ic.contract_days * 0.1)", nativeQuery = true)
  Long countQuickClaims(String contractId);
  // 기타 메서드
  Long countByContractId(String contractId);
  Long countByDocumentIssuer(String documentIssuer);
  Long countByIsFraud(String isFraud);

  // 클레임 추이 (월별)
  // 클레임 추이 (월별)
  @Query("SELECT new com.HanaMini.DTO.dashboard.ClaimsOverTimeDTO(TO_CHAR(c.accidentDate, 'YYYY-MM'), COUNT(c)) " +
      "FROM Claim c GROUP BY TO_CHAR(c.accidentDate, 'YYYY-MM') " +
      "ORDER BY TO_CHAR(c.accidentDate, 'YYYY-MM') ASC")
  List<ClaimsOverTimeDTO> findClaimsOverTime();

  // 클레임 유형별 분포
  @Query("SELECT new com.HanaMini.DTO.dashboard.ClaimsByTypeDTO(c.claimType, COUNT(c)) " +
      "FROM Claim c GROUP BY c.claimType")
  List<ClaimsByTypeDTO> findClaimsByType();

  @Query(value = "SELECT AVG(claims_per_contract) FROM (SELECT COUNT(*) AS claims_per_contract FROM Claim GROUP BY contract_id)", nativeQuery = true)
  Double findAverageClaimsPerContract();
}