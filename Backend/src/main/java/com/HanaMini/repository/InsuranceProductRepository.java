package com.HanaMini.repository;

import com.HanaMini.DTO.InsuranceProductDTO;
import com.HanaMini.entity.InsuranceProduct;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InsuranceProductRepository extends JpaRepository<InsuranceProduct, String> {
  @Query("SELECT new com.HanaMini.DTO.InsuranceProductDTO(i.insuranceId, i.insuranceName, i.insuranceType, i.insuranceCategory, i.description, i.paymentType, '/product/' || i.insuranceId) FROM InsuranceProduct i WHERE i.insuranceType = '미니'")
  List<InsuranceProductDTO> findDistinctInsuranceProductsByType();

  List<InsuranceProduct> findByInsuranceIdStartingWith(String insuranceIdPrefix);

  List<InsuranceProduct> findByInsuranceIdIn(List<String> insuranceIds);

  // 추가된 커스텀 메서드
  // 수정된 커스텀 메서드
  @Query("SELECT new com.HanaMini.DTO.InsuranceProductDTO(p.insuranceId, p.insuranceName, p.productType, p.insuranceCategory, p.description, p.paymentType) " +
      "FROM InsuranceProduct p " +
      "WHERE p.insuranceType = '미니' " +
      "AND p.insuranceId = (" +
      "  SELECT MIN(p2.insuranceId) " +
      "  FROM InsuranceProduct p2 " +
      "  WHERE p2.insuranceName = p.insuranceName " +
      "  AND p2.insuranceType = '미니'" +
      ") " +
      "ORDER BY p.insuranceId ASC")
  List<InsuranceProductDTO> findUniqueInsuranceNamesForMiniType();

}