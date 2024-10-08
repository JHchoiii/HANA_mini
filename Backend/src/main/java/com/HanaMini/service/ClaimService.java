package com.HanaMini.service;

import com.HanaMini.DTO.ClaimCreateDTO;
import com.HanaMini.DTO.ClaimDTO;
import com.HanaMini.DTO.ClaimStatusDTO;
import com.HanaMini.DTO.DocumentDTO;
import com.HanaMini.entity.Claim;
import com.HanaMini.repository.ClaimRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ClaimService {

  @Autowired
  private ClaimRepository claimRepository;

  private static final String UPLOAD_DIR = System.getProperty("java.io.tmpdir") + "/uploads/";


  public List<ClaimDTO> getClaimsByMemberId(String memberId) {
    List<Claim> claims = claimRepository.findByMemberId(memberId);

    return claims.stream().map(claim -> ClaimDTO.builder()
            .claimId(claim.getClaimId())
            .status(claim.getStatus())
            .selectedInsurance(claim.getContractId())
            .accidentDate(claim.getAccidentDate().toString()) // String으로 변환
            .description(claim.getClaimDetails())
            .documentIssuer(claim.getDocumentIssuer())
            .documents(getDocumentDTOs(claim.getDocuments())) // 여기서 사용됨
            .build())
        .collect(Collectors.toList());
  }

  private List<DocumentDTO> getDocumentDTOs(String documentsPath) {
    if (documentsPath == null || documentsPath.isEmpty()) {
      return null;
    }

    return List.of(documentsPath.split(";")).stream()
        .filter(path -> !path.trim().isEmpty())
        .map(path -> {
          Path filePath = Paths.get(path);
          String fileName = filePath.getFileName().toString();
          String fileType = "";

          try {
            fileType = Files.probeContentType(filePath);
          } catch (IOException e) {
            e.printStackTrace();
          }

          // 파일 URL 생성 (WebConfig에서 설정한 /uploads/ 매핑 사용)
          String fileUrl = "/uploads/" + fileName;

          return DocumentDTO.builder()
              .fileName(fileName)
              .fileUrl(fileUrl)
              .fileType(fileType)
              .build();
        })
        .collect(Collectors.toList());
  }



  public List<ClaimStatusDTO> getClaimStatusCountByMemberId(String memberId) {
    List<Claim> claims = claimRepository.findByMemberId(memberId);

    return claims.stream()
        .collect(Collectors.groupingBy(Claim::getStatus, Collectors.counting())) // status로 그룹화
        .entrySet().stream()
        .map(entry -> new ClaimStatusDTO(entry.getKey(), entry.getValue())) // DTO로 매핑
        .collect(Collectors.toList());
  }

  public void createClaim(ClaimCreateDTO claimCreateDTO) throws IOException {
    // 마지막 claim_id 조회
    String lastClaimId = claimRepository.findMaxClaimId();

    // 새로운 claim_id 생성
    String newClaimId = generateNextClaimId(lastClaimId);

    // 서류 파일 업로드 처리
    StringBuilder documentPaths = new StringBuilder();
    if (claimCreateDTO.getDocuments() != null) {
      for (MultipartFile file : claimCreateDTO.getDocuments()) {
        if (!file.isEmpty()) {
          String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
          Path uploadPath = Paths.get(UPLOAD_DIR);
          if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
          }
          Path filePath = uploadPath.resolve(fileName);
          Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING); // 파일 저장
          documentPaths.append(filePath.toString()).append(";");
        }
      }
    }

    // accidentDate를 LocalDateTime 또는 LocalDate로 변환하고 Timestamp로 변환
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
    DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    LocalDateTime accidentDateTime;
    try {
      // 먼저 날짜와 시간이 모두 있는 경우 시도
      accidentDateTime = LocalDateTime.parse(claimCreateDTO.getAccidentDate(), dateTimeFormatter);
    } catch (DateTimeParseException e) {
      // 만약 날짜만 있다면 LocalDate로 처리
      LocalDate localDate = LocalDate.parse(claimCreateDTO.getAccidentDate(), dateFormatter);
      accidentDateTime = localDate.atStartOfDay(); // 시간을 00:00:00으로 설정
    }

    Timestamp accidentTimestamp = Timestamp.valueOf(accidentDateTime);

    // Claim 엔티티 생성 및 저장
    Claim claim = Claim.builder()
        .claimId(newClaimId)
        .contractId(claimCreateDTO.getSelectedInsurance()) // 계약 ID
        .memberId(claimCreateDTO.getMemberId()) // 필요하다면 현재 로그인한 사용자 정보로 변경
        .claimDetails(claimCreateDTO.getDescription()) // 청구 설명
        .accidentDate(accidentTimestamp) // 사고 날짜
        .documentIssuer(claimCreateDTO.getDocumentIssuer()) // 서류 발급처
        .documents(documentPaths.toString()) // 파일 경로들
        .status("승인 대기") // 초기 상태 설정
        .build();

    // 청구 정보 저장
    claimRepository.save(claim);
  }

  public String generateNextClaimId(String lastClaimId) {
    if (lastClaimId == null) {
      return "C000001";  // 첫 번째 claimId
    }

    // 숫자 부분만 추출하여 증가
    int number = Integer.parseInt(lastClaimId.substring(1));
    number++;

    // 새로운 claimId 반환 (C로 시작하고, 숫자는 6자리로 맞춤)
    return String.format("C%06d", number);
  }

  public List<ClaimDTO> getAllClaims() {
    List<Claim> claims = claimRepository.findAllByOrderByClaimIdDesc();
    List<ClaimDTO> claimDTOs = new ArrayList<>();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    for (Claim claim : claims) {
      ClaimDTO dto = ClaimDTO.builder()
          .claimId(claim.getClaimId())
          .memberId(claim.getMemberId())
          .contractId(claim.getContractId())
          .claimDetails(claim.getClaimDetails())
          .accidentDate(claim.getAccidentDate() != null ? sdf.format(claim.getAccidentDate()) : null)
          .reportedDate(claim.getReportedDate() != null ? sdf.format(claim.getReportedDate()) : null)
          .claimType(claim.getClaimType())
          .documentIssuer(claim.getDocumentIssuer())
          .documents(getDocumentDTOs(claim.getDocuments()))
          .status(claim.getStatus())
          .fraudScore(claim.getFraud_score())
          .isFraud(claim.getIsFraud())
          .estimatedFraud(claim.getEstimatedFraud())
          .rule1Score(claim.getRule1Score())
          .rule2Score(claim.getRule2Score())
          .rule3Score(claim.getRule3Score())
          .rule4Score(claim.getRule4Score())
          .rule5Score(claim.getRule5Score())
          .rule6Score(claim.getRule6Score())
          .build();
      claimDTOs.add(dto);
    }

    return claimDTOs;
  }

}
