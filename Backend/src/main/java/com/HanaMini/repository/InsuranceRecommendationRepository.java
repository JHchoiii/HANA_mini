package com.HanaMini.repository;

import com.HanaMini.entity.InsuranceRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRecommendationRepository extends
    JpaRepository<InsuranceRecommendation, String> {
}
