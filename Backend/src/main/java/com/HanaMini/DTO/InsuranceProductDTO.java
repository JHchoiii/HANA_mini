package com.HanaMini.DTO;

import com.HanaMini.entity.InsuranceProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InsuranceProductDTO {
  private String insuranceId;
  private String insuranceName;
  private String productType;
  private String insuranceCategory;
  private String description;
  private String paymentType;
  private String link;

  public InsuranceProductDTO(InsuranceProduct insuranceProduct) {
    this.insuranceId = insuranceProduct.getInsuranceId();
    this.insuranceName = insuranceProduct.getInsuranceName();
    this.productType = insuranceProduct.getProductType();
    this.insuranceCategory = insuranceProduct.getInsuranceCategory();
    this.description = insuranceProduct.getDescription();
    this.paymentType = insuranceProduct.getPaymentType();
    this.link = "/product/" + insuranceProduct.getInsuranceId();
  }

  // JPQL 생성자 표현식에 맞는 생성자 추가
  public InsuranceProductDTO(String insuranceId, String insuranceName, String productType, String insuranceCategory, String description, String paymentType) {
    this.insuranceId = insuranceId;
    this.insuranceName = insuranceName;
    this.productType = productType;
    this.insuranceCategory = insuranceCategory;
    this.description = description;
    this.paymentType = paymentType;
    this.link = "/product/" + insuranceId;
  }
}
