// GiftRegistration.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../../../Header2";
import Footer from "../../../footer";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Image,
  Spinner,
  VStack,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const GiftRegistration = () => {
  const { contractId } = useParams(); // URL에서 contractId 가져오기
  const [insuranceInfo, setInsuranceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const headerTextColor = useColorModeValue("pink.600", "pink.300");

  useEffect(() => {
    // 보험 상품 및 계약 정보 가져오기
    axios
      .get(
        `http://localhost:8080/api/my-gift/insurance-products/contract/${contractId}`
      )
      .then((response) => {
        console.log("Response data:", response.data); // 응답 데이터 로깅
        setInsuranceInfo(response.data); // 상태에 데이터 저장
      })
      .catch((error) => {
        console.error("Error fetching insurance product data:", error);
      });
  }, [contractId]);

  const handleRegisterClick = () => {
    setIsLoading(true); // 로딩 상태로 전환
    // 새 창을 열고 핸드폰 인증 페이지로 이동
    const newWindow = window.open(
      "http://localhost:8080/api/auth/phoneVerification",
      "phoneVerification",
      "width=600,height=700"
    );

    // 새 창이 닫히는지 주기적으로 확인
    const checkWindowClose = setInterval(() => {
      if (newWindow.closed) {
        clearInterval(checkWindowClose);
        setIsLoading(false); // 새 창이 닫히면 로딩 상태 해제

        // 인증 완료 후 보험 등록 페이지로 이동
        navigate(`/InsGift/Registration/${contractId}`);
      }
    }, 500);
  };

  // Breadcrumb 색상 설정
  const breadcrumbColor = useColorModeValue("pink.600", "pink.300");

  return (
    <Box className="MyIns flex flex-col justify-between min-h-screen">
      <Header />
      <Container maxW="container.xl" p={6}>
        {/* Breadcrumb 네비게이션 */}
        {/* 상단 네비게이션 */}
        <Flex mb={4} justify="space-between" align="center" direction="row">
          <Button
            onClick={() => window.history.back()}
            colorScheme="pink"
            variant="ghost"
            leftIcon={<FaArrowLeft />}
          >
            뒤로가기
          </Button>
          <Breadcrumb
            spacing="8px"
            separator=">"
            color={headerTextColor}
            mr="120px"
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <Flex align="center">
                  <FaHome style={{ marginRight: "8px" }} />홈
                </Flex>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">마이 보험</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">선물함</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">선물 등록</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box />
        </Flex>
        <Container maxW="container.md" flex="1" py={8}>
          {/* 페이지 타이틀 */}
          <Flex align="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="pink.600">
              보험 선물 등록
            </Text>
          </Flex>

          {/* 보험 정보 섹션 */}
          {insuranceInfo ? (
            <Box
              p={6}
              bg="white"
              boxShadow="md"
              borderRadius="20px"
              mb={6}
              border="1px"
              borderColor="pink.100"
            >
              <Flex direction="column" align="center" mb={4}>
                <Image
                  src={
                    insuranceInfo.imageUrl ||
                    "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/tab_icon02_on.png"
                  }
                  alt="보험 아이콘"
                  boxSize="45px"
                  mr={4}
                />
                <Box>
                  <Text fontSize="xl" fontWeight="bold" color="pink.600">
                    {insuranceInfo.insuranceName}
                  </Text>
                  등록 기간 : {insuranceInfo.expirationDate} 까지
                  {/* 추가 보험 정보 표시 가능 */}
                </Box>
              </Flex>

              {/* 보장 내용 */}
              <Box>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  mb={2}
                  color="pink.600"
                >
                  보장 내용
                </Text>
                <VStack align="start" spacing={2}>
                  {insuranceInfo.guarantees &&
                  insuranceInfo.guarantees.length > 0 ? (
                    insuranceInfo.guarantees.map((guarantee, index) => (
                      <Box
                        key={index}
                        p={3}
                        bg="pink.50"
                        borderRadius="md"
                        w="100%"
                      >
                        <Text fontWeight="bold">
                          {guarantee.guaranteeType || "N/A"}
                        </Text>
                        <Text>{guarantee.guaranteeContent || "N/A"}</Text>
                        <Text color="gray.500">
                          {guarantee.guaranteeFee
                            ? guarantee.guaranteeFee.toLocaleString()
                            : "N/A"}
                          원
                        </Text>
                      </Box>
                    ))
                  ) : (
                    <Text>보장 내용이 없습니다.</Text>
                  )}
                </VStack>
              </Box>
            </Box>
          ) : (
            // 로딩 중일 때 스피너 표시
            <Flex justify="center" align="center" height="200px">
              <Spinner size="xl" color="pink.500" />
            </Flex>
          )}

          {/* 등록하기 버튼 */}
          <Flex justify="center">
            <Button
              colorScheme="pink"
              onClick={handleRegisterClick}
              size="lg"
              isLoading={isLoading}
              loadingText="인증 처리 중..."
              disabled={isLoading}
              padding="12px 60px"
            >
              등록하기
            </Button>
          </Flex>
        </Container>
      </Container>
      <Footer />
    </Box>
  );
};

export default GiftRegistration;
