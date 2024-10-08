package com.HanaMini.service;

import com.HanaMini.entity.Member;
import com.HanaMini.repository.MemberRepository;
import com.HanaMini.security.jwt.JwtUtil;
import com.HanaMini.security.jwt.UserDTO;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {


  private final JwtUtil jwtUtil;

  @Autowired
  MemberRepository memberRepository;

  public String validateUser(String id, String rawPassword) {

//  DB 연결시 -> DB에서 해당 아이디에 걸려있는 비밀번호와 비교하는 로직

    Optional<Member> memberOptional = memberRepository.findById(id);
    System.out.println(memberOptional);

    if (memberOptional.isPresent()) {
      Member member = memberOptional.get();

      if (member.getPassword().equals(rawPassword)) {
        UserDTO userDTO = new UserDTO(
            member.getMemberId(),
            member.getName(),
            member.getBirthDate(),
            member.getGender(),
            member.getPhoneNumber(),
            member.getEmail(),
            member.getPoint()
        );
        return jwtUtil.createAccessToken(userDTO);
      }
    }
    return null;
  }
}