// InsuranceRegistration.jsx

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Image,
  Spinner,
  VStack,
  Stack,
  Divider,
  Checkbox,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  border,
} from "@chakra-ui/react";
import { FaHome, FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import Header from "../../../Header2";
import Footer from "../../../footer";
import SignatureCanvas from "react-signature-canvas";

const InsuranceRegistration = () => {
  const { contractId } = useParams(); // URL에서 contractId 가져오기
  const [insuranceInfo, setInsuranceInfo] = useState(null);
  const [startDate, setStartDate] = useState(new Date()); // 보험 시작일 기본값: 오늘
  const [contractDays, setContractDays] = useState(1); // 계약 기간 기본값: 1일
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [canProceed, setCanProceed] = useState(false); // 다음 버튼 활성화 상태

  const headerTextColor = useColorModeValue("pink.600", "pink.300");

  // Modal, Drawer 상태 제어
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const {
    isOpen: isSignatureDrawerOpen,
    onOpen: onSignatureDrawerOpen,
    onClose: onSignatureDrawerClose,
  } = useDisclosure();

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
  });

  // 서명 관련 상태 및 참조
  const [trimmedDataURL, setTrimmedDataURL] = useState(null);
  const sigCanvasRef = useRef(null);

  useEffect(() => {
    // 보험 상품 및 계약 정보 가져오기
    axios
      .get(
        `http://localhost:8080/api/my-gift/insurance-products/contract/${contractId}`
      )
      .then((response) => {
        const data = response.data;

        // 서버에서 받은 contractDays로 종료일 계산
        const contractDays = data.contractDays || 1;
        setContractDays(contractDays);

        setInsuranceInfo({
          ...data,
          startDate: new Date(),
          endDate: calculateEndDate(new Date(), contractDays),
        });
      })
      .catch((error) => {
        console.error("보험 정보를 가져오는 중 오류 발생:", error);
      });
  }, [contractId]);

  const handleAgreeAll = (isChecked) => {
    setAgreeAll(isChecked);
    setAgreements({
      agree1: isChecked,
      agree2: isChecked,
      agree3: isChecked,
      agree4: isChecked,
    });
  };

  const handleIndividualAgree = (name, isChecked) => {
    setAgreements((prev) => ({
      ...prev,
      [name]: isChecked,
    }));
  };

  // const canProceed = Object.values(agreements).every(Boolean) && trimmedDataURL;

  // 종료일 계산 함수
  const calculateEndDate = (startDate, days) => {
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + days);
    return endDate;
  };

  const handleStartDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setStartDate(selectedDate);
    // 종료일을 시작일과 기간에 따라 계산
    setInsuranceInfo((prevInfo) => ({
      ...prevInfo,
      endDate: calculateEndDate(selectedDate, contractDays),
    }));
  };

  const handleContractDaysChange = (e) => {
    const days = Number(e.target.value);
    setContractDays(days);
    // 종료일을 새로 계산
    setInsuranceInfo((prevInfo) => ({
      ...prevInfo,
      endDate: calculateEndDate(startDate, days),
    }));
  };

  useEffect(() => {
    setCanProceed(Object.values(agreements).every(Boolean) && trimmedDataURL);
  }, [agreements, trimmedDataURL]);

  const handleConfirm = () => {
    if (canProceed) {
      const formData = new FormData();
      formData.append("contractId", contractId);
      formData.append("agreements", JSON.stringify(agreements));
      formData.append("signature", trimmedDataURL);

      axios
        .post("http://localhost:8080/api/my-gift/send-email", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("이메일 전송 성공:", response.data);
          navigate(`/InsGift/RegistrationComplete/${contractId}`);
        })
        .catch((error) => {
          console.error("이메일 전송 중 오류 발생:", error);
          alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
        });
    } else {
      alert("모든 동의 및 서명을 완료해주세요.");
    }
  };

  // 서명 캔버스 관련 함수
  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear(); // 서명 캔버스를 초기화
      setTrimmedDataURL(null); // 서명 데이터 초기화
    }
  };
  const saveSignature = () => {
    if (!sigCanvasRef.current.isEmpty()) {
      const canvas = sigCanvasRef.current.getCanvas();
      const dataURL = canvas.toDataURL("image/png");
      setTrimmedDataURL(dataURL);
      onSignatureDrawerClose();
    } else {
      alert("서명을 입력해주세요.");
    }
  };

  return (
    <Box className="MyIns" minH="100vh" display="flex" flexDirection="column">
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
              <BreadcrumbLink href="#">청약 내용 확인</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box />
        </Flex>

        <Container maxW="container.md" flex="1" py={8}>
          <Flex align="center" mb={6}>
            <Text fontSize="2xl" fontWeight="bold" color="pink.600">
              청약 내용 확인
            </Text>
          </Flex>

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
                </Box>
              </Flex>

              <Divider my="4" />
              <Text fontSize="lg" fontWeight="bold" color="pink.600" mb={2}>
                보험 기간을 선택해주세요
              </Text>
              {/* 시작일 설정 */}
              <Box
                mb={4}
                textAlign="center"
                p={3}
                bg="pink.50"
                borderRadius="md"
                w="100%"
              >
                <VStack spacing={4}>
                  <Box>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="pink.600"
                      mb={2}
                    >
                      보험 시작일
                    </Text>
                    <Input
                      type="datetime-local"
                      value={startDate.toISOString().slice(0, 16)}
                      onChange={handleStartDateChange}
                      min={new Date().toISOString().slice(0, 16)} // 오늘 이전 시간 선택 불가
                    />
                  </Box>
                  <Box>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="pink.600"
                      mb={2}
                    >
                      보험 기간 (일)
                    </Text>
                    <strong className="text-lg">{contractDays}일</strong>
                  </Box>
                  <Box>
                    <Text
                      fontSize="lg"
                      fontWeight="bold"
                      color="pink.600"
                      mb={2}
                    >
                      보험 종료일
                    </Text>
                    <Text fontSize="lg">
                      {insuranceInfo.endDate.toISOString().split("T")[0]}
                    </Text>
                  </Box>
                </VStack>
              </Box>

              <Divider my="4" />

              {/* 서명 캔버스 영역 */}
              <Box mt={4}>
                <Text
                  fontSize="lg"
                  fontWeight="semibold"
                  mb="2"
                  color="pink.600"
                >
                  서명
                </Text>
                {/* 서명 초기화 버튼 */}
                <Flex justify="space-between" align="center" mt={2}>
                  <Text fontSize="lg" fontWeight="semibold" mb="2">
                    피보험자명{"  "}
                    <strong className="text-pink-600">
                      {insuranceInfo.insuredPerson}
                    </strong>
                  </Text>
                  <Button
                    onClick={clearSignature}
                    colorScheme="pink"
                    mb={4}
                    leftIcon={<FaSyncAlt />} // 새로고침 아이콘 추가
                    variant="outline"
                  >
                    서명 초기화
                  </Button>
                </Flex>
                <Box
                  w="100%"
                  h="200px"
                  border="2px dashed gray"
                  borderRadius="md"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  cursor="pointer"
                  onClick={onSignatureDrawerOpen}
                >
                  {trimmedDataURL ? (
                    <Image src={trimmedDataURL} alt="서명" maxH="100%" />
                  ) : (
                    <Text color="gray.500">
                      해당 영역을 클릭하여 서명해주세요.
                    </Text>
                  )}
                </Box>
              </Box>

              {/* 서명 Drawer */}
              <Drawer
                isOpen={isSignatureDrawerOpen}
                placement="bottom"
                onClose={onSignatureDrawerClose}
              >
                <DrawerOverlay />
                <DrawerContent
                  style={{
                    width: "45%",
                    margin: "0 auto",
                    borderRadius: "10px",
                  }}
                >
                  <DrawerCloseButton />
                  <DrawerHeader style={{ textAlign: "center" }}>
                    서명 후 확인을 눌러주세요.
                  </DrawerHeader>
                  <DrawerBody>
                    <Flex direction="column" align="center">
                      <SignatureCanvas
                        ref={sigCanvasRef}
                        penColor="black"
                        canvasProps={{
                          width: 400,
                          height: 150,
                          style: { border: "1px solid" }, // 분홍색 경계 추가
                          className: "signatureCanvas bg-transparent",
                        }}
                      />
                      <Flex mt={4} justify="center" gap={2}>
                        <Button onClick={saveSignature} colorScheme="pink">
                          확인
                        </Button>
                        <Button onClick={onSignatureDrawerClose}>취소</Button>
                      </Flex>
                    </Flex>
                  </DrawerBody>
                  {/* <DrawerFooter>
                  <Button variant="outline" onClick={onSignatureDrawerClose}>
                    닫기
                  </Button>
                </DrawerFooter> */}
                </DrawerContent>
              </Drawer>
            </Box>
          ) : (
            <Flex justify="center" align="center" height="200px">
              <Spinner size="xl" color="pink.500" />
            </Flex>
          )}

          {/* 보험약관 확인 및 동의 섹션 */}
          <Box
            textAlign="center"
            mt="4"
            className="flex flex-col justify-center items-center"
          >
            <Button
              variant="outline"
              colorScheme="pink"
              onClick={() => {
                onModalOpen();
                setAgreeAll(true); // 보험약관 확인 시 체크박스 체크
                setAgreements({
                  agree1: true,
                  agree2: true,
                  agree3: true,
                  agree4: true,
                });
              }}
              mb="4"
              size="lg"
            >
              보험약관 확인하기
            </Button>
            <Checkbox
              isChecked={agreeAll}
              onChange={(e) => handleAgreeAll(e.target.checked)}
              colorScheme="pink" // 분홍색 체크박스
            >
              보험약관을 모두 확인하였습니다.
            </Checkbox>
          </Box>

          {/* 다음 버튼 */}
          <Box textAlign="center" mt="4" p="4">
            <Button
              colorScheme="pink"
              onClick={handleConfirm}
              size="lg"
              // w="full"
              isDisabled={!canProceed}
              padding="12px 80px"
            >
              다음
            </Button>
          </Box>

          {/* 보험약관 Modal */}
          <Modal
            isOpen={isModalOpen}
            onClose={onModalClose}
            size="xl"
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>보험약관</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <embed
                  src="/OneDayCarInsPDF.pdf"
                  width="100%"
                  height="500px"
                  type="application/pdf"
                />
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onModalClose}>
                  닫기
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Container>
      </Container>
      <Footer />
    </Box>
  );
};

export default InsuranceRegistration;
