import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Text,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Container,
  Heading,
  Divider,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Input,
  FormControl,
  FormLabel,
  useToast, // 추가
} from "@chakra-ui/react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaHome, FaEdit } from "react-icons/fa"; // FaEdit 추가

// RecommendationSection 컴포넌트 수정: handleDetailClick, handleSubscribeClick를 props로 받음
const RecommendationSection = ({
  title,
  recommendationType,
  recommendations,
  handleDetailClick, // 추가
  handleSubscribeClick, // 추가
}) => {
  const boxBg = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <Heading size="md" mb={4} color="teal.400">
        {title}
      </Heading>
      {recommendations
        .filter(
          (insurance) => insurance.recommendationType === recommendationType
        )
        .map((insurance, index) => (
          <Box
            key={index}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            boxShadow="md"
            bg={boxBg}
            mb={4}
            transition="all 0.2s"
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontWeight="bold" color="teal.600">
                  {insurance.productName}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  {insurance.description}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  보험 타입: {insurance.type}
                </Text>
                <Text fontSize="sm" color={textColor}>
                  추천 유형: {insurance.recommendationType}
                </Text>
              </Box>
              <Box>
                <Button
                  size="sm"
                  colorScheme="teal"
                  mr={2}
                  onClick={() => handleDetailClick(insurance)}
                  _hover={{
                    backgroundColor: "teal.500",
                  }}
                >
                  상세보기
                </Button>
                <Button
                  size="sm"
                  colorScheme="green"
                  ml={2} // 간격 추가
                  onClick={() => handleSubscribeClick(insurance)}
                  _hover={{
                    backgroundColor: "green.500",
                  }}
                >
                  바로가입
                </Button>
              </Box>
            </Flex>
          </Box>
        ))}
      <Divider my={6} />
    </>
  );
};

