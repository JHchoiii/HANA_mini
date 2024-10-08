package com.HanaMini.controller;

import com.HanaMini.DTO.FraudPredictionResultDTO;
import com.HanaMini.service.ClaimFDSService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ClaimFDSController {

  @Autowired
  private ClaimFDSService claimFDSService;

  @PostMapping("/{claimId}/detect-fraud")
  public ResponseEntity<FraudPredictionResultDTO> detectFraud(@PathVariable String claimId) {
    try {
      FraudPredictionResultDTO result = claimFDSService.calculateFraudScore(claimId);
      return ResponseEntity.ok(result);
    } catch (Exception e) {
      // 예외 처리 로직 추가 (예: 로깅)
      return ResponseEntity.status(500).build();
    }
  }
}