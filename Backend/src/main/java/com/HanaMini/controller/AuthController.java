package com.HanaMini.controller;

import com.HanaMini.service.AuthService;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  @Autowired
  private AuthService authService;

  @PostMapping("/send")
  @ResponseBody
  public Map<String, String> sendSMS(@RequestParam String phoneNumber) {
    String response = authService.sendSMS(phoneNumber);
    Map<String, String> result = new HashMap<>();
    result.put("message", response);
    return result;
  }

  @PostMapping("/verify")
  @ResponseBody
  public Map<String, Object> verifyCode(@RequestParam String phoneNumber,
      @RequestParam String code) {
    boolean success = authService.verifyCode(phoneNumber, code);
    Map<String, Object> result = new HashMap<>();
    result.put("success", success);
    return result;
  }
}
