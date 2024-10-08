package com.HanaMini.DTO;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReviewWithInsuranceDTO {
  private String contractId;
  private String insuranceName;
  private String productType;
  private Integer reviewScore;
  private String reviewContent;
  private Date createdDate;
}