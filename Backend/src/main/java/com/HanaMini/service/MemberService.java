package com.HanaMini.service;

import com.HanaMini.entity.Member;
import com.HanaMini.entity.PointDetails;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.repository.PointDetailsRepository;
import java.sql.Timestamp;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {
  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private PointDetailsRepository pointDetailsRepository;

  public Optional<Member> findMemberByBirthDateAndPhoneNumber(String birthDate, String phoneNumber) {
    return memberRepository.findByBirthDateAndPhoneNumber(birthDate, phoneNumber);
  }

  public void deductPoints(String memberId, Integer usedPoints) {
    Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("Member not found"));

    if (member.getPoint() < usedPoints) {
      throw new IllegalArgumentException("Not enough points to deduct");
    }

    member.setPoint(member.getPoint() - usedPoints);
    memberRepository.save(member);

    PointDetails pointDetails = PointDetails.builder()
        .memberId(memberId)
        .pointIncrease(0)
        .pointDecrease(usedPoints) // 감소는 0으로 설정
        .description("보험 선물")
        .changeDate(new Timestamp(System.currentTimeMillis())) // 현재 날짜와 시간
        .build();
    pointDetailsRepository.save(pointDetails);
  }
}
