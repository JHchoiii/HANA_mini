package com.HanaMini.controller;

import com.HanaMini.DTO.ClaimDTO;
import com.HanaMini.DTO.dashboard.DashboardDTO;
import com.HanaMini.service.ClaimService;
import com.HanaMini.service.DashboardService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class DashboardController {
  @Autowired
  private ClaimService claimService;

  @Autowired
  private DashboardService dashboardService;

  // 클레임 목록 조회
  @GetMapping("/claims")
  public ResponseEntity<List<ClaimDTO>> getAllClaims() {
    List<ClaimDTO> claims = claimService.getAllClaims();
    return ResponseEntity.ok(claims);
  }

  @GetMapping("/dashboard")
  public ResponseEntity<DashboardDTO> getDashboardData() {
    DashboardDTO dashboard = dashboardService.getDashboardData();
    return ResponseEntity.ok(dashboard);
  }
//  @GetMapping("/stats/total-members")
//  public ResponseEntity<TotalMembersDTO> getTotalMembers() {
//    TotalMembersDTO dto = dashboardService.getTotalMembers();
//    return ResponseEntity.ok(dto);
//  }
//
//  @GetMapping("/stats/total-claims")
//  public ResponseEntity<TotalClaimsDTO> getTotalClaims() {
//    TotalClaimsDTO dto = dashboardService.getTotalClaims();
//    return ResponseEntity.ok(dto);
//  }
//
//  @GetMapping("/stats/total-fraud-claims")
//  public ResponseEntity<TotalFraudClaimsDTO> getTotalFraudClaims() {
//    TotalFraudClaimsDTO dto = dashboardService.getTotalFraudClaims();
//    return ResponseEntity.ok(dto);
//  }
//
//  @GetMapping("/stats/total-giftboxes")
//  public ResponseEntity<TotalGiftBoxesDTO> getTotalGiftBoxes() {
//    TotalGiftBoxesDTO dto = dashboardService.getTotalGiftBoxes();
//    return ResponseEntity.ok(dto);
//  }
//
//  @GetMapping("/stats/total-contracts")
//  public ResponseEntity<TotalContractsDTO> getTotalContracts() {
//    TotalContractsDTO dto = dashboardService.getTotalContracts();
//    return ResponseEntity.ok(dto);
//  }
//
//  @GetMapping("/stats/claims-over-time")
//  public ResponseEntity<List<ClaimsOverTimeDTO>> getClaimsOverTime() {
//    List<ClaimsOverTimeDTO> list = dashboardService.getClaimsOverTime();
//    return ResponseEntity.ok(list);
//  }
//
//  @GetMapping("/stats/claims-by-type")
//  public ResponseEntity<List<ClaimsByTypeDTO>> getClaimsByType() {
//    List<ClaimsByTypeDTO> list = dashboardService.getClaimsByType();
//    return ResponseEntity.ok(list);
//  }
//
//  @GetMapping("/stats/members-by-gender")
//  public ResponseEntity<List<MembersByGenderDTO>> getMembersByGender() {
//    List<MembersByGenderDTO> list = dashboardService.getMembersByGender();
//    return ResponseEntity.ok(list);
//  }
//
//  @GetMapping("/stats/giftboxes-by-status")
//  public ResponseEntity<List<GiftBoxesByStatusDTO>> getGiftBoxesByStatus() {
//    List<GiftBoxesByStatusDTO> list = dashboardService.getGiftBoxesByStatus();
//    return ResponseEntity.ok(list);
//  }
}
