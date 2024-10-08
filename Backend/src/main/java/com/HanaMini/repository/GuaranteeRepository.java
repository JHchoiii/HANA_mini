package com.HanaMini.repository;

import com.HanaMini.entity.Guarantee;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GuaranteeRepository extends JpaRepository<Guarantee, String> {
  List<Guarantee> findByInsuranceId(String insuranceId);
}
