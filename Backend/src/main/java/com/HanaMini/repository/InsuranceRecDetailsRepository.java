package com.HanaMini.repository;

import com.HanaMini.entity.InsuranceRecDetails;
import com.HanaMini.entity.InsuranceRecGroup;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsuranceRecDetailsRepository extends JpaRepository<InsuranceRecDetails, Long> {
  // 추천 그룹에 속한 세부 추천 리스트를 가져오기 위한 메소드
  List<InsuranceRecDetails> findByInsuranceRecGroup(InsuranceRecGroup insuranceRecGroup);
}
