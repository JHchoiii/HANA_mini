package com.HanaMini.repository;

import com.HanaMini.entity.SpecialContractDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialContractDetailRepository extends
    JpaRepository<SpecialContractDetail, String> {
}
