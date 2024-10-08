package com.HanaMini.security.jwt;

import lombok.Data;

@Data
public class Claim {
  private UserDTO userDTO;
  private String ImgUrl;
}
