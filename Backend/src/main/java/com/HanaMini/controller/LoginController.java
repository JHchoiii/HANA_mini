package com.HanaMini.controller;

import com.HanaMini.DTO.LoginRequestDTO;
import com.HanaMini.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LoginController {

  @Autowired
  private LoginService loginService;

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody LoginRequestDTO request) {
    // 로그인 요청 처리 로직 추가
    System.out.println("in ");
    String response = loginService.validateUser(request.getId(), request.getPassword());

    System.out.println(response);
    return ResponseEntity.ok(response);
  }
}

