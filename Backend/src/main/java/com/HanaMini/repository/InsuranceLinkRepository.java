package com.HanaMini.repository;

import com.HanaMini.entity.InsuranceLink;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceLinkRepository extends JpaRepository<InsuranceLink, String> {
//  List<InsuranceLinkBenefit> findByInsuranceLink(InsuranceLink insuranceLink);

}
