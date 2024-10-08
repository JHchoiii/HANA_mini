package com.HanaMini.entity;

import java.io.Serializable;
import java.util.Objects;

public class RecommendationReviewId implements Serializable {

  private String contractId;
  private String memberId;

  public RecommendationReviewId() {}

  public RecommendationReviewId(String contractId, String memberId) {
    this.contractId = contractId;
    this.memberId = memberId;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    RecommendationReviewId that = (RecommendationReviewId) o;
    return Objects.equals(contractId, that.contractId) &&
        Objects.equals(memberId, that.memberId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(contractId, memberId);
  }
  // Constructors, equals, and hashCode
}