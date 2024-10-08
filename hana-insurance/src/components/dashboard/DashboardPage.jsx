// src/pages/DashboardPage.jsx

import React, { useEffect, useState } from "react";
import {
  SimpleGrid,
  Box,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Flex,
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
import {
  FaUsers,
  FaDatabase,
  FaServer,
  FaGift,
  FaFileAlt,
} from "react-icons/fa";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const DashboardPage = () => {
  // 통계 상태
  const [dashboardData, setDashboardData] = useState(null);

  // 로딩 상태
  const [loading, setLoading] = useState(true);

  // 모달 상태
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [fraudResult, setFraudResult] = useState(null);
  const [loadingFraud, setLoadingFraud] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // 통합된 대시보드 데이터 가져오기
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8080/api/admin/dashboard"
      );
      setDashboardData(response.data);
    } catch (error) {
      toast({
        title: "Error fetching dashboard data.",
        description: error.response?.data?.error || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // 사기 탐지 핸들러
  const handleFraudDetection = async (claim) => {
    setSelectedClaim(claim);
    setLoadingFraud(true);
    try {
      const response = await axios.post(
        `http://127.0.0.1:8080/api/admin/calculate-fraud/${claim.claimId}`,
        {} // 필요한 경우 요청 본문 데이터를 여기에 추가
      );
      setFraudResult(response.data);
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
      setLoadingFraud(false);
    }
  };

  // 클레임 승인 핸들러
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
      fetchDashboardData(); // 데이터 새로 고침
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

  // 클레임 거부 핸들러
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
      fetchDashboardData(); // 데이터 새로 고침
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
    <Box p={5} bg="gray.50" minHeight="100vh">
      <Text fontSize="2xl" mb={6}>
        관리자 대시보드
      </Text>
      {loading ? (
        // 스켈레톤 로더
        <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={6}>
          {[...Array(5)].map((_, index) => (
            <StatCard key={index} loading={true} />
          ))}
        </SimpleGrid>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3, lg: 5 }} spacing={6}>
          {/* 사용자 수 */}
          <StatCard
            title="사용자 수"
            stat={dashboardData.totalMembers}
            icon={FaUsers}
            helpText="총 등록된 사용자 수"
          />
          {/* 클레임 수 */}
          <StatCard
            title="클레임 수"
            stat={dashboardData.totalClaims}
            icon={FaFileAlt}
            helpText="총 접수된 클레임 수"
          />
          {/* 사기 클레임 수 */}
          <StatCard
            title="사기 클레임 수"
            stat={dashboardData.totalFraudClaims}
            icon={FaDatabase}
            helpText="사기로 판정된 클레임 수"
            percentage={
              dashboardData.totalClaims > 0
                ? `${(
                    (dashboardData.totalFraudClaims /
                      dashboardData.totalClaims) *
                    100
                  ).toFixed(2)}%`
                : "N/A"
            }
            arrow="increase"
          />
          {/* 선물함 수 */}
          <StatCard
            title="선물함 수"
            stat={dashboardData.totalGiftBoxes}
            icon={FaGift}
            helpText="총 발송된 선물함 수"
          />
          {/* 보험 계약 수 */}
          <StatCard
            title="보험 계약 수"
            stat={dashboardData.totalContracts}
            icon={FaServer}
            helpText="총 보험 계약 수"
          />
        </SimpleGrid>
      )}

      {/* 차트 섹션 */}
      {loading ? (
        <Flex mt={10} justify="center" align="center">
          <Spinner size="xl" />
        </Flex>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={10}>
          {/* 클레임 추이 Line Chart */}
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <Text fontSize="lg" mb={4}>
              클레임 추이
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dashboardData.claimsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="claimCount" stroke="#3182ce" />
              </LineChart>
            </ResponsiveContainer>
          </Box>

          {/* 사기 비율 Pie Chart */}
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <Text fontSize="lg" mb={4}>
              사기 비율
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "정상",
                      value:
                        dashboardData.totalClaims -
                        dashboardData.totalFraudClaims,
                    },
                    { name: "사기", value: dashboardData.totalFraudClaims },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3182ce"
                  label
                >
                  <Cell key="cell-1" fill="#38A169" />
                  <Cell key="cell-2" fill="#E53E3E" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* 클레임 유형별 Bar Chart */}
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <Text fontSize="lg" mb={4}>
              클레임 유형별 분포
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.claimsByType}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="claimType" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          {/* 성별 회원 분포 Pie Chart */}
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <Text fontSize="lg" mb={4}>
              성별 회원 분포
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dashboardData.membersByGender}
                  dataKey="count"
                  nameKey="gender"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3182ce"
                  label
                >
                  {dashboardData.membersByGender.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#38A169" : "#E53E3E"}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* 선물함 상태별 Bar Chart */}
          <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
            <Text fontSize="lg" mb={4}>
              선물함 상태별 분포
            </Text>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dashboardData.giftBoxesByStatus}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="registrationStatus" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </SimpleGrid>
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
                  사기 확률: {(fraudResult.fraud_probability * 100).toFixed(2)}%
                </Text>
                <Text>사기 점수: {fraudResult.fraud_score || "N/A"}</Text>
                <Text>사기 여부: {fraudResult.is_fraud ? "사기" : "정상"}</Text>
                <Text>
                  예상 사기:{" "}
                  {fraudResult.estimated_fraud !== null
                    ? fraudResult.estimated_fraud
                    : "N/A"}
                </Text>
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

// StatCard 컴포넌트
const StatCard = ({
  title,
  stat,
  icon,
  helpText,
  percentage,
  arrow,
  loading,
}) => {
  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
      {loading ? (
        <Skeleton height="100px" />
      ) : (
        <Stat>
          <Flex align="center">
            <Box as={icon} size="24px" mr={4} color="primary.500" />
            <Box>
              <StatLabel>{title}</StatLabel>
              <StatNumber>{stat}</StatNumber>
              {percentage && arrow ? (
                <StatHelpText>
                  <StatArrow type={arrow} />
                  {percentage}
                </StatHelpText>
              ) : (
                <StatHelpText>{helpText}</StatHelpText>
              )}
            </Box>
          </Flex>
        </Stat>
      )}
    </Box>
  );
};

export default DashboardPage;