const MyInsRecList = () => {
  const [recommendations, setRecommendations] = useState([]); // 추천 리스트 상태
  const [selectedRecommendation, setSelectedRecommendation] = useState(null); // 선택한 추천 리스트
  const [editingRecommendation, setEditingRecommendation] = useState(null); // 수정 중인 추천
  const [newRecommendationName, setNewRecommendationName] = useState(""); // 새로운 추천 이름
  const { isOpen, onOpen, onClose } = useDisclosure(); // 상세보기 모달 제어
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure(); // 수정 모달 제어
  const user = useSelector((state) => state.user.userInfo);

  const headerTextColor = useColorModeValue("teal.600", "teal.300");

  const toast = useToast(); // 추가

  // 백엔드에서 추천 데이터를 받아오는 함수
  useEffect(() => {
    if (user && user.id) {
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/insRecList?memberId=${user.id}`
        )
        .then((response) => {
          setRecommendations(response.data); // 받아온 추천 데이터를 상태에 저장
        })
        .catch((error) => {
          console.error("Error fetching recommendation data:", error);
          toast({
            title: "데이터 가져오기 실패",
            description: "추천 데이터를 불러오는 데 실패했습니다.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [user, toast]);

  // 상세보기 클릭 시 해당 추천 정보를 설정하고 모달 열기
  const handleDetailClick = (recommendation) => {
    setSelectedRecommendation(recommendation);
    onOpen();
  };

  // 수정 버튼 클릭 시 추천 정보를 설정하고 수정 모달 열기
  const handleEditClick = (recommendation) => {
    setEditingRecommendation(recommendation);
    setNewRecommendationName(recommendation.recommendationName);
    onEditOpen();
  };

  // 추천 이름 수정 제출
  const handleUpdateRecommendationName = () => {
    if (!newRecommendationName.trim()) {
      toast({
        title: "수정 실패",
        description: "추천 이름을 입력해주세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    axios
      .put("http://localhost:8080/api/user/my-ins/update-recommendation-name", {
        recommendationGroupId: editingRecommendation.recommendationGroupId, // 변경
        newRecommendationName: newRecommendationName,
      })
      .then((response) => {
        toast({
          title: "추천 이름 수정 완료",
          description: "추천 이름이 성공적으로 수정되었습니다.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // 추천 리스트 업데이트
        setRecommendations((prevRecommendations) =>
          prevRecommendations.map((rec) =>
            rec.recommendationGroupId ===
            editingRecommendation.recommendationGroupId
              ? { ...rec, recommendationName: newRecommendationName }
              : rec
          )
        );
        onEditClose();
      })
      .catch((error) => {
        console.error("Error updating recommendation name:", error);
        toast({
          title: "수정 실패",
          description: "추천 이름 수정에 실패했습니다. 다시 시도해주세요.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  // handleSubscribeClick 함수 정의
  const handleSubscribeClick = (insurance) => {
    // 바로가입 로직 구현
    // 예: 보험 가입 페이지로 리다이렉트 또는 백엔드에 가입 요청
    // 여기서는 간단하게 토스트 메시지로 예시
    toast({
      title: "보험 가입",
      description: `${insurance.productName}에 가입하셨습니다.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    // 추가 로직 필요 시 구현
  };

  // Color Mode 사용하여 배경 색과 텍스트 색 다르게 설정
  const bg = useColorModeValue("gray.50", "gray.800");
  const boxBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <>
      <Box className="MyIns flex flex-col justify-between min-h-screen" bg={bg}>
        <Header2 />

        <Container maxW="container.xl" p={4}>
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
                <BreadcrumbLink href="#">My 미니 추천</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Box />
          </Flex>

          {/* 각 추천 리스트를 표시 */}
          {recommendations.map((recommendation, recIndex) => (
            <Box
              key={recIndex}
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              boxShadow="lg"
              bg={boxBg}
              mb={6}
              borderColor={borderColor}
            >
              <Flex justify="space-between" align="center">
                <Heading size="md" color="teal.600">
                  {recommendation.recommendationName}
                  <Button
                    size="sm"
                    colorScheme="yellow"
                    onClick={() => handleEditClick(recommendation)}
                    _hover={{
                      backgroundColor: "yellow.500",
                      color: "white",
                    }}
                    marginLeft="10px"
                  >
                    <FaEdit style={{ marginRight: "4px" }} />
                    수정
                  </Button>
                  <br />
                  <Text className="text-sm text-gray-500">
                    생성 일자 :{" "}
                    {new Date(
                      recommendation.recommendationDate
                    ).toLocaleString()}
                  </Text>
                </Heading>
                <Flex>
                  <Button
                    size="sm"
                    colorScheme="teal"
                    onClick={() => handleDetailClick(recommendation)}
                    mr={2}
                    _hover={{
                      backgroundColor: "teal.500",
                      color: "white",
                    }}
                  >
                    상세보기
                  </Button>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Container>

        {/* 추천 이름 수정 모달 */}
        <Modal isOpen={isEditOpen} onClose={onEditClose} size="md">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>추천 이름 수정</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl id="recommendationName" isRequired>
                <FormLabel>새 추천 이름</FormLabel>
                <Input
                  placeholder="새로운 추천 이름을 입력하세요"
                  value={newRecommendationName}
                  onChange={(e) => setNewRecommendationName(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                mr={3}
                onClick={handleUpdateRecommendationName}
              >
                수정 완료
              </Button>
              <Button variant="ghost" onClick={onEditClose}>
                취소
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* 모달로 추천 리스트의 상세 정보 표시 */}
        {selectedRecommendation && (
          <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader
                borderBottomWidth="1px"
                borderBottomColor={borderColor}
                bg={boxBg}
                color="teal.500"
                fontWeight="bold"
              >
                {new Date(
                  selectedRecommendation.recommendationDate
                ).toLocaleString()}{" "}
                추천 상세 정보
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody bg={bg}>
                {/* 반복되는 추천 섹션을 재사용 가능한 컴포넌트로 변경 */}
                <RecommendationSection
                  title="고객 맞춤 추천"
                  recommendationType="맞춤 추천"
                  recommendations={selectedRecommendation.insuranceList}
                  handleDetailClick={handleDetailClick}
                  handleSubscribeClick={handleSubscribeClick}
                />

                <RecommendationSection
                  title="AI 기반 추천"
                  recommendationType="AI 추천"
                  recommendations={selectedRecommendation.insuranceList}
                  handleDetailClick={handleDetailClick}
                  handleSubscribeClick={handleSubscribeClick}
                />

                <RecommendationSection
                  title="인기도 추천"
                  recommendationType="인기도 추천"
                  recommendations={selectedRecommendation.insuranceList}
                  handleDetailClick={handleDetailClick}
                  handleSubscribeClick={handleSubscribeClick}
                />

                <RecommendationSection
                  title="보험사 추천"
                  recommendationType="보험사 추천"
                  recommendations={selectedRecommendation.insuranceList}
                  handleDetailClick={handleDetailClick}
                  handleSubscribeClick={handleSubscribeClick}
                />
              </ModalBody>
              <ModalFooter bg={boxBg}>
                <Button onClick={onClose} colorScheme="teal">
                  닫기
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
      </Box>
      <Footer />
    </>
  );
};

export default MyInsRecList;
