package com.HanaMini.security.jwt.service;

import com.HanaMini.entity.Member;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.security.jwt.UserDTO;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Data
public class CustomUserDetailsService {
  @Autowired
  private MemberRepository memberRepository;

  public UserDTO loadUserByUserId(String id) throws UsernameNotFoundException {
    Member member = memberRepository.findById(id).orElse(null); // 해당하는 유저가 없을시 null 반환
    if(member == null) {
      throw new UsernameNotFoundException("해당하는 유저가 없습니다.");
    }

    UserDTO userDTO = new UserDTO(
        member.getMemberId(),
        member.getName(),
        member.getBirthDate(),
        member.getGender(),
        member.getPhoneNumber(),
        member.getEmail(),
        member.getPoint()
    );
    return userDTO; // -> JPA꺼 UserDTO로 바꿔주기
  }
}