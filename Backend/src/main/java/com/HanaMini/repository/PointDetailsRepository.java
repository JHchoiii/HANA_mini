package com.HanaMini.repository;

import com.HanaMini.entity.PointDetails;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PointDetailsRepository extends JpaRepository<PointDetails, String> {
  List<PointDetails> findByMemberIdOrderByChangeDateDesc(String memberId);
}
