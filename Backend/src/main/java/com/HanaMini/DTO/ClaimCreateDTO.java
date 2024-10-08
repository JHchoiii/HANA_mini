package com.HanaMini.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClaimCreateDTO {
  private String memberId;
  private String selectedInsurance;
  private String accidentDate;
  private String description;
  private String documentIssuer;
  private MultipartFile[] documents;
}
