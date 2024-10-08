package com.HanaMini.repository;

import com.HanaMini.entity.SpecialContract;
import com.HanaMini.entity.SpecialContractId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialContractRepository extends
    JpaRepository<SpecialContract, SpecialContractId> {
}
