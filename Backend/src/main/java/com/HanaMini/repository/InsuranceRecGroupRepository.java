package com.HanaMini.repository;

import com.HanaMini.entity.InsuranceRecGroup;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface InsuranceRecGroupRepository extends JpaRepository<InsuranceRecGroup, String> {
  // 특정 회원의 추천 그룹을 가져오기 위한 메소드
  List<InsuranceRecGroup> findByMemberId(String memberId);
  List<InsuranceRecGroup> findByMemberIdOrderByRecommendationDateDesc(String memberId);
  @Query("SELECT MAX(r.recommendationGroupId) FROM InsuranceRecGroup r")
  String findMaxRecommendationGroupId();
}
