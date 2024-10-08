package com.HanaMini.service;

import com.HanaMini.DTO.ApplicableBenefitDTO;
import com.HanaMini.DTO.InsuranceNameCountDTO;
import com.HanaMini.DTO.InsuranceProductDTO;
import com.HanaMini.entity.InsuranceContract;
import com.HanaMini.entity.InsuranceLink;
import com.HanaMini.entity.InsuranceLinkBenefit;
import com.HanaMini.entity.InsuranceProduct;
import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.InsuranceLinkBenefitRepository;
import com.HanaMini.repository.InsuranceLinkRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceLinkService {
  @Autowired
  private InsuranceContractRepository insuranceContractRepository;

  @Autowired
  private InsuranceLinkRepository insuranceLinkRepository;

  @Autowired
  private InsuranceLinkBenefitRepository insuranceLinkBenefitRepository;

  public List<ApplicableBenefitDTO> getApplicableBenefits(String memberId) {
    // Step 1: Retrieve all InsuranceContracts for the member
    List<InsuranceContract> contracts = insuranceContractRepository.findContractsExcludingGiftsSentByMember(memberId);

    // Step 2: Count the number of each insurance_name
    Map<String, Long> insuranceNameCounts = contracts.stream()
        .map(contract -> contract.getInsuranceProduct().getInsuranceName())
        .collect(Collectors.groupingBy(name -> name, Collectors.counting()));

    // Step 3: Fetch all InsuranceLinks
    List<InsuranceLink> allLinks = insuranceLinkRepository.findAll();

    List<ApplicableBenefitDTO> applicableBenefits = new ArrayList<>();

    for (InsuranceLink link : allLinks) {
      // Get the list of insurance names required for this link
      List<String> requiredInsuranceNames = link.getInsuranceNames();

      // Fetch all benefits associated with this link
      List<InsuranceLinkBenefit> benefits = insuranceLinkBenefitRepository.findByInsuranceLink(link);

      for (InsuranceLinkBenefit benefit : benefits) {
        Integer minCount = benefit.getMinCount() != null ? benefit.getMinCount() : 0;

        // Check if user has at least min_count for each insurance_name
        boolean meetsConditions = requiredInsuranceNames.stream()
            .allMatch(name -> insuranceNameCounts.getOrDefault(name, 0L) >= minCount);

        if (meetsConditions) {
          // Get the long-term insurance product details
          InsuranceProduct longTermInsurance = link.getLongTermInsuranceProduct();

          InsuranceProductDTO insuranceDTO = new InsuranceProductDTO(longTermInsurance);

          // Get the list of insurance_names that contributed along with their counts
          List<InsuranceNameCountDTO> contributingInsurances = requiredInsuranceNames.stream()
              .distinct()
              .map(name -> new InsuranceNameCountDTO(name, insuranceNameCounts.getOrDefault(name, 0L)))
              .collect(Collectors.toList());

          // Create DTO for applicable benefit
          ApplicableBenefitDTO dto = new ApplicableBenefitDTO(
              benefit.getBenefitId(),
              benefit.getBenefitType(),
              benefit.getBenefitContent(),
              benefit.getBenefitValue(),
              contributingInsurances,
              insuranceDTO
          );

          applicableBenefits.add(dto);
        }
      }
    }

    return applicableBenefits;
  }
}
