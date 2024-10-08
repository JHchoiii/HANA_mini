package com.HanaMini.repository;

import com.HanaMini.DTO.dashboard.MembersByGenderDTO;
import com.HanaMini.entity.Member;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MemberRepository extends JpaRepository<Member, String> {

  Optional<Member> findByBirthDateAndPhoneNumber(String birthDate,
      String phoneNumber);

  Long countByEmail(String email);

  @Query("SELECT new com.HanaMini.DTO.dashboard.MembersByGenderDTO(m.gender, COUNT(m)) " +
      "FROM Member m GROUP BY m.gender")
  List<MembersByGenderDTO> findMembersByGender();

  @Query("SELECT AVG(m.fraudCount) FROM Member m")
  double findAverageFraudCount();

  @Query("SELECT m.point FROM Member m WHERE m.memberId = :memberId")
  Integer findPointByMemberId(@Param("memberId") String memberId);

}