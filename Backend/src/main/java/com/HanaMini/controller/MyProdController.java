package com.HanaMini.controller;

import com.HanaMini.DTO.InsuranceProductDTO;
import com.HanaMini.service.InsuranceProductService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user/my-prod/")
public class MyProdController {
  @Autowired
  private InsuranceProductService insuranceProductService;


  // '미니' 보험 상품을 중복되지 않게 반환하는 API
  @GetMapping("/mini-products")
  public List<InsuranceProductDTO> getMiniInsuranceProducts() {
    return insuranceProductService.getDistinctInsuranceProducts();
  }


}
