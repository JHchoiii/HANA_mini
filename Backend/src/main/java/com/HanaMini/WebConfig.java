package com.HanaMini;

import org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory;
import org.springframework.boot.web.server.WebServerFactoryCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.thymeleaf.spring6.SpringTemplateEngine;
import org.thymeleaf.spring6.templateresolver.SpringResourceTemplateResolver;
import org.thymeleaf.spring6.view.ThymeleafViewResolver;

@Configuration
public class WebConfig implements WebMvcConfigurer, WebServerFactoryCustomizer<TomcatServletWebServerFactory> {

  private static final String UPLOAD_DIR = System.getProperty("java.io.tmpdir") + "/uploads/";

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOriginPatterns("*") // 패턴 매칭을 사용하여 유연하게 허용a
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
        .allowedHeaders("*")
        .allowCredentials(true);
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // UPLOAD_DIR 경로를 /uploads/** URL 패턴과 매핑
    registry.addResourceHandler("/uploads/**")
        .addResourceLocations("file:" + UPLOAD_DIR);
  }

  @Override
  public void customize(TomcatServletWebServerFactory factory) {
    factory.addConnectorCustomizers(connector -> {
      // 최대 POST 크기 설정 (예: 25MB)
      connector.setMaxPostSize(25 * 1024 * 1024); // 25MB
    });
  }
  // Thymeleaf 설정
  @Bean
  public SpringResourceTemplateResolver thymeleafTemplateResolver(){
    SpringResourceTemplateResolver templateResolver = new SpringResourceTemplateResolver();
    templateResolver.setPrefix("classpath:/templates/"); // Thymeleaf 템플릿 위치
    templateResolver.setSuffix(".html"); // Thymeleaf 템플릿 확장자
    templateResolver.setTemplateMode("HTML");
    templateResolver.setCharacterEncoding("UTF-8");
    templateResolver.setCacheable(false); // 개발 시 false, 배포 시 true
    return templateResolver;
  }

  @Bean
  public SpringTemplateEngine thymeleafTemplateEngine(){
    SpringTemplateEngine templateEngine = new SpringTemplateEngine();
    templateEngine.setTemplateResolver(thymeleafTemplateResolver());
    templateEngine.setEnableSpringELCompiler(true);
    return templateEngine;
  }

  @Bean
  public ViewResolver thymeleafViewResolver(){
    ThymeleafViewResolver resolver = new ThymeleafViewResolver();
    resolver.setTemplateEngine(thymeleafTemplateEngine());
    resolver.setCharacterEncoding("UTF-8");
    resolver.setOrder(Ordered.LOWEST_PRECEDENCE - 5); // JSP보다 우선 순위 높게 설정
    resolver.setViewNames(new String[] { "*.html", "thymeleaf/*" }); // Thymeleaf 템플릿 패턴
    return resolver;
  }

  // JSP 설정
  @Bean
  public InternalResourceViewResolver jspViewResolver(){
    InternalResourceViewResolver resolver = new InternalResourceViewResolver();
    resolver.setPrefix("/WEB-INF/views/"); // JSP 템플릿 위치
    resolver.setSuffix(".jsp"); // JSP 템플릿 확장자
    resolver.setOrder(Ordered.LOWEST_PRECEDENCE); // Thymeleaf보다 낮은 우선 순위
    resolver.setViewNames(new String[] { "*.jsp", "jsp/*" }); // JSP 템플릿 패턴
    return resolver;
  }
}
