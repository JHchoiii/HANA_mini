package com.HanaMini.security.config;


import com.HanaMini.security.jwt.JwtFilter;
import com.HanaMini.security.jwt.JwtUtil;
import com.HanaMini.security.jwt.service.CustomUserDetailsService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig {
  private final CustomUserDetailsService customUserDetailsService;
  private final JwtUtil jwtUtil;

  //    TODO: 인증이 필요한 경로 설정 (사용자 정보가 필요한 API는 whitelist에서 제외)
  private static final String[] AUTH_WHITELIST = {
      "/api/**"
  };

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    //세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 or 사용 X
    http.sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy(
        SessionCreationPolicy.STATELESS));

    http.csrf(AbstractHttpConfigurer::disable);
    http.formLogin(AbstractHttpConfigurer::disable);
    http.httpBasic(AbstractHttpConfigurer::disable);

    // JWT 필터 추가
    http.addFilterBefore(new JwtFilter(jwtUtil, customUserDetailsService), UsernamePasswordAuthenticationFilter.class);

    // 권한 규칙 작성
    http.authorizeHttpRequests(authorize -> authorize
        .requestMatchers(AUTH_WHITELIST).permitAll()
        //@PreAuthrization을 사용할 것이기 때문에 모든 경로에 대한 인증처리는 Pass
        .anyRequest().permitAll()
    );
    return http.build();
  }
}