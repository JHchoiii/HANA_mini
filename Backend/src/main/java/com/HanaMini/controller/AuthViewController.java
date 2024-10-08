package com.HanaMini.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/auth")
public class AuthViewController {

  @GetMapping("/phoneVerification")
  public String phoneVerificationPage() {
    return "jsp/phoneVerification"; // JSP 페이지 렌더링
  }
}
