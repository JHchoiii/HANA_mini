import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Container,
  Button,
  VStack,
  HStack,
  Image,
  Text,
  Flex,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useColorModeValue,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
  Skeleton,
  StackDivider,
  Badge,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

const GiftExpirationBadge = ({ gift }) => {
  const calculateRemainingDays = (expirationDate) => {
    const today = new Date();
    const expDate = new Date(expirationDate);

    // 날짜 차이를 밀리초 단위로 계산 후, 일 단위로 변환
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 하루 = 1000ms * 60s * 60m * 24h

    return diffDays;
  };

  const [remainingDays, setRemainingDays] = useState(null);

  useEffect(() => {
    if (gift.expirationDate) {
      setRemainingDays(calculateRemainingDays(gift.expirationDate));
    }
  }, [gift.expirationDate]);

  return (
    <Box display="flex" alignItems="center">
      <Text fontSize="sm" color="gray.500">
        {gift.expirationDate} 까지
      </Text>
      {remainingDays !== null && (
        <Badge
          ml={2} // 왼쪽 여백 추가
          colorScheme={remainingDays > 0 ? "gray" : "red"} // 남은 일수에 따라 색상 변경
          px={2} // 패딩 추가
          py={1}
          borderRadius="md"
        >
          D-{remainingDays}
        </Badge>
      )}
    </Box>
  );
};
const CUSTOM_TAB_COLOR = "#ff69b4"; // 핑크 계열 탭 색상

