import React from "react";
import {
  Box,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  Thead,
  Th,
  Flex,
  Divider,
  Image,
} from "@chakra-ui/react";

const TempPage = () => {
  return (
    <Box width="100%" p={5} bg="white" fontFamily="Arial" lineHeight="1.5">
      {/* 상단 컬러 라인 */}
      <Flex width="100%" mb={1}>
        <Box height="6px" bg="red.600" width="80%" />
        <Box height="6px" bg="#009CA6" width="20%" />
      </Flex>

      {/* Header Section */}
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={5}
        position="relative"
      >
        <Box>
          <Text fontSize="xs" color="gray.600">
            자동차업무-C02-170301
          </Text>
          <Text fontSize="2xl" fontWeight="bold">
            원데이 자동차보험 보험증권
          </Text>
        </Box>
        <Image src="/img_logo.png" alt="logo" mt={2} width="200px" />
        {/* Red box with text and logo */}
        <Box position="absolute" top="0" right="0" textAlign="right">
          {/* <Box border="1px solid red" p={2} bg="white">
            <Text fontSize="xs" color="red.500">
              이 보험은
            </Text>
            <Text fontSize="xs" color="red.500">
              『자동차손해배상보장법』에서
            </Text>
            <Text fontSize="xs" color="red.500">
              정한 의무보험
            </Text>
            <Text fontSize="xs" color="red.500">
              이 아닙니다.
            </Text>
          </Box> */}
        </Box>
      </Flex>

      {/* Custom Divider */}
      <Divider borderColor="gray.700" borderWidth="1px" mb={2} />

      {/* 계약 정보 */}
      <Table variant="simple" size="sm" mb={5} border="1px solid #e2e8f0">
        <Tbody>
          <Tr>
            <Td>계약번호</Td>
            <Td>74800241081565000</Td>
            <Td>계약일자</Td>
            <Td>2024.09.28</Td>
          </Tr>
          <Tr>
            <Td>피보험자</Td>
            <Td>김*연</Td>
            <Td>보험계약자</Td>
            <Td>최*우</Td>
          </Tr>
          <Tr>
            <Td>보험기간</Td>
            <Td colSpan={3}>2024.09.28 21:20 ~ 2024.09.29 21:20</Td>
          </Tr>
          <Tr>
            <Td>납입방법</Td>
            <Td>일시납</Td>
            <Td>보험종목</Td>
            <Td>원데이자동차보험 (차량손해보장형)</Td>
          </Tr>
          <Tr>
            <Td>피보험자동차</Td>
            <Td>15루1355</Td>
            <Td>적용보험료</Td>
            <Td>1,340 원</Td>
          </Tr>
        </Tbody>
      </Table>

      {/* 보험가입사항 */}
      <Box mb={5}>
        <Text fontWeight="bold" fontSize="md">
          ▣ 보험가입사항
        </Text>
        <Table variant="simple" size="sm" mt={3} border="1px solid #e2e8f0">
          <Thead>
            <Tr>
              <Th>담보 및 특약</Th>
              <Th>보험가입금액</Th>
              <Th>가입여부</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>타인차량복구(원데이)</Td>
              <Td>1사고당 최고 3천만원한도 (자기부담금 50만원)</Td>
              <Td>가입</Td>
            </Tr>
          </Tbody>
        </Table>
        <Text fontSize="xs" mt={2} color="gray.600">
          * 타인차량 복구비용에서 보상하는 사고는 타차량과의 충돌 또는 접촉으로
          인한 손해에 한함
        </Text>
      </Box>

      {/* 특별약관 */}
      <Box mb={5}>
        <Text fontWeight="bold" fontSize="md">
          ▣ 특별약관
        </Text>
        <Divider mt={2} />
      </Box>

      {/* 예금자보호안내 */}
      <Box mb={5}>
        <Text fontWeight="bold" fontSize="md">
          ▣ 예금자보호안내
        </Text>
        <Text fontSize="xs" mt={3} color="gray.600">
          ※ 이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기시 보험금)에
          기타지급금을 합한 금액이 1인당 “5천만원까지”(본 보험회사의 여타
          보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사 보호상품의
          사고보험금을 합산한 금액이 1인당 “5천만원까지” 보호됩니다.
        </Text>
      </Box>

      {/* 기타사항 */}
      <Box mb={5}>
        <Text fontWeight="bold" fontSize="md">
          ▣ 기타사항
        </Text>
        <Text fontSize="xs" mt={3} color="gray.600">
          저희 회사는 보험 계약을 정상적으로 체결하고 그 증거로
          보험가입증서(보험증권)를 하나손해보험(주)에서 발행합니다. 2024.09.28
        </Text>
      </Box>

      {/* Footer */}
      <Box textAlign="center" mt={5}>
        <Text fontSize="xs">2024년 9월 28일 21:24:38</Text>
      </Box>

      <Box textAlign="right" mt={10}>
        <Text fontSize="sm">대표이사 배성완</Text>
        <Text fontSize="sm">하나손해보험(주)</Text>
      </Box>
    </Box>
  );
};

export default TempPage;
