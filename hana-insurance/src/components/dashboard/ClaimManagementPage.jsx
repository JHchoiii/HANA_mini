// src/pages/ClaimManagementPage.jsx

import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  useToast,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ClaimManagementPage = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [fraudResult, setFraudResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingClaims, setLoadingClaims] = useState(true); // 스켈레톤 로더 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [claimsPerPage] = useState(15); // 페이지 당 클레임 수
  const [sortConfig, setSortConfig] = useState({
    key: "claimId",
    direction: "desc",
  }); // 정렬 상태
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    setLoadingClaims(true); // 로딩 시작
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/api/admin/claims"
      );
      // 클레임 데이터를 최신 클레임 ID 순으로 내림차순 정렬
      const sortedClaims = response.data.sort((a, b) =>
        b.claimId.localeCompare(a.claimId)
      );
      setClaims(sortedClaims);
    } catch (error) {
      toast({
        title: "Error fetching claims.",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingClaims(false); // 로딩 종료
    }
  };

  // 현재 페이지에 맞는 클레임 데이터 추출
  const indexOfLastClaim = currentPage * claimsPerPage;
  const indexOfFirstClaim = indexOfLastClaim - claimsPerPage;
  const currentClaims = claims.slice(indexOfFirstClaim, indexOfLastClaim);

  // 페이지 변경
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(claims.length / claimsPerPage);

  // 정렬 함수
  const sortedClaims = [...currentClaims].sort((a, b) => {
    if (sortConfig.key) {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (sortConfig.direction === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    }
    return 0;
  });

  // 테이블 헤더 클릭 시 정렬 방향 변경
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFraudDetection = async (claim) => {
    setSelectedClaim(claim);
    setLoading(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/api/${claim.claimId}/detect-fraud`,
        {}
      );
      setFraudResult(response.data);
      console.log(response.data);
      onOpen();
    } catch (error) {
      toast({
        title: "Error calculating fraud.",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (claimId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8080/api/admin/claims/${claimId}/approve`
      );
      toast({
        title: "Claim approved.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      fetchClaims();
    } catch (error) {
      toast({
        title: "Error approving claim.",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleReject = async (claimId) => {
    try {
      await axios.post(
        `http://127.0.0.1:8080/api/admin/claims/${claimId}/reject`
      );
      toast({
        title: "Claim rejected.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      fetchClaims();
    } catch (error) {
      toast({
        title: "Error rejecting claim.",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4}>
        클레임 관리 대시보드
      </Text>
      {loadingClaims ? (
        // 스켈레톤 로더
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>클레임 ID</Th>
              <Th>회원 ID</Th>
              <Th>계약 ID</Th>
              <Th>청구 유형</Th>
              <Th>상태</Th>
              <Th>예상 사기</Th>
              <Th>액션</Th>
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(claimsPerPage)].map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Skeleton height="20px" />
                </Td>
                <Td>
                  <Flex>
                    <Skeleton height="30px" width="80px" mr={2} />
                    <Skeleton height="30px" width="80px" mr={2} />
                    <Skeleton height="30px" width="80px" />
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th onClick={() => requestSort("claimId")}>클레임 ID</Th>
                <Th onClick={() => requestSort("memberId")}>회원 ID</Th>
                <Th onClick={() => requestSort("contractId")}>계약 ID</Th>
                <Th onClick={() => requestSort("claimType")}>청구 유형</Th>
                <Th onClick={() => requestSort("status")}>상태</Th>
                <Th>예상 사기</Th>
                <Th>액션</Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedClaims.map((claim) => (
                <Tr key={claim.claimId}>
                  <Td>{claim.claimId}</Td>
                  <Td>{claim.memberId}</Td>
                  <Td>{claim.contractId}</Td>
                  <Td>{claim.claimType}</Td>
                  <Td>{claim.status}</Td>
                  <Td>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      mr={2}
                      onClick={() => handleFraudDetection(claim)}
                      isLoading={
                        loading && selectedClaim?.claimId === claim.claimId
                      }
                    >
                      이상탐지
                    </Button>
                  </Td>
                  <Td>
                    <Button
                      colorScheme="green"
                      size="sm"
                      mr={2}
                      onClick={() => handleApprove(claim.claimId)}
                      isDisabled={claim.status === "승인"}
                    >
                      승인
                    </Button>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleReject(claim.claimId)}
                      isDisabled={claim.status === "거부"}
                    >
                      거부
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          {/* 페이지네이션 */}
          <Flex mt={4} justify="center" align="center">
            <IconButton
              icon={<ChevronLeftIcon />}
              isDisabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
              aria-label="Previous Page"
              mr={2}
            />
            <Text mx={2} align="center">
              {currentPage} / {totalPages}
            </Text>
            <IconButton
              icon={<ChevronRightIcon />}
              isDisabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
              aria-label="Next Page"
              ml={2}
            />
          </Flex>
        </>
      )}

      {/* 사기 탐지 결과 모달 */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>사기 탐지 결과</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {fraudResult ? (
              <Box>
                <Text>
                  <strong>사기 확률:</strong>{" "}
                  {fraudResult.fraudProbability
                    ? (fraudResult.fraudProbability * 100).toFixed(2)
                    : "N/A"}
                  %
                </Text>
                <Text>
                  <strong>사기 여부:</strong>{" "}
                  {fraudResult.isFraud !== undefined
                    ? fraudResult.isFraud === 1
                      ? "사기"
                      : "정상"
                    : "N/A"}
                </Text>
                <Text>
                  <strong>청구 지연 일수:</strong>{" "}
                  {fraudResult.claimDelayDays !== undefined
                    ? fraudResult.claimDelayDays
                    : "N/A"}
                </Text>
                {/* 추가 지표 */}
                <Box mt={4}>
                  <Text fontSize="lg" mb={2}>
                    추가 지표
                  </Text>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        {
                          name: "계약 청구 수 비율",
                          value: fraudResult.claimsRatio || 0,
                        },
                        {
                          name: "회원 사기 횟수 비율",
                          value: fraudResult.fraudCountRatio || 0,
                        },
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#3182ce" />
                    </BarChart>
                  </ResponsiveContainer>
                  <Text mt={2}>
                    <strong>계약 청구 수 비율:</strong>{" "}
                    {fraudResult.claimsRatio !== undefined
                      ? fraudResult.claimsRatio.toFixed(2)
                      : "N/A"}{" "}
                    (평균 대비)
                  </Text>
                  <Text>
                    <strong>회원 사기 횟수 비율:</strong>{" "}
                    {fraudResult.fraudCountRatio !== undefined
                      ? fraudResult.fraudCountRatio.toFixed(2)
                      : "N/A"}{" "}
                    (평균 대비)
                  </Text>
                </Box>
              </Box>
            ) : (
              <Spinner />
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClaimManagementPage;
