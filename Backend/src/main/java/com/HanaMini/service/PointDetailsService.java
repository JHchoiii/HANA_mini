package com.HanaMini.service;

import com.HanaMini.DTO.PointHistoryDTO;
import com.HanaMini.entity.PointDetails;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.repository.PointDetailsRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointDetailsService {

  @Autowired
  private MemberRepository memberRepository;

  @Autowired
  private PointDetailsRepository pointDetailsRepository;

  public List<PointHistoryDTO> getPointHistory(String memberId) {
    List<PointDetails> pointDetailsList = pointDetailsRepository.findByMemberIdOrderByChangeDateDesc(memberId);

    return pointDetailsList.stream()
        .map(pointDetails -> new PointHistoryDTO(
            pointDetails.getChangeDate(),  // 날짜를 DTO에서 포맷팅
            pointDetails.getDescription(),
            pointDetails.getPointIncrease() - pointDetails.getPointDecrease()  // 변동 내역 계산
        ))
        .collect(Collectors.toList());
  }

  public Integer getPoints(String memberId) {
    Integer points = memberRepository.findPointByMemberId(memberId); // 메서드 이름 변경
    System.out.println("points: " + points
    );
    return points != null ? points : 0; // null 처리
  }
}