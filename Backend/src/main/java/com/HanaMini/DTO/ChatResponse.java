// src/main/java/com/HanaMini/DTO/ChatResponse.java

package com.HanaMini.DTO;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Data;

@Data
public class ChatResponse {
  // Getters and Setters
  private String text;
  private List<Recommendation> recommendations;

  public static class Recommendation {
    private String category;

    @JsonProperty("product_name") // JSON의 "product_name"을 Java의 "productName" 필드로 매핑
    private String productName;

    private String description;

    // Getters and Setters
    public String getCategory() {
      return category;
    }

    public void setCategory(String category) {
      this.category = category;
    }

    public String getProductName() {
      return productName;
    }

    public void setProductName(String productName) {
      this.productName = productName;
    }

    public String getDescription() {
      return description;
    }

    public void setDescription(String description) {
      this.description = description;
    }
  }
}
