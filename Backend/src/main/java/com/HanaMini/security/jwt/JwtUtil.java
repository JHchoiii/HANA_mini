package com.HanaMini.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtUtil {
  private final Key key;
  private final long accessTokenExpiration;

  public JwtUtil(@Value("${jwt.secret}") String secret, @Value("${jwt.expiration}") long expiration) {
    byte[] keyBytes = Decoders.BASE64.decode(secret);
    this.key = Keys.hmacShaKeyFor(keyBytes);
    this.accessTokenExpiration = expiration;
  }

  /**
   * Access Token 생성
   * @param userDTO 사용자 정보 객체
   * @return Access Token String
   */
  public String createAccessToken(UserDTO userDTO) {
    return createToken(userDTO, accessTokenExpiration);
  }

  private String createToken(UserDTO userDTO, long expireTime) {
    ZonedDateTime now = ZonedDateTime.now();
    ZonedDateTime tokenValidity = now.plusSeconds(expireTime);


    return Jwts.builder()
        .claim("id", userDTO.getId())
        .claim("name", userDTO.getUserName())
        .claim("birthDate", userDTO.getBirthDate())
        .claim("gender", userDTO.getGender())
        .claim("email", userDTO.getEmail())
        .claim("phone", userDTO.getPhoneNumber())
        .claim("point", userDTO.getPoint())
        .setIssuedAt(Date.from(now.toInstant()))
        .setExpiration(Date.from(tokenValidity.toInstant()))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  /**
   * Token에서 사용자 userId 추출
   *
   * @param token JWT Token
   * @return 사용자 Id
   */
  public String getUserId(String token) {
    return parseClaims(token).get("userId", String.class);
  }


  /**
   * Token에서 사용자 이D 추출
   *
   * @param token JWT Token
   * @return 사용자 이름
   */
  public String getUserName(String token) {
    return parseClaims(token).get("name", String.class);
  }

  /**
   * JWT 검증
   * @param token
   * @return IsValidate
   */
  public boolean validateToken(String token) {
    try {
      Jwts.parser().setSigningKey(key).build().parseClaimsJws(token);
      return true;
    } catch (SecurityException | MalformedJwtException e) {
      log.info("Invalid JWT Token", e);
    } catch (ExpiredJwtException e) {
      log.info("Expired JWT Token", e);
    } catch (UnsupportedJwtException e) {
      log.info("Unsupported JWT Token", e);
    } catch (IllegalArgumentException e) {
      log.info("JWT claims string is empty.", e);
    }
    return false;
  }

  /**
   * JWT Claims 추출
   * @param accessToken
   * @return JWT Claims
   */
  public Claims parseClaims(String accessToken) {
    try {
      return Jwts.parser().setSigningKey(key).build().parseClaimsJws(accessToken).getBody();
    } catch (ExpiredJwtException e) {
      return e.getClaims();
    }
  }
}
