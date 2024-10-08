package com.HanaMini.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;
import java.util.Map;
import org.springframework.stereotype.Component;

@Component
public class EncodingMapper {
  private Map<String, Map<String, Integer>> encodingMap;

  @PostConstruct
  public void init() throws Exception {
    ObjectMapper mapper = new ObjectMapper();
    InputStream is = getClass().getClassLoader().getResourceAsStream("encoding_mapping.json");
    if (is == null) {
      throw new RuntimeException("encoding_mapping.json not found in resources");
    }
    encodingMap = mapper.readValue(is, Map.class);
  }

  /**
   * 주어진 카테고리와 값에 대해 인코딩된 정수를 반환합니다.
   * 만약 값이 매핑에 없으면 "UNKNOWN"의 값을 반환합니다.
   *
   * @param category 인코딩할 카테고리 (예: "contract_id")
   * @param value    인코딩할 값 (예: "C001")
   * @return 인코딩된 정수 값 또는 -1 (UNKNOWN)
   */
  public int encode(String category, String value) {
    Map<String, Integer> categoryMap = encodingMap.get(category);
    if (categoryMap == null) {
      return -1; // UNKNOWN
    }
    return categoryMap.getOrDefault(value, categoryMap.getOrDefault("UNKNOWN", -1));
  }
}