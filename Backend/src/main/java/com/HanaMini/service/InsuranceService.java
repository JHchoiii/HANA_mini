package com.HanaMini.service;

import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;

@Service
public class InsuranceService {

  @Autowired
  private InsuranceContractRepository insuranceSubscriptionRepository;

  @Autowired
  private MemberRepository memberRepository;

  public Long countInsuranceByMemberId(String memberId) {
    Long count = insuranceSubscriptionRepository.countExcludingGiftsSentByMember(memberId);
    System.out.println(count);
    return count;
  }


//  public Long
}
