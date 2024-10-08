package com.HanaMini.config;

//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.thymeleaf.TemplateEngine;
//import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
//
//@Configuration
//public class EmailConfig {
//
//  @Bean
//  public TemplateEngine emailTemplateEngine() {
//    ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
//    templateResolver.setPrefix("/templates/"); // 템플릿 폴더 경로
//    templateResolver.setSuffix(".html");
//    templateResolver.setTemplateMode("HTML");
//    templateResolver.setCharacterEncoding("UTF-8");
//    templateResolver.setCacheable(false); // 개발 시 false, 운영 시 true
//
//    TemplateEngine templateEngine = new TemplateEngine();
//    templateEngine.setTemplateResolver(templateResolver);
//    return templateEngine;
//  }
//}
