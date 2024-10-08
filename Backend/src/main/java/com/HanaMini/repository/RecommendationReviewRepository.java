package com.HanaMini.repository;

import com.HanaMini.entity.RecommendationReview;
import com.HanaMini.entity.RecommendationReviewId;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecommendationReviewRepository extends
    JpaRepository<RecommendationReview, RecommendationReviewId> {
  List<RecommendationReview> findByMemberId(String memberId);

}
