package com.HanaMini.DTO;

import lombok.Data;

@Data
public class FeatureDataDTO {
  // 기존 16개 피처
  private int fraud_count;
  private double claim_frequency;
  private int email_dup_count;
  private int issuer_dup_count;
  private int claim_delay_days;
  private int quick_claims_flag;
  private int age;
  private int accident_month;
  private int accident_dayofweek;
  private int contract_id;
  private int document_issuer;
  private int email;
  private int insurance_id;
  private int claim_type;
  private int status_x;
  private int status_y;

  // 추가로 전송할 피처 (15개)
  private float rule1_score;
  private float rule2_score;
  private float rule3_score;
  private float rule4_score;
  private float rule5_score;
  private float rule6_score;
  private int identification_number;
  private int gender;
  private float point;
  private int contract_days;
  private float total_premium;
  private int is_reviewed;
  private int claim_count;
  private int quick_claim;
}
