import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Container,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  StackDivider,
  Badge,
  Skeleton,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  Image,
  IconButton,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaSortUp,
  FaSortDown,
  FaArrowLeft,
  FaHome,
  FaDownload,
} from "react-icons/fa";
import Header2 from "../../../Header2";
import Footer from "../../../footer";

// 상태별 색상 매핑 정의
const STATUS_COLOR_MAP = {
  등록: "green", // 등록
  만기: "pink", // 만기
  미등록: "gray", // 미등록 (해당 시 사용)
};

const CUSTOM_TAB_COLOR = "#00d0b45e"; // 원하는 탭 색상

// 테이블 컴포넌트 분리
const InsuranceTable = ({
  data,
  handleSort,
  sortField,
  sortOrder,
  handleDetailClick,
  selectedStatus,
  setSelectedStatus,
  isLoading, // 로딩 상태
}) => {
  const headerBg = useColorModeValue("gray.100", "gray.700");
  const selectColor = useColorModeValue("gray.700", "gray.200");
  const borderColor = useColorModeValue("#e2e8f0", "gray.600"); // 테두리 색상

  return (
    <Box>
      {/* 헤더 및 필터 섹션 */}
      <Flex
        mb={4}
        justify="space-between"
        align="center"
        direction={["column", "row"]}
      >
        <Text fontSize="2xl" fontWeight="bold" mb={[2, 0]}>
          보험계약 목록
          <Flex
            mb={2}
            color="red.500"
            fontSize="sm"
            fontWeight="medium"
            align="center"
          >
            ※ 보험기간이 종료된 건은 선택박스를 [전체]로 조회해주세요
          </Flex>
        </Text>
        <Select
          width={["100%", "200px"]}
          maxW="200px"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          // placeholder="전체"
          color={selectColor}
        >
          {/* 상태 값이 실제 데이터와 일치하도록 설정 */}
          <option value="등록">등록</option>
          <option value="만기">만기</option>
          <option value="미등록">미등록</option>
          <option value="전체">전체</option>
        </Select>
      </Flex>

      {/* 보험 계약 테이블 또는 스켈레톤 */}
      {isLoading ? (
        <Table>
          <Thead bg={headerBg}>
            <Tr>
              {[...Array(6)].map((_, i) => (
                <Th key={i}>
                  <Skeleton height="20px" />
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {[...Array(5)].map((_, i) => (
              <Tr key={i}>
                {[...Array(6)].map((__, j) => (
                  <Td key={j}>
                    <Skeleton height="20px" />
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <Table>
          <Thead className="border-t-2 border-[#54d2c4] ">
            <Tr>
              {/* 테이블 헤더 */}
              {[
                { label: "보험상품명", field: "productName" },
                { label: "계약번호", field: "contractId" },
                { label: "피보험자", field: "insuredPerson" },
                { label: "보험기간", field: "insurancePeriod" },
                { label: "상태", field: "status" },
                { label: "보기", field: null },
              ].map((header, index) => (
                <Th
                  key={index}
                  border="1px"
                  borderColor={borderColor}
                  cursor={header.field ? "pointer" : "default"}
                  onClick={() =>
                    header.field ? handleSort(header.field) : null
                  }
                  textAlign="center" // 가운데 정렬
                  fontSize="l" // 글자 크기
                  p="20px" // 패딩
                >
                  <Flex justify="center" align="center">
                    {header.label}
                    {header.field && sortField === header.field && (
                      <Icon
                        as={sortOrder === "asc" ? FaSortUp : FaSortDown}
                        ml={2}
                      />
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data.length === 0 ? (
              <Tr>
                <Td colSpan="6" textAlign="center">
                  <Text color="gray.500">
                    해당 조건에 맞는 보험 계약이 없습니다.
                  </Text>
                </Td>
              </Tr>
            ) : (
              data
                .filter((item) =>
                  selectedStatus === "전체"
                    ? true
                    : item.status === selectedStatus
                )
                .map((item, index) => (
                  <Tr
                    key={item.contractId}
                    _hover={{ bg: "teal.100" }}
                    bg={index % 2 === 0 ? "#ddfcf273" : "white"}
                  >
                    <Td border="1px" borderColor={borderColor}>
                      {item.productName}
                    </Td>
                    <Td border="1px" borderColor={borderColor}>
                      {item.contractId}
                    </Td>
                    <Td border="1px" borderColor={borderColor}>
                      {item.insuredPerson}
                    </Td>
                    <Td border="1px" borderColor={borderColor}>
                      {item.insurancePeriod}
                    </Td>
                    <Td
                      border="1px"
                      borderColor={borderColor}
                      textAlign="center"
                    >
                      <Badge
                        colorScheme={STATUS_COLOR_MAP[item.status] || "gray"}
                        variant="subtle"
                      >
                        {item.status}
                      </Badge>
                    </Td>
                    <Td
                      border="1px"
                      borderColor={borderColor}
                      textAlign="center" // 셀 가운데 정렬
                    >
                      <Button
                        size="sm"
                        variant="solid" // 'solid'로 변경
                        bg="#008080" // 유사한 색상
                        color="white" // 텍스트 색상 흰색
                        _hover={{ bg: "#006666" }} // 호버 시 어두운 색상
                        onClick={() => handleDetailClick(item.contractId)}
                      >
                        상세보기
                      </Button>
                    </Td>
                  </Tr>
                ))
            )}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

const MyInsDetail = () => {
  const [insuranceData, setInsuranceData] = useState([]); // 보험 데이터 상태
  const [selectedStatus, setSelectedStatus] = useState("전체");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false); // 상세보기 로딩 상태
  const user = useSelector((state) => state.user.userInfo);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const bgColor = useColorModeValue("gray.50", "gray.800");
  const headerTextColor = useColorModeValue("teal.600", "teal.300");
  const footerBg = useColorModeValue("gray.100", "gray.700");
  const containerBg = useColorModeValue("white", "gray.900");
  const dividerBorderColor = useColorModeValue("gray.200", "gray.600"); // Divider 색상

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:8080/api/user/my-ins/my-insurances?memberId=${user.id}`
      )
      .then((response) => {
        setInsuranceData(response.data); // 받아온 데이터를 상태에 저장
        setIsLoading(false);
      })
      .catch((error) => {
        setError("보험 데이터를 불러오는 데 실패했습니다.");
        setIsLoading(false);
      });
  }, [user.id]);

  const handleDetailClick = (insuranceId) => {
    onOpen(); // 모달 열기
    setIsDetailLoading(true); // 로딩 시작
    // 상세 데이터를 로드하는 로직이 있다면 여기에 추가
    // 여기서는 간단히 setTimeout을 사용하여 로딩 시뮬레이션
    setTimeout(() => {
      const selected = insuranceData.find(
        (item) => item.contractId === insuranceId
      );
      setSelectedInsurance(selected);
      setIsDetailLoading(false); // 로딩 완료
    }, 500); // 0.5초 후 로딩 완료
  };

  const getStartDate = (insurancePeriod) => {
    const [start] = insurancePeriod.split(" ~ ");
    return new Date(start);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return insuranceData;

    return [...insuranceData].sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === "insurancePeriod") {
        aValue = getStartDate(aValue);
        bValue = getStartDate(bValue);
      } else if (
        sortField === "currentPremium" ||
        sortField === "totalPremium"
      ) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = aValue.toString().toLowerCase();
        bValue = bValue.toString().toLowerCase();
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [insuranceData, sortField, sortOrder]);

  const filterByInsuranceType = (type) => {
    if (type === "전체") {
      return sortedData;
    }
    return sortedData.filter((item) => item.insuranceType === type);
  };

  return (
    <Box className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      <Container maxW="container.xl" p={4} py={[4, 6]}>
        <Flex
          mb={4}
          justify="space-between"
          align="center"
          direction={["column", "row"]}
        >
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
                  <Icon as={FaHome} mr={2} />홈
                </Flex>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">마이 보험</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">보험계약현황</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box />
        </Flex>

        {/* 설명 섹션 */}
        <Container
          maxW="container.xl"
          p={4}
          py={[4, 6]}
          mb="30px"
          bg={containerBg}
          boxShadow="md"
          borderRadius="md"
        >
          <VStack align="start" spacing={1} mb={6}>
            <Text
              fontSize="3xl"
              color={useColorModeValue("gray.600", "gray.400")}
              ml="15px"
              className="font-semibold"
            >
              보험계약 확인
            </Text>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
              ml="15px"
            >
              가입하신 보험계약의 상세내용을 확인하실 수 있습니다.
            </Text>
          </VStack>
        </Container>
        <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
          <TabList mb="1em" className="bg-slate-50 rounded-3xl">
            <Tab _selected={{ bg: CUSTOM_TAB_COLOR }}>전체보험</Tab>
            <Tab _selected={{ bg: CUSTOM_TAB_COLOR }}>미니보험</Tab>
            <Tab _selected={{ bg: CUSTOM_TAB_COLOR }}>장기보험</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <InsuranceTable
                data={filterByInsuranceType("전체")}
                handleSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
                handleDetailClick={handleDetailClick}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                isLoading={isLoading}
              />
            </TabPanel>

            <TabPanel>
              <InsuranceTable
                data={filterByInsuranceType("미니")}
                handleSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
                handleDetailClick={handleDetailClick}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                isLoading={isLoading}
              />
            </TabPanel>

            <TabPanel>
              <InsuranceTable
                data={filterByInsuranceType("장기")}
                handleSort={handleSort}
                sortField={sortField}
                sortOrder={sortOrder}
                handleDetailClick={handleDetailClick}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
                isLoading={isLoading}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Footer bg={footerBg} />
      {/* 상세보기 모달 */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>상세 정보</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isDetailLoading ? (
              // 로딩 시 스켈레톤 표시
              <Flex justify="center" align="center" minH="100px">
                <Spinner size="lg" color="teal.500" />
              </Flex>
            ) : selectedInsurance ? (
              // 상세 정보 표시 (테이블 형태)
              <div className="border-[1px] border-gray-500 rounded-md">
                <Table
                  variant="simple"
                  width="100%"
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Tbody>
                    <Tr bg="gray.200">
                      <Th
                        width="150px"
                        border="1px"
                        borderColor="gray.300"
                        textAlign="left"
                        p={4}
                      >
                        보험상품명
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedInsurance.productName}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        bg="gray.200"
                        textAlign="left"
                        p={4}
                      >
                        계약번호
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4}>
                        {selectedInsurance.contractId}
                      </Td>
                    </Tr>
                    <Tr bg="gray.200">
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        textAlign="left"
                        p={4}
                      >
                        피보험자
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedInsurance.insuredPerson}
                      </Td>
                    </Tr>
                    <Tr>
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        bg="gray.200"
                        textAlign="left"
                        p={4}
                      >
                        보험기간
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4}>
                        {selectedInsurance.insurancePeriod}
                      </Td>
                    </Tr>
                    <Tr bg="gray.200">
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        textAlign="left"
                        p={4}
                      >
                        상태
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        <Badge
                          colorScheme={
                            selectedInsurance.status === "등록"
                              ? "green"
                              : selectedInsurance.status === "만기"
                              ? "red"
                              : "gray"
                          }
                        >
                          {selectedInsurance.status}
                        </Badge>
                      </Td>
                    </Tr>
                    <Tr>
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        bg="gray.200"
                        textAlign="left"
                        p={4}
                      >
                        현재 보험료
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4}>
                        {selectedInsurance.currentPremium.toLocaleString()} 원
                      </Td>
                    </Tr>
                    <Tr bg="gray.200">
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        textAlign="left"
                        p={4}
                      >
                        총 보험료
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedInsurance.totalPremium.toLocaleString()} 원
                      </Td>
                    </Tr>

                    <Tr bg="gray.200">
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        textAlign="left"
                        p={4}
                      >
                        보험 유형
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        <Badge colorScheme="purple">
                          {selectedInsurance.insuranceType}
                        </Badge>
                      </Td>
                    </Tr>
                    {/* 추가 상세 정보: 차량번호 */}
                    <Tr>
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        bg="gray.200"
                        textAlign="left"
                        p={4}
                      >
                        차량번호
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4}>
                        {selectedInsurance.additionalInformation
                          ?.vehicleNumber || "N/A"}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            ) : (
              // 선택된 보험 정보가 없을 때
              <Flex justify="center" align="center" minH="100px">
                <Spinner size="lg" color="teal.500" />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyInsDetail;
