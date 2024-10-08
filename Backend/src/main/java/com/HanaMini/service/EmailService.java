package com.HanaMini.service;

import com.HanaMini.entity.InsuranceContract;
import com.HanaMini.entity.Member;
import com.HanaMini.repository.InsuranceContractRepository;
import com.HanaMini.repository.MemberRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {

  @Autowired
  private JavaMailSender emailSender;

  @Autowired
  private TemplateEngine emailTemplateEngine;

  @Autowired
  private InsuranceContractRepository insuranceContractRepository;

  @Autowired
  private MemberRepository memberRepository;

  public void sendInsurancePolicyEmail(String contractId, Map<String, Object> data) throws MessagingException {
    // 계약 정보 조회
    InsuranceContract contract = insuranceContractRepository.findById(contractId)
        .orElseThrow(() -> new MessagingException("계약 정보를 찾을 수 없습니다."));

    // 멤버 정보 조회
    Member member = memberRepository.findById(contract.getMemberId())
        .orElseThrow(() -> new MessagingException("회원 정보를 찾을 수 없거나 이메일이 없습니다."));

    String toAddress = member.getEmail();

    MimeMessage message = emailSender.createMimeMessage();

    // 첨부파일을 포함하기 위해 multipart=true로 설정
    MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
    helper.setTo(toAddress);
    helper.setSubject("보험 증권이 도착했습니다.");
    helper.setFrom("401flypig@naver.com"); // 명시적으로 From 주소 설정

    // 이메일 본문 설정 (단순 텍스트)
    helper.setText("보험 계약 증권입니다.", false); // false는 텍스트로 전송

    // Thymeleaf를 이용하여 첨부파일용 HTML 생성
    Context context = new Context();
    context.setVariable("contract", contract);
    context.setVariable("signature", data.get("signature")); // 서명 이미지 데이터 추가
    String htmlContent = emailTemplateEngine.process("thymeleaf/insurancePolicyEmail", context);

    // HTML 파일을 바이트 배열로 변환
    byte[] htmlBytes = htmlContent.getBytes(StandardCharsets.UTF_8);
    ByteArrayResource htmlResource = new ByteArrayResource(htmlBytes);

    // 첨부파일 추가 (파일 이름에 .html 확장자 포함)
    helper.addAttachment("insurancePolicyEmail.html", htmlResource, "text/html");

    // 이메일 전송
    emailSender.send(message);
  }
}
