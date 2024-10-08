package com.HanaMini.repository;

import com.HanaMini.entity.InsuranceLink;
import com.HanaMini.entity.InsuranceLinkBenefit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceLinkBenefitRepository extends
    JpaRepository<InsuranceLinkBenefit, String> {
  List<InsuranceLinkBenefit> findByInsuranceLink(InsuranceLink insuranceLink);
}