const MyGiftDetail = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [giftData, setGiftData] = useState({
    receivedGifts: [],
    sentGifts: [],
  }); // 받는 선물과 보내는 선물 데이터를 저장
  const user = useSelector((state) => state.user.userInfo);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGift, setSelectedGift] = useState(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false); // 상세보기 로딩 상태
  const STATUS_COLOR_MAP = {
    등록: "green", // 등록
    만기: "pink", // 만기
    미등록: "gray", // 미등록 (해당 시 사용)
  };
  // Divider 색상
  const dividerBorderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    // 받는 선물과 보내는 선물 데이터를 백엔드에서 가져오기
    axios
      .get(`http://localhost:8080/api/user/my-ins/my-gifts?memberId=${user.id}`)
      .then((response) => {
        setGiftData(response.data); // 받아온 데이터를 저장
      })
      .catch((error) => {
        console.error("Error fetching gift data:", error);
      });
  }, [user.id]);

  const handleDetailClick = (gift) => {
    onOpen(); // 모달 열기
    setIsDetailLoading(true); // 로딩 시작
    // 상세 데이터를 로드하는 로직이 있다면 여기에 추가
    // 여기서는 간단히 setTimeout을 사용하여 로딩 시뮬레이션
    setTimeout(() => {
      setSelectedGift(gift);
      setIsDetailLoading(false); // 로딩 완료
    }, 500); // 0.5초 후 로딩 완료
  };

  return (
    <Box className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      <Container maxW="container.xl" p={4} py={[4, 6]}>
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
          <Breadcrumb spacing="8px" separator=">" color="pink.600" mr="120px">
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
              <BreadcrumbLink href="#">선물하기</BreadcrumbLink>
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
          bg="pink.50"
          className="flex justify-between items-center"
        >
          <VStack align="start" spacing={2}>
            <Text fontSize="2xl" fontWeight="bold" color="pink.600">
              소중한 분들에게
              <br />
              원데이 보험을 선물하세요.
            </Text>
            <Text fontSize="sm" color="gray.500">
              선물함에서 받은 선물과 보낸 선물을 관리하세요.
            </Text>
          </VStack>
          <Image
            src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/giftbox-icon-box.svg"
            alt="insurance icon"
            boxSize="60px"
          />
        </Box>

        {/* 탭 섹션 */}
        <Tabs
          index={tabIndex}
          onChange={setTabIndex}
          variant="soft-rounded"
          colorScheme="pink"
          isFitted
        >
          <TabList mb="1em" className="bg-slate-50 rounded-3xl">
            <Tab _selected={{ bg: CUSTOM_TAB_COLOR, color: "white" }}>
              받은 선물
            </Tab>
            <Tab _selected={{ bg: CUSTOM_TAB_COLOR, color: "white" }}>
              보낸 선물
            </Tab>
          </TabList>
          <Divider borderColor="pink.500" />
          <TabPanels>
            {/* 받은 선물 */}
            <TabPanel>
              {giftData.receivedGifts.length === 0 ? (
                <Text color="gray.500" textAlign="center" mt={4}>
                  받은 선물이 없습니다.
                </Text>
              ) : (
                giftData.receivedGifts.map((gift, index) => (
                  <Box key={index} mt={4}>
                    <VStack align="start" spacing={4}>
                      <Box
                        borderWidth="1px"
                        p={4}
                        w="100%"
                        borderRadius="md"
                        bg="white"
                        shadow="sm"
                        _hover={{ bg: "pink.50" }}
                      >
                        <HStack spacing={4} alignItems="center">
                          <div className="border-[2px] border-[#fb7091] rounded-[100px] p-2">
                            <Image
                              src={
                                gift.imageUrl ||
                                "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/tab_icon02_on.png"
                              }
                              alt="insurance icon"
                              boxSize="25px"
                              // border="1px solid pink"
                              // borderRadius="100px"
                            />
                          </div>
                          <Box flex="1">
                            <Text fontSize="sm" color="gray.500">
                              from. {gift.contractor} {/* 계약자 표시 */}
                            </Text>
                            <Text fontWeight="bold" fontSize="lg">
                              {gift.productName} {/* 상품명 표시 */}
                            </Text>
                            {gift.registrationStatus === "미등록" ? (
                              <GiftExpirationBadge gift={gift} />
                            ) : (
                              // 등록완료
                              <Text color="gray.500" fontSize="sm">
                                등록일 : {gift.startDate}
                                <Badge
                                  ml={2} // 왼쪽 여백 추가
                                  colorScheme="green" // 남은 일수에 따라 색상 변경
                                  px={2} // 패딩 추가
                                  py={1}
                                  borderRadius="md"
                                >
                                  등록완료
                                </Badge>{" "}
                              </Text>
                            )}
                          </Box>
                          <Box>
                            {gift.registrationStatus === "미등록" ? (
                              <Link
                                to={`/InsGift/giftRegistration/${gift.contractId}`}
                              >
                                <Button
                                  size="sm"
                                  variant="outline" // Chakra UI의 outline 스타일 사용
                                  borderColor="pink.500"
                                  color="pink.500"
                                  _hover={{
                                    bg: "pink.500", // 호버 시 배경 색상 변경
                                    color: "white", // 호버 시 텍스트 색상 변경
                                    borderColor: "pink.600", // 호버 시 테두리 색상 변경
                                  }}
                                  borderRadius="md" // 모서리를 둥글게
                                  className="bg-transparent"
                                >
                                  선물 등록하기
                                </Button>
                              </Link>
                            ) : (
                              <Badge
                                colorScheme="pink"
                                variant="subtle"
                                px={2} // 좌우 패딩 (버튼 크기에 맞추기 위해 조정)
                                py={1} // 상하 패딩 (버튼 크기에 맞추기 위해 조정)
                                fontSize="md" // 텍스트 크기를 적절히 조정
                                borderRadius="md" // 버튼과 동일한 둥근 모서리
                              >
                                등록
                              </Badge>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              colorScheme="pink"
                              ml={2}
                              onClick={() => handleDetailClick(gift)}
                            >
                              상세보기
                            </Button>
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                ))
              )}
            </TabPanel>

            {/* 보낸 선물 */}
            <TabPanel>
              {giftData.sentGifts.length === 0 ? (
                <Text color="gray.500" textAlign="center" mt={4}>
                  보낸 선물이 없습니다.
                </Text>
              ) : (
                giftData.sentGifts.map((gift, index) => (
                  <Box key={index} mt={4}>
                    <VStack align="start" spacing={4}>
                      <Box
                        borderWidth="1px"
                        p={4}
                        w="100%"
                        borderRadius="md"
                        bg="white"
                        shadow="sm"
                        _hover={{ bg: "pink.50" }}
                      >
                        <HStack spacing={4} alignItems="center">
                          <div className=" bg-[#ff86a2] rounded-[100px] p-2">
                            <Image
                              src={
                                gift.imageUrl ||
                                "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/tab_icon02.png"
                              }
                              alt="insurance icon"
                              boxSize="25px"
                              borderRadius="md"
                            />
                          </div>
                          <Box flex="1">
                            <Text fontSize="sm" color="gray.500">
                              계약자: {gift.contractor} {/* 계약자 표시 */}
                            </Text>
                            <Text fontWeight="bold" fontSize="lg">
                              {gift.productName} {/* 상품명 표시 */}
                            </Text>

                            <Text fontSize="sm" color="gray.500">
                              {gift.giftMsg || "없음"} {/* 선물 메시지 표시 */}
                            </Text>
                          </Box>
                          <Box>
                            <Badge
                              colorScheme={
                                STATUS_COLOR_MAP[gift.registrationStatus] ||
                                "gray"
                              }
                              variant="subtle"
                              px={2} // 좌우 패딩 (버튼 크기에 맞추기 위해 조정)
                              py={1} // 상하 패딩 (버튼 크기에 맞추기 위해 조정)
                              fontSize="md" // 텍스트 크기를 적절히 조정
                              borderRadius="md" // 버튼과 동일한 둥근 모서리
                            >
                              {gift.registrationStatus}
                            </Badge>

                            <Button
                              size="sm"
                              variant="ghost"
                              color="gray.500"
                              ml={2}
                              onClick={() => handleDetailClick(gift)}
                            >
                              상세보기
                            </Button>
                          </Box>
                        </HStack>
                      </Box>
                    </VStack>
                  </Box>
                ))
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
      <Footer bg="pink.100" />

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
                <Spinner size="lg" color="pink.500" />
              </Flex>
            ) : selectedGift ? (
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
                        선물 상품명
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedGift.productName}
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
                        보낸 사람
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedGift.contractor}
                      </Td>
                    </Tr>
                    <Tr bg="gray.200">
                      <Th
                        border="1px"
                        borderColor="gray.300"
                        textAlign="left"
                        p={4}
                      >
                        받는 사람
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedGift.insuredPerson}
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
                        선물 발송일
                      </Th>
                      <Td border="1px" borderColor="gray.300" p={4} bg="white">
                        {selectedGift.lastPaymentDate}
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
                            selectedGift.registrationStatus === "등록"
                              ? "green"
                              : selectedGift.registrationStatus === "미등록"
                              ? "red"
                              : "gray"
                          }
                        >
                          {selectedGift.registrationStatus === "등록"
                            ? "등록 완료"
                            : "등록 필요"}
                        </Badge>
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            ) : (
              // 선택된 선물 정보가 없을 때
              <Flex justify="center" align="center" minH="100px">
                <Spinner size="lg" color="pink.500" />
              </Flex>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="pink" mr={3} onClick={onClose}>
              닫기
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyGiftDetail;
