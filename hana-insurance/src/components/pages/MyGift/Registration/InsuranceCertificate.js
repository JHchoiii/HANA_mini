import React from "react";
import {
  Box,
  Container,
  Text,
  Image,
  Flex,
  Divider,
  VStack,
  HStack,
  Button,
} from "@chakra-ui/react";

const InsuranceCertificate = ({ insuranceData }) => {
  const {
    contractNumber,
    insuranceName,
    policyholder,
    insuredPerson,
    insurancePeriod,
    premium,
    carNumber,
    coverage,
  } = insuranceData; // 전달된 보험 데이터

  return (
    <Container maxW="container.md" py={8}>
      <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
        <VStack spacing={4} align="center">
          {/* 보험 회사 로고 */}
          <Image
            src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/tab_icon02_on.png"
            alt="보험 회사 로고"
            boxSize="60px"
          />

          <Text fontSize="2xl" fontWeight="bold" color="pink.600">
            원데이자동차보험가입증명서
          </Text>

          {/* 보험 정보 섹션 */}
          <Divider />

          <HStack justifyContent="space-between" w="100%">
            <Text>계약 번호:</Text>
            <Text>{contractNumber}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <Text>보험 상품명:</Text>
            <Text>{insuranceName}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <Text>보험 계약자:</Text>
            <Text>{policyholder}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <Text>피보험자:</Text>
            <Text>{insuredPerson}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <Text>보험 기간:</Text>
            <Text>{insurancePeriod}</Text>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <Text>보험료:</Text>
            <Text>{premium.toLocaleString()} 원</Text>
          </HStack>
          <HStack justifyContent="space-between" w="100%">
            <Text>차량 번호:</Text>
            <Text>{carNumber}</Text>
          </HStack>

          {/* 보장 내역 */}
          <Box w="100%" bg="gray.50" p={4} borderRadius="md">
            <Text fontSize="lg" fontWeight="semibold" color="pink.600">
              보장 내용
            </Text>
            <Divider />
            {coverage.map((item, idx) => (
              <HStack key={idx} justifyContent="space-between">
                <Text>{item.name}</Text>
                <Text>{item.limit}</Text>
              </HStack>
            ))}
          </Box>

          {/* 등록 버튼 */}
          <Button colorScheme="pink" size="lg">
            보험 등록 완료
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default InsuranceCertificate;
