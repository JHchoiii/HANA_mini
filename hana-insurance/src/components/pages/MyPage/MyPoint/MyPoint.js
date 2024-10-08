import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Text,
  Flex,
  Button,
  Spinner,
  VStack,
  Skeleton,
  Badge,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";

// 상태별 색상 매핑 정의
const POINT_CHANGE_COLOR_MAP = {
  증가: "green", // 포인트 증가
  감소: "red", // 포인트 감소
};

const MyPoint = () => {
  const [pointHistory, setPointHistory] = useState([]); // 포인트 내역을 담는 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const user = useSelector((state) => state.user.userInfo);

  // 색상 모드에 따른 동적 색상 설정
  const headerBg = useColorModeValue("gray.50", "gray.800");
  const tableHeaderBg = useColorModeValue("white", "gray.900");
  const footerBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("#e2e8f0", "gray.600"); // 테두리 색상
  const headerTextColor = useColorModeValue("teal.600", "teal.300");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/api/user/my-ins/point-details?memberId=${user.id}`
      )
      .then((response) => {
        setPointHistory(response.data); // 받아온 포인트 내역 데이터를 상태에 저장
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("포인트 내역 데이터를 불러오는 데 실패했습니다:", error);
        setError("포인트 내역을 불러오는 데 실패했습니다.");
        setIsLoading(false);
      });
  }, [user.id]);

  return (
    <Box className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      <Container maxW="container.xl" p={4} py={[4, 6]}>
        {/* 상단 네비게이션 */}
        <Flex mb={4} justify="space-between" align="center" direction="row">
          <Button
            onClick={() => window.history.back()}
            colorScheme="teal"
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
              <BreadcrumbLink href="#">포인트 내역</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box />
        </Flex>

        {/* 설명 섹션 */}
        <Box
          textAlign="center"
          mb={4}
          p={6}
          borderRadius="md"
          shadow="sm"
          bg={headerBg}
          className="flex justify-between items-center"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color={headerTextColor}>
              포인트 내역
            </Text>
            <Text fontSize="sm" color="gray.500">
              사용자 포인트 적립 및 사용 내역을 확인할 수 있습니다.
            </Text>
          </VStack>
        </Box>

        {/* 포인트 내역 테이블 */}
        <Box overflowX="auto">
          {isLoading ? (
            // 로딩 시 스켈레톤 표시

            <Table variant="simple">
              <Thead bg={tableHeaderBg}>
                <Tr>
                  <Th>날짜</Th>
                  <Th>설명</Th>
                  <Th>변동 내역</Th>
                </Tr>
              </Thead>
              <Tbody>
                {[...Array(5)].map((_, index) => (
                  <Tr key={index}>
                    <Td>
                      <Skeleton height="20px" width="80%" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="90%" />
                    </Td>
                    <Td>
                      <Skeleton height="20px" width="50%" />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          ) : error ? (
            // 에러 발생 시 메시지 표시
            <Text color="red.500" textAlign="center" mt={4}>
              {error}
            </Text>
          ) : (
            // 데이터 로드 완료 시 테이블 표시
            <Table>
              <Thead bg={tableHeaderBg} className="border-t-2 border-[#54d2c4]">
                <Tr>
                  <Th border="1px" borderColor={borderColor}>
                    날짜
                  </Th>
                  <Th border="1px" borderColor={borderColor}>
                    설명
                  </Th>
                  <Th border="1px" borderColor={borderColor}>
                    변동 내역
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {pointHistory.length === 0 ? (
                  <Tr>
                    <Td colSpan="3" textAlign="center">
                      <Text color="gray.500">포인트 내역이 없습니다.</Text>
                    </Td>
                  </Tr>
                ) : (
                  pointHistory.map((transaction, index) => (
                    <Tr key={index}>
                      <Td border="1px" borderColor={borderColor}>
                        {transaction.transactionDate}
                      </Td>
                      <Td border="1px" borderColor={borderColor}>
                        {transaction.description}
                      </Td>
                      <Td border="1px" borderColor={borderColor}>
                        <Badge
                          colorScheme={
                            transaction.change > 0
                              ? POINT_CHANGE_COLOR_MAP["증가"]
                              : POINT_CHANGE_COLOR_MAP["감소"]
                          }
                          variant="solid"
                        >
                          {transaction.change > 0
                            ? `+${transaction.change}`
                            : transaction.change}
                        </Badge>
                      </Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          )}
        </Box>
      </Container>
      <Footer bg={footerBg} />
    </Box>
  );
};

export default MyPoint;
