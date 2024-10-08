import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Input,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Container,
  Flex,
  Text,
  IconButton,
  Tooltip,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Image,
} from "@chakra-ui/react";
import {
  FaUpload,
  FaQuestionCircle,
  FaArrowLeft,
  FaHome,
} from "react-icons/fa";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useSelector } from "react-redux";

const Claim1 = () => {
  const [insuranceData, setInsuranceData] = useState([]);
  const [selectedInsurance, setSelectedInsurance] = useState(null);
  const [accidentDate, setAccidentDate] = useState("");
  const [description, setDescription] = useState("");
  const [documents, setDocuments] = useState(null);
  const [documentIssuer, setDocumentIssuer] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isHelpOpen,
    onOpen: onHelpOpen,
    onClose: onHelpClose,
  } = useDisclosure();
  const user = useSelector((state) => state.user.userInfo);
  const toast = useToast();

  const headerTextColor = useColorModeValue("teal.600", "teal.300");

  useEffect(() => {
    if (user && user.id) {
      // 보험 데이터 가져오기
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/my-insurances?memberId=${user.id}`
        )
        .then((response) => {
          console.log("보험 데이터:", response.data); // 데이터 로깅
          setInsuranceData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching insurance data:", error);
          toast({
            title: "보험 데이터 불러오기 실패",
            description: "보험 데이터를 불러오는 데 실패했습니다.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [user, toast]);

  const handleDateChange = (event) => {
    setAccidentDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setDocuments(event.target.files);
  };

  const handleInsuranceSelect = (insurance) => {
    setSelectedInsurance(insurance);
    onClose();
  };

  const handleDocumentIssuerChange = (event) => {
    setDocumentIssuer(event.target.value);
  };

  const handleSubmit = () => {
    if (
      !selectedInsurance ||
      !accidentDate ||
      !description ||
      !documents ||
      !documentIssuer
    ) {
      toast({
        title: "청구 제출 실패",
        description: "모든 필드를 채워주세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const formData = new FormData();

    // ClaimCreateDTO에 해당하는 데이터는 "claim"이라는 이름으로 추가해야 함
    const claimData = {
      selectedInsurance: selectedInsurance.contractId,
      accidentDate,
      description,
      documentIssuer,
      memberId: user.id,
    };

    formData.append(
      "claim",
      new Blob([JSON.stringify(claimData)], { type: "application/json" })
    );

    // 파일들을 FormData에 추가 (파일이 여러 개일 수 있으므로 루프 사용)
    if (documents) {
      for (let i = 0; i < documents.length; i++) {
        formData.append("files", documents[i]); // "files"는 백엔드에서 기대하는 필드 이름과 일치
      }
    }

    // Axios를 사용해 서버에 전송
    axios
      .post("http://localhost:8080/api/user/my-ins/claim", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast({
          title: "청구 제출 완료",
          description: "청구가 성공적으로 제출되었습니다.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // 폼 초기화
        setSelectedInsurance(null);
        setAccidentDate("");
        setDescription("");
        setDocuments(null);
        setDocumentIssuer("");
      })
      .catch((error) => {
        console.error("Error submitting claim:", error);
        toast({
          title: "청구 제출 실패",
          description: "청구 제출에 실패했습니다. 다시 시도해주세요.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Box className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      <Container maxW="container.xl" p={6}>
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
              <BreadcrumbLink href="#">청구하기</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box />
        </Flex>
        <Box
          p={6}
          rounded="md"
          width="100%"
          maxW="1000px"
          mx="auto"
          bg="gray.50"
          boxShadow="md"
        >
          {/* 정보 제공 섹션 중앙 정렬 */}
          <Flex justifyContent="center" mb={6}>
            <Box
              p={4}
              bg="teal.50"
              borderRadius="30px"
              textAlign="center"
              boxShadow="md"
              width={{ base: "100%", md: "500px" }}
              height="250px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <strong className="text-[35px] p-2">청구하기</strong>
                <Image
                  src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/charge/icon_info_charge.svg"
                  alt="서류 아이콘"
                  width="50px"
                />
                <Text fontSize="lg" fontWeight="bold" ml={3} mt={4}>
                  교통/상해/건강(질병) <br />
                  보상 보험금 청구를 위한 필요서류를
                  <Tooltip label="필요 서류 목록을 확인하세요">
                    <IconButton
                      aria-label="도움말"
                      icon={<FaQuestionCircle />}
                      variant="link"
                      color="teal.500"
                      onClick={onHelpOpen}
                      ml={2}
                    />
                  </Tooltip>
                  <br />
                  확인하셨습니까?
                </Text>
              </Flex>
            </Box>
          </Flex>
          <Box p={6} rounded="md" width="100%" maxW="700px" mx="auto">
            {/* 보험 선택 섹션 */}
            <Box className="mb-4">
              <Text fontWeight="semibold" mb="2">
                보험 선택
              </Text>
              <Button onClick={onOpen} colorScheme="teal" mb="4">
                보험 선택하기
              </Button>
              {selectedInsurance && (
                <Box mt={2} p={2} bg="gray.100" rounded="md">
                  선택된 보험: {selectedInsurance.productName}
                </Box>
              )}
            </Box>

            {/* 사고 날짜 입력 */}
            <Box className="mb-4">
              <Text fontWeight="semibold" mb="2">
                사고 날짜
              </Text>
              <Input
                type="datetime-local"
                value={accidentDate}
                onChange={handleDateChange}
                required
              />
            </Box>

            {/* 사고 내용 입력 */}
            <Box className="mb-4">
              <Text fontWeight="semibold" mb="2">
                사고 내용
              </Text>
              <Textarea
                placeholder="사고 내용을 입력하세요"
                value={description}
                onChange={handleDescriptionChange}
                required
                size="lg" // 크기 조정
                height="150px" // 높이 조정
              />
            </Box>

            {/* 필수 서류 업로드 */}
            <Box className="mb-4">
              <Text fontWeight="semibold" mb="2">
                필수 서류 업로드
              </Text>
              <Input
                type="file"
                onChange={handleFileChange}
                multiple
                required
              />
            </Box>

            {/* 서류 발급처 입력 */}
            <Box className="mb-4">
              <Text fontWeight="semibold" mb="2">
                서류 발급처
              </Text>
              <Input
                placeholder="서류를 발급받은 곳 이름"
                value={documentIssuer}
                onChange={handleDocumentIssuerChange}
                required
              />
            </Box>

            {/* 청구 제출 버튼 */}
            <Button
              colorScheme="teal"
              size="md"
              leftIcon={<FaUpload />}
              onClick={handleSubmit}
              width="100%"
            >
              청구 제출
            </Button>
          </Box>
        </Box>
      </Container>

      {/* 필요 서류 목록 모달 */}
      <Modal isOpen={isHelpOpen} onClose={onHelpClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>필요 서류 목록</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>1. 사고 증빙서류</Text>
            <Text>2. 의료비 영수증</Text>
            <Text>3. 경찰 보고서 (필요시)</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onHelpClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 보험 선택 모달 without Tabs */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent maxHeight="80vh">
          {" "}
          {/* 모달 높이 고정 */}
          <ModalHeader>보험 선택</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            {" "}
            {/* 내부 스크롤 활성화 */}
            {/* 보험 목록 */}
            <Flex direction="column" gap={4}>
              {insuranceData.map((insurance, index) => (
                <Flex
                  key={index}
                  align="center"
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                  boxShadow="sm"
                  justify="space-between"
                  cursor={
                    insurance.status === "미등록" ? "not-allowed" : "pointer"
                  }
                  opacity={insurance.status === "미등록" ? 0.6 : 1}
                  onClick={() => {
                    if (insurance.status !== "미등록") {
                      handleInsuranceSelect(insurance);
                    }
                  }}
                >
                  <Flex align="center" gap={4}>
                    <Image
                      src={
                        insurance.imageUrl ||
                        "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/coupon_img_cyber.svg"
                      }
                      alt={insurance.productName}
                      boxSize="50px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                    <Box>
                      <Text fontWeight="bold">{insurance.productName}</Text>
                      <Text color="gray.500">
                        {insurance.insurancePeriod} / {insurance.status}
                      </Text>
                    </Box>
                  </Flex>
                  {insurance.status !== "미등록" && (
                    <Button
                      colorScheme="teal"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); // 버튼 클릭 시 부모 클릭 이벤트 방지
                        handleInsuranceSelect(insurance);
                      }}
                    >
                      선택
                    </Button>
                  )}
                </Flex>
              ))}
              {insuranceData.length === 0 && (
                <Text color="gray.500">선택할 보험이 없습니다.</Text>
              )}
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default Claim1;
