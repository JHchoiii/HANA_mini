package com.HanaMini.DTO;

import java.sql.Timestamp;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PointHistoryDTO {
  private String  transactionDate;
  private String description;
  private Integer change; // 포인트 변동 내역

  // 생성자에서 날짜 포맷팅
  public PointHistoryDTO(Timestamp changeDate, String description, int change) {
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");  // 날짜만 표시
    this.transactionDate = changeDate.toLocalDateTime().format(formatter);
    this.description = description;
    this.change = change;
  }
}
