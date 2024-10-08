import React, { useState, useEffect } from "react";
import {
  useToast,
  Box,
  Button,
  Text,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Image,
  IconButton,
  Spinner,
  Badge,
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { FaStar } from "react-icons/fa"; // 별표 아이콘
import Marquee from "react-fast-marquee"; // marquee 추가
import axios from "axios";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useSelector } from "react-redux";

const InsReview = () => {
  // 리뷰 작성 모달 제어
  const { isOpen, onOpen, onClose } = useDisclosure();
  // 마이 리뷰 모달 제어
  const {
    isOpen: isReviewsOpen,
    onOpen: onReviewsOpen,
    onClose: onReviewsClose,
  } = useDisclosure();

  const [insuranceData, setInsuranceData] = useState([]); // 보험 데이터
  const [selectedInsurance, setSelectedInsurance] = useState(null); // 선택한 보험
  const [reviewText, setReviewText] = useState(""); // 리뷰 텍스트
  const [rating, setRating] = useState(null); // 별점
  const [hoverRating, setHoverRating] = useState(null); // 별점에 마우스 올렸을 때
  const [loading, setLoading] = useState(true); // 로딩 상태
  const toast = useToast();
  const user = useSelector((state) => state.user.userInfo);

  const [userReviews, setUserReviews] = useState([]); // 사용자 리뷰 데이터
  const [loadingReviews, setLoadingReviews] = useState(false); // 리뷰 로딩 상태
  const [sortOption, setSortOption] = useState("date_desc"); // 정렬 옵션

  // 백엔드에서 보험 데이터 받아오기
  useEffect(() => {
    if (user && user.id) {
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/my-insurances?memberId=${user.id}`
        )
        .then((response) => {
          setInsuranceData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching insurance data:", error);
          setLoading(false);
        });
    }
  }, [user]);

  // 사용자 리뷰 받아오기
  const fetchUserReviews = () => {
    setLoadingReviews(true);
    axios
      .get(
        `http://localhost:8080/api/user/my-ins/my-reviews?memberId=${user.id}`
      )
      .then((response) => {
        setUserReviews(response.data);
        setLoadingReviews(false);
        onReviewsOpen(); // 리뷰 데이터를 불러온 후 모달 열기
      })
      .catch((error) => {
        console.error("Error fetching user reviews:", error);
        setLoadingReviews(false);
      });
  };

  // 리뷰 제출 함수
  const handleSubmitReview = () => {
    if (!reviewText || !rating || !selectedInsurance) {
      toast({
        title: "리뷰 제출 실패",
        description: "보험, 리뷰, 별점을 모두 입력해주세요.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    axios
      .post("http://localhost:8080/api/user/my-ins/submit-review", {
        contractId: selectedInsurance.contractId, // 선택한 보험 계약 ID
        memberId: user.id, // 사용자 ID
        reviewScore: rating, // 별점
        reviewContent: reviewText, // 리뷰 내용
      })
      .then((response) => {
        toast({
          title: "리뷰 제출 완료",
          description: "리뷰가 성공적으로 제출되었습니다.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        // 모달 닫기 및 초기화
        setReviewText("");
        setRating(null);
        setSelectedInsurance(null);
        onClose();
        // 보험 데이터 업데이트: isReviewed를 true로 설정
        setInsuranceData((prevData) =>
          prevData.map((ins) =>
            ins.contractId === selectedInsurance.contractId
              ? { ...ins, isReviewed: true }
              : ins
          )
        );
      })
      .catch((error) => {
        toast({
          title: "리뷰 제출 실패",
          description: "리뷰 제출에 실패했습니다. 다시 시도해주세요.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const reviews = [
    {
      id: 1,
      name: "Brent",
      username: "@goBrentgo",
      review: "간단하고 쉽고 빠른 보험 서비스였습니다! 고객 지원도 훌륭해요.",
    },
    {
      id: 2,
      name: "Valeria Delgado",
      username: "@Valeria90",
      review:
        "Lemonade의 보험을 사용한 이후로 비용도 절감하고 걱정이 줄었어요.",
    },
    {
      id: 3,
      name: "성창민",
      username: "@stephen_huber",
      review:
        "보험 청구가 정말 빠릅니다! 몇 초 안에 처리됐어요. 훌륭한 서비스입니다.",
    },
  ];

  // 리뷰 정렬 함수
  const sortReviews = (reviews, option) => {
    const sorted = [...reviews];
    switch (option) {
      case "date_asc":
        sorted.sort(
          (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
        );
        break;
      case "date_desc":
        sorted.sort(
          (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
        );
        break;
      case "period_asc":
        sorted.sort((a, b) =>
          a.insurancePeriod.localeCompare(b.insurancePeriod)
        );
        break;
      case "period_desc":
        sorted.sort((a, b) =>
          b.insurancePeriod.localeCompare(a.insurancePeriod)
        );
        break;
      default:
        break;
    }
    return sorted;
  };

  const sortedUserReviews = sortReviews(userReviews, sortOption);

  // 보험 데이터 중 리뷰를 작성하지 않은 목록
  const notReviewedInsurances = insuranceData.filter(
    (ins) => !ins.isReviewed && ins.status !== "미등록"
  );

  return (
    <Box className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />

      <Box textAlign="center" mt="24">
        <Text fontSize="4xl" fontWeight="bold" mb="4">
          99%의 고객이 만족한 최고의 보험 서비스
        </Text>
        <Text fontSize="2xl" color="gray.600" mb="4">
          고객님의 소중한 리뷰를 남겨주세요
        </Text>
      </Box>

      {/* 별 이미지 */}
      <Box className="star-container mx-auto my-10" textAlign="center">
        <Box className="star">
          <img
            src="/no_bg_star.svg"
            className="non_colored_star"
            alt="배경 별"
          />
          <img src="/green_Star.png" className="colored_star" alt="색칠된 별" />
        </Box>
      </Box>

      {/* 보험 선택 및 리뷰 작성 모달 열기 버튼 */}
      <Box textAlign="center" mb="6">
        <Button
          colorScheme="teal"
          onClick={fetchUserReviews} // 리뷰 불러오기와 모달 열기 동시에 수행
          boxShadow="0 4px 8px rgba(72, 178, 165, 0.5)"
          mr="20px"
        >
          마이 리뷰
        </Button>
        <Button
          colorScheme="teal"
          onClick={onOpen}
          boxShadow="0 4px 8px rgba(72, 178, 165, 0.5)"
          ml="20px"
        >
          리뷰 남기기
        </Button>
      </Box>

      {/* 보험 데이터가 없을 경우 처리 */}
      {!insuranceData.length && !loading && (
        <Box textAlign="center" my="6">
          <Text color="red.500" fontSize="xl">
            리뷰할 보험이 없습니다.
          </Text>
        </Box>
      )}

      {/* 로딩 스피너 */}
      {loading && (
        <Box textAlign="center" my="6">
          <Spinner size="xl" />
        </Box>
      )}

      {/* 캐러셀: Marquee 사용 */}
      <Box className="w-full px-10 my-10">
        <Marquee gradient={false} speed={70} pauseOnHover={false}>
          {reviews.map((review) => (
            <Box
              key={review.id}
              className="p-6 bg-white rounded-lg shadow-lg mx-4"
              minW="300px"
              textAlign="center"
            >
              <Box display="flex" alignItems="center" mb="2">
                <img
                  src="/path_to_profile_image.png"
                  className="w-10 h-10 rounded-full mr-3 bg-slate-500"
                  alt={review.name}
                />
                <Box>
                  <Text fontWeight="bold">{review.name}</Text>
                  <Text color="gray.500">{review.username}</Text>
                </Box>
              </Box>
              <Text mb="4" color="gray.800">
                {review.review}
              </Text>
            </Box>
          ))}
        </Marquee>
      </Box>

      {/* 리뷰 작성 모달 */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setSelectedInsurance(null);
          onClose();
        }}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent maxHeight="80vh">
          {/* 모달 높이 고정 */}
          <ModalHeader>리뷰 작성하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            {/* 내부 스크롤 활성화 */}
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>작성한 리뷰</Tab>
                <Tab>작성하지 않은 리뷰</Tab>
              </TabList>
              <TabPanels>
                {/* 작성한 리뷰 탭 */}
                <TabPanel>
                  {/* 작성한 리뷰 목록 */}
                  {insuranceData
                    .filter((ins) => ins.isReviewed)
                    .map((insurance, index) => (
                      <Flex
                        key={index}
                        align="center"
                        p="4"
                        mb="4"
                        borderRadius="lg"
                        bg="gray.50"
                      >
                        <Image
                          src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/coupon_img_cyber.svg"
                          alt={insurance.productName}
                          boxSize="50px"
                          mr="4"
                        />
                        <Box>
                          <Text fontWeight="bold">{insurance.productName}</Text>
                          <Text color="gray.500">
                            {insurance.insurancePeriod} / {insurance.status}
                          </Text>
                        </Box>
                        <Box ml="auto">
                          <Badge colorScheme="green">리뷰 완료</Badge>
                        </Box>
                      </Flex>
                    ))}
                </TabPanel>

                {/* 작성하지 않은 리뷰 탭 */}
                <TabPanel>
                  {/* 보험 선택 단계 또는 리뷰 작성 단계 */}
                  {!selectedInsurance ? (
                    <Box>
                      <Text fontWeight="semibold" mb="4">
                        리뷰할 보험을 선택하세요:
                      </Text>
                      {notReviewedInsurances.length > 0 ? (
                        notReviewedInsurances.map((insurance, index) => (
                          <Flex
                            key={index}
                            align="center"
                            p="4"
                            mb="4"
                            borderRadius="lg"
                            bg="gray.50"
                            onClick={() => {
                              setSelectedInsurance(insurance);
                            }}
                            _hover={{
                              bg: "gray.100",
                              border: "1px solid #ccc",
                            }}
                            cursor="pointer"
                          >
                            <Image
                              src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/coupon_img_cyber.svg"
                              alt={insurance.productName}
                              boxSize="50px"
                              mr="4"
                            />
                            <Box>
                              <Text fontWeight="bold">
                                {insurance.productName}
                              </Text>
                              <Text color="gray.500">
                                {insurance.insurancePeriod} / {insurance.status}
                              </Text>
                            </Box>
                            <Box ml="auto">
                              <Text
                                fontSize="sm"
                                color={
                                  insurance.status === "정상"
                                    ? "teal.400"
                                    : "red.400"
                                }
                              >
                                {insurance.status === "정상"
                                  ? "등록완료"
                                  : insurance.status}
                              </Text>
                            </Box>
                          </Flex>
                        ))
                      ) : (
                        <Text color="gray.500">리뷰할 보험이 없습니다.</Text>
                      )}
                    </Box>
                  ) : (
                    <Box>
                      {/* 선택한 보험 표시 */}
                      <Box
                        mb="4"
                        p="4"
                        bg="gray.50"
                        borderRadius="lg"
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <Flex alignItems="center">
                          <Image
                            src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/coupon_img_cyber.svg" // 실제 보험 이미지 경로를 여기에 입력하세요.
                            alt={selectedInsurance.productName}
                            boxSize="50px"
                            mr="4"
                          />
                          <Box>
                            <Text fontWeight="bold">
                              {selectedInsurance.productName}
                            </Text>
                            <Text color="gray.500">
                              {selectedInsurance.insurancePeriod} /{" "}
                              {selectedInsurance.status}
                            </Text>
                          </Box>
                        </Flex>

                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => {
                            setSelectedInsurance(null);
                          }}
                          alignSelf="flex-end" // 선택 취소 버튼을 오른쪽 밑으로 배치
                        >
                          선택 취소
                        </Button>
                      </Box>

                      {/* 별점 선택 */}
                      <Text fontWeight="semibold" mb="2">
                        별점을 선택하세요:
                      </Text>
                      <Flex mb="4" justify="center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <IconButton
                            key={star}
                            icon={<FaStar />}
                            color={
                              star <= (hoverRating || rating)
                                ? "#7ce9dd"
                                : "gray.300"
                            }
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(null)}
                            variant="ghost"
                            fontSize="2xl"
                            aria-label={`${star} stars`}
                          />
                        ))}
                      </Flex>

                      {/* 리뷰 입력 */}
                      <Text fontWeight="semibold" mb="2">
                        리뷰를 입력하세요:
                      </Text>
                      <Textarea
                        placeholder="더 자세한 이야기를 들려주세요. (필수 입력)"
                        size="md"
                        resize="vertical"
                        rows={5}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        mb="4"
                      />
                    </Box>
                  )}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          {/* 모달 하단의 버튼 */}
          <ModalFooter justifyContent="center">
            {selectedInsurance && (
              <Button colorScheme="teal" onClick={handleSubmitReview}>
                리뷰 작성완료
              </Button>
            )}
            {!selectedInsurance && (
              <Button
                colorScheme="gray"
                onClick={() => {
                  onClose();
                }}
              >
                닫기
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* 마이 리뷰 모달 그대로 유지 */}
      <Modal isOpen={isReviewsOpen} onClose={onReviewsClose} size="xl">
        <ModalOverlay />
        <ModalContent maxHeight="80vh">
          {/* 모달 높이 고정 */}
          <ModalHeader>마이 리뷰</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY="auto">
            {/* 내부 스크롤 활성화 */}
            {/* 정렬 옵션 추가 */}
            <Flex mb="4" justify="space-between" align="center">
              <Text fontWeight="semibold">리뷰 정렬:</Text>
              <Select
                width="200px"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="date_desc">날짜 내림차순</option>
                <option value="date_asc">날짜 오름차순</option>
                <option value="period_desc">기간 내림차순</option>
                <option value="period_asc">기간 오름차순</option>
              </Select>
            </Flex>
            {loadingReviews ? (
              <Flex justify="center" align="center" height="100%">
                <Spinner />
              </Flex>
            ) : userReviews.length > 0 ? (
              sortedUserReviews.map((review, index) => (
                <Box
                  key={index}
                  p="4"
                  mb="4"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="sm"
                >
                  <Flex align="center" mb="2">
                    <Image
                      src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/coupon_img_cyber.svg" // 실제 보험 이미지 경로를 여기에 입력하세요.
                      boxSize="40px"
                      borderRadius="full"
                      mr="4"
                      alt={review.insuranceName}
                    />
                    <Box>
                      <Text fontWeight="bold">{review.insuranceName}</Text>
                      <Text fontSize="sm" color="gray.500">
                        {review.productType}
                      </Text>
                      <Flex align="center" mt="1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            color={
                              star <= review.reviewScore
                                ? "#7ce9dd"
                                : "gray.300"
                            }
                          />
                        ))}
                      </Flex>
                      {/* 리뷰 작성 날짜 표시 */}
                      <Text fontSize="sm" color="gray.500">
                        {new Date(review.createdDate).toLocaleDateString()}
                      </Text>
                    </Box>
                  </Flex>
                  <Text className="ml-[56px]">{review.reviewContent}</Text>
                </Box>
              ))
            ) : (
              <Text>No reviews submitted yet.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onReviewsClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Footer />
    </Box>
  );
};

export default InsReview;
