package com.HanaMini.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserDTO {
  private String id;
  private String userName;
  private String birthDate;
  private String gender;
  private String phoneNumber;
  private String email;
  private Integer point;

  public UserDTO(String id) {
    this.id = id;
  }
}
