package com.HanaMini.service;

import com.HanaMini.DTO.dashboard.DashboardDTO;
import com.HanaMini.repository.ClaimRepository;
import com.HanaMini.repository.GiftBoxRepository;
import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.repository.RecommendationReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class  DashboardService {

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private ClaimRepository claimRepository;

  @Autowired
  private GiftBoxRepository giftBoxRepository;

  @Autowired
  private InsuranceContractRepository contractRepository;

  @Autowired
  private RecommendationReviewRepository reviewRepository;

  public DashboardDTO getDashboardData() {
    DashboardDTO dashboard = new DashboardDTO();

    // 통계 데이터
    dashboard.setTotalMembers(memberRepository.count());
    dashboard.setTotalClaims(claimRepository.count());
    dashboard.setTotalFraudClaims(claimRepository.countByIsFraud("1"));
    dashboard.setTotalGiftBoxes(giftBoxRepository.count());
    dashboard.setTotalContracts(contractRepository.count());

    // 차트 데이터
    dashboard.setClaimsOverTime(claimRepository.findClaimsOverTime());
    dashboard.setClaimsByType(claimRepository.findClaimsByType());
    dashboard.setMembersByGender(memberRepository.findMembersByGender());
    dashboard.setGiftBoxesByStatus(giftBoxRepository.findGiftBoxesByStatus());

    return dashboard;
  }
}