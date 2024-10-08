package com.HanaMini.service;

import com.HanaMini.DTO.InsuranceProductDTO;
import com.HanaMini.DTO.InsuranceProductWithGuaranteesDTO;
import com.HanaMini.entity.Guarantee;
import com.HanaMini.entity.InsuranceProduct;
import com.HanaMini.repository.GuaranteeRepository;
import com.HanaMini.repository.InsuranceProductRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceProductService {

  @Autowired
  private InsuranceProductRepository insuranceProductRepository;

  @Autowired
  private GuaranteeRepository guaranteeRepository;

  // 중복된 보험 이름 없이, '미니' 보험 상품들만 가져옴
  public List<InsuranceProductDTO> getDistinctInsuranceProducts() {
    return insuranceProductRepository.findUniqueInsuranceNamesForMiniType();
  }


  public List<InsuranceProductWithGuaranteesDTO> getInsuranceProductsWithGuarantees(String prefix) {
    // 보험 상품을 prefix로 조회
    List<InsuranceProduct> insuranceProducts = insuranceProductRepository.findByInsuranceIdStartingWith(
        prefix);

    // 각 보험 상품에 대해 보장 내용을 조회하고 DTO로 변환
    return insuranceProducts.stream().map(product -> {
      // 해당 보험 상품의 보장 내용 조회
      List<Guarantee> guarantees = guaranteeRepository.findByInsuranceId(product.getInsuranceId());

      // 보장 내용을 DTO로 변환
      List<InsuranceProductWithGuaranteesDTO.GuaranteeDTO> guaranteeDTOs = guarantees.stream()
          .map(guarantee -> InsuranceProductWithGuaranteesDTO.GuaranteeDTO.builder()
              .guaranteeType(guarantee.getGuaranteeType())
              .guaranteeFee(guarantee.getGuaranteeFee())
              .guaranteeContent(guarantee.getGuaranteeContent())
              .build())
          .collect(Collectors.toList());

      // 보험 상품과 보장 내용을 통합하여 DTO로 반환
      return InsuranceProductWithGuaranteesDTO.builder()
          .insuranceId(product.getInsuranceId())
          .basePrice(product.getBasePrice())
          .dailyIncrease(product.getDailyPrice())
          .guarantees(guaranteeDTOs)
          .build();
    }).collect(Collectors.toList());
  }

  public List<InsuranceProductDTO> getRecommendations(List<String> insuranceIds) {
    List<InsuranceProduct> products = insuranceProductRepository.findByInsuranceIdIn(insuranceIds);
    return products.stream().map(InsuranceProductDTO::new).collect(Collectors.toList());
  }

}


