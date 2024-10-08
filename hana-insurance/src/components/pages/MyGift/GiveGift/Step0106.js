import React, { useState, useEffect } from "react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useSelector, useDispatch } from "react-redux"; // useDispatch 추가
import "../../../css/Custom.css";
import { setTotalPremium, setUsedPoint } from "../../../../store"; // 추가된 import
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent as ChakraDrawerContent,
  DrawerCloseButton as ChakraDrawerCloseButton,
  useDisclosure,
  Checkbox,
  Divider,
  Box,
  Flex,
  Text,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
const Step0106 = () => {
  // 리덕스에서 필요한 데이터 가져오기
  const user = useSelector((state) => state.user.userInfo);
  const productName = useSelector((state) => state.gift.productName);
  const vehicleNumber = useSelector((state) => state.gift.vehicleNumber);
  const insurancePeriod = useSelector((state) => state.gift.insurancePeriod);
  const contractHolder = useSelector((state) => state.user.userInfo);
  const insuredPersonId = useSelector((state) => state.gift.insuredPersonId);
  const insuredPersonName = useSelector(
    (state) => state.gift.insuredPersonName
  );
  const subscriptionType = useSelector((state) => state.gift.subscriptionType);
  const coverageDetails = useSelector((state) => state.gift.coverageDetails);
  const totalPremium = useSelector((state) => state.gift.totalPremium);
  const dispatch = useDispatch(); // useDispatch 추가

  const [isModalOpen, setIsModalOpen] = useState({
    modal1: false,
    modal2: false,
  });
  const [termsChecked, setTermsChecked] = useState({
    terms1: false,
    terms2: false,
  });

  const [agreeAll, setAgreeAll] = useState(false);
  const [agreements, setAgreements] = useState({
    agree1: false,
    agree2: false,
    agree3: false,
    agree4: false,
  });

  const handleIndividualAgree = (key, isChecked) => {
    if (key === "agree1") {
      setAgreements({
        agree1: isChecked,
        agree2: isChecked,
        agree3: isChecked,
        agree4: isChecked,
      });
    } else {
      setAgreements((prev) => ({ ...prev, [key]: isChecked }));
    }
  };
  const [availablePoints, setAvailablePoints] = useState(0);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [finalPremium, setFinalPremium] = useState(totalPremium); // 차감된 보험료
  const [displayedPremium, setDisplayedPremium] = useState(totalPremium); // 애니메이션을 위한 표시되는 보험료

  const maxPointsUsage = Math.floor(totalPremium * 0.5); // 포인트 최대 사용량

  const handleAgreeAll = (isChecked) => {
    setAgreeAll(isChecked);
    setAgreements({
      agree1: isChecked,
      agree2: isChecked,
      agree3: isChecked,
      agree4: isChecked,
    });
  };

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer 상태 제어

  const canProceed = Object.values(agreements).every(Boolean); // 모든 개별 동의가 체크되었는지 확인

  // 다음 버튼 클릭 시 Drawer 열기
  const handleNextClick = () => {
    onOpen();
  };

  const handleConfirm = () => {
    if (canProceed) {
      dispatch(setTotalPremium(finalPremium));

      // 사용한 포인트를 usedPoint에 저장
      console.log("pointsToUse : " + pointsToUse);
      dispatch(setUsedPoint(pointsToUse));

      const newWindow = window.open(
        "http://localhost:9000",
        "newWindow",
        "width=900,height=700"
      );

      const checkWindowClose = setInterval(() => {
        if (newWindow.closed) {
          clearInterval(checkWindowClose);
          navigate("/InsGift/giveGift/Step0501");
        }
      }, 500);
    }
  };

  // 포인트 가져오기 - 백엔드 요청
  useEffect(() => {
    if (user && user.id) {
      // user와 user.id가 존재할 때만 요청
      console.log("Fetching points for memberId:", user.id); // 디버깅 로그
      axios
        .get(`http://localhost:8080/api/user/my-ins/points?memberId=${user.id}`)
        .then((response) => {
          setAvailablePoints(response.data); // response.data는 Integer
        })
        .catch((error) => {
          console.error("Error fetching points", error);
        });
    }
  }, [user]);

  // 포인트 사용 처리
  const handleUsePoints = (points) => {
    const adjustedPoints = Math.min(points, availablePoints, maxPointsUsage); // 사용할 포인트 제한
    console.log(adjustedPoints);
    setPointsToUse(adjustedPoints);
    setFinalPremium(totalPremium - adjustedPoints); // 포인트만큼 차감
    dispatch({ type: "SET_USED_POINT", payload: adjustedPoints }); // usedPoint 리덕스에 저장
  };

  // 카운트업 애니메이션 적용
  useEffect(() => {
    const targetPrice = finalPremium;
    let start = 0;
    const duration = 1000; // 1초 동안 카운트업
    const increment = targetPrice / (duration / 10); // 10ms마다 값 증가

    const interval = setInterval(() => {
      start += increment;
      if (start >= targetPrice) {
        setDisplayedPremium(targetPrice);
        clearInterval(interval); // 목표 가격에 도달하면 인터벌 종료
      } else {
        setDisplayedPremium(Math.floor(start));
      }
    }, 10);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
  }, [finalPremium]);

  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <h1 className="text-center text-[15px] mt-7">선물하기 정보 입력</h1>
      <div className="mt-2 my-[100px]">
        <div className="flex mt-6 mb-[30px] w-[700px] h-[50px] items-center">
          <span className="w-4 h-4 rounded-full bg-pink-500"></span>
          <span className="w-4 h-4 rounded-full bg-pink-500 mx-2"></span>
          <span className="w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500"></span>
          <span className="w-4 h-4 rounded-full mx-2 bg-gray-300"></span>
        </div>
        {/* 리덕스에서 불러온 정보 표시 */}
        <div className="border border-gray-300 p-5 w-[700px]">
          <h2 className="text-xl font-bold mb-4">정보 확인</h2>
          <ul className="text-gray-700">
            <li className="mb-2">
              <strong>상품명:</strong> {productName}
            </li>
            <li className="mb-2">
              <strong>차량번호:</strong> {vehicleNumber}
            </li>
            <li className="mb-2">
              <strong>보험기간:</strong> {insurancePeriod}일
            </li>
            <li className="mb-2">
              <strong>계약자:</strong> {contractHolder.name}
            </li>
            <li className="mb-2">
              <strong>피보험자:</strong> {insuredPersonName}
            </li>
            <li className="mb-2">
              <strong>가입유형:</strong> {subscriptionType}
            </li>
            {/* <li className="mb-2">
              <strong>총 보험료:</strong> {finalPremium.toLocaleString()}원{" "}
            
            </li> */}
          </ul>
        </div>

        {/* 포인트 사용 섹션 */}
        <div className="mt-6 border border-gray-300 p-5 w-[700px]">
          <h3 className="text-xl font-bold mb-4">포인트</h3>
          <div className="flex flex-col justify-between items-start mb-4">
            <div className="text-gray-700">
              <div className="flex justify-between items-center">
                <span className="font-semibold mr-2">보유 포인트</span>
                <p className="text-sm">{availablePoints.toLocaleString()}P</p>
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4 mb-4">
            <input
              type="number"
              className="border p-2 w-[540px] mr-4"
              value={pointsToUse}
              min={0}
              max={maxPointsUsage}
              onChange={(e) => handleUsePoints(Number(e.target.value))}
              placeholder="사용"
            />
            <button
              className="bg-green-100 text-green-700 font-bold py-2 px-4 rounded-lg"
              onClick={() => handleUsePoints(maxPointsUsage)}
            >
              전액사용
            </button>
          </div>
          <span className="font-semibold text-lg text-gray-800">
            <strong>총 보험료:</strong> {displayedPremium.toLocaleString()}원
          </span>
        </div>

        {/* 보장 내용 표시 */}
        <div className="mt-6 border border-gray-300 p-5 w-[700px]">
          <h3 className="text-xl font-bold mb-4">보장내용</h3>
          <ul className="text-gray-700">
            {coverageDetails.map((detail, index) => (
              <li key={index} className="mb-2 flex justify-between">
                <span>{detail.label}</span>
                <span>{detail.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-4 w-[700px]">
          <h3 className="font-bold text-gray-700 mb-2">꼭 확인하세요!</h3>
          <ul className="pink-custom-list-dot-image list-none pl-5 text-sm text-gray-600">
            <li>
              <div className="text-gray-500 text-[14px] flex my-3">
                <img
                  src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                  alt="info"
                />
                <span className="ml-2">
                  본 선물은 선물받으신 분이 선물등록을 하여 최종 가입완료 시
                  보험가입일부터 효력이 발생하며, 보상이 가능합니다.
                </span>
              </div>
            </li>
            <li>
              <div className="text-gray-500 text-[14px] flex my-3">
                <img
                  src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                  alt="info"
                />
                <span className="ml-2">
                  선물받으신 분이 가입을 진행하지 않거나, 보험가입을 완료하지
                  않을 경우 선물이 취소됩니다.
                </span>
              </div>
            </li>
            <li>
              <div className="text-gray-500 text-[14px] flex my-3">
                <img
                  src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                  alt="info"
                />
                <span className="ml-2">
                  선물된 보험상품의 가입완료 이후에는 취소 및 환불이 불가하며,
                  출고 이후 사고가 발생해도 보상이 가능합니다..
                </span>
              </div>
            </li>
          </ul>
        </div>

        {/* 보험약관 확인 버튼 */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-pink-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600 mr-2"
            onClick={() => {
              setIsModalOpen({ ...isModalOpen, modal1: true });
              setTermsChecked((prev) => ({ ...prev, terms1: true }));
            }}
          >
            보험약관 확인하기
          </button>

          <button
            className="bg-pink-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-pink-600"
            onClick={() => {
              setIsModalOpen({ ...isModalOpen, modal2: true });
              setTermsChecked((prev) => ({ ...prev, terms2: true }));
            }}
          >
            상품설명서 확인하기
          </button>
        </div>

        {/* 보험약관 모달 */}
        <Modal
          isOpen={isModalOpen.modal1}
          onClose={() => setIsModalOpen({ ...isModalOpen, modal1: false })}
        >
          <ModalOverlay />
          <ModalContent maxWidth="60%">
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
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() =>
                  setIsModalOpen({ ...isModalOpen, modal1: false })
                }
              >
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* 상품설명서 모달 */}
        <Modal
          isOpen={isModalOpen.modal2}
          onClose={() => setIsModalOpen({ ...isModalOpen, modal2: false })}
        >
          <ModalOverlay />
          <ModalContent maxWidth="60%">
            <ModalHeader>상품설명서</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <embed
                src="/hanainsu.pdf"
                width="100%"
                height="500px"
                type="application/pdf"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() =>
                  setIsModalOpen({ ...isModalOpen, modal2: false })
                }
              >
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* 체크박스 */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            id="termsCheckbox"
            className="w-5 h-5 accent-pink-500"
            checked={termsChecked.terms1 && termsChecked.terms2}
            readOnly
          />
          <label htmlFor="termsCheckbox" className="ml-2 text-gray-600">
            보험약관 및 상품설명서를 모두 확인하였습니다.
          </label>
        </div>

        {/* Drawer로 다음 클릭시 아래에서 슬라이드 */}
        <div className="flex justify-center mt-6 items-center">
          <button
            className="bg-pink-400 text-white font-bold py-3 px-20 rounded-lg hover:bg-pink-600"
            onClick={handleNextClick} // 다음 버튼 클릭 시 Drawer 열기
          >
            다음
          </button>
          <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
            <DrawerOverlay />
            <ChakraDrawerContent
              style={{
                width: "55%",
                height: "70%",
                margin: "0 auto",
                borderRadius: "10px",
              }}
            >
              <ChakraDrawerCloseButton />
              <DrawerHeader className="flex justify-center">
                보험 계약 체결 동의
              </DrawerHeader>
              <DrawerBody display="flex" flexDirection="column" gap="1.5rem">
                <Text fontSize="sm">
                  고객님의 보험 계약 체결 및 이행을 위한 본인 동의가 필요합니다.
                </Text>
                {/* 전체 동의 체크박스 */}
                <Checkbox
                  isChecked={agreeAll}
                  onChange={(e) => handleAgreeAll(e.target.checked)}
                  colorScheme="pink" // 체크박스 핑크색 적용
                >
                  <Text fontSize="2xl" fontWeight="semibold" color="pink.500">
                    전체 동의
                  </Text>
                </Checkbox>
                <Divider />

                {/* [필수] 계약·체결 이행 등을 위한 동의 체크박스 */}
                <Checkbox
                  isChecked={agreements.agree1}
                  onChange={(e) =>
                    handleIndividualAgree("agree1", e.target.checked)
                  }
                  colorScheme="pink" // 체크박스 핑크색 적용
                >
                  <Text fontSize="xl" fontWeight="semibold" color="pink.500">
                    [필수] 계약·체결 이행 등을 위한 동의
                  </Text>
                </Checkbox>

                {/* 세부 항목 */}
                <Box pl="6">
                  {[
                    "수집/이용에 관한 사항",
                    "제공에 관한 사항",
                    "조회에 관한 사항",
                    "동의에 관한 사항",
                  ].map((item, index) => (
                    <Flex
                      key={index}
                      justify="space-between"
                      align="center"
                      mt="2"
                    >
                      <Text color="gray.700">{item}</Text>
                      <div className="flex gap-1">
                        <CheckIcon
                          color={agreements.agree1 ? "pink.500" : "gray.400"} // 체크 상태에 따라 색상 변경
                          size="16px"
                          className="mt-[2px]"
                        />
                        <Text color="gray.500">동의</Text>
                      </div>
                    </Flex>
                  ))}
                </Box>

                <Divider />

                {/* [필수] 예금자보호에 관한 사항 체크박스 */}
                <Checkbox
                  isChecked={agreements.agree2}
                  onChange={(e) =>
                    handleIndividualAgree("agree2", e.target.checked)
                  }
                  colorScheme="pink" // 체크박스 핑크색 적용
                >
                  <Text fontSize="xl" fontWeight="semibold" color="pink.500">
                    [필수] 예금자보호에 관한 사항
                  </Text>
                </Checkbox>
                <Text fontSize="sm" color="gray.600" pl="6">
                  이 보험계약은 예금자보호법에 따라 해약환급금(또는 만기 시
                  보험금)에 기타지급금을 합한 금액이 1인당 "5천만원까지"(당사의
                  다른 보호상품과 합산) 보호됩니다. 이와 별도로 본 보험회사
                  보호상품의 사고보험금을 합산한 금액이 1인당 "5천만원까지"
                  보호됩니다. 다만, 보험계약자 및 보험료 납부자가 법인인
                  보험계약은 예금자보호법에 따라 보호되지 않습니다.
                </Text>
                <Divider />

                {/* [필수] 전자금융거래 약관 동의 체크박스 */}
                <Checkbox
                  isChecked={agreements.agree3}
                  onChange={(e) =>
                    handleIndividualAgree("agree3", e.target.checked)
                  }
                  colorScheme="pink" // 체크박스 핑크색 적용
                >
                  <Text fontSize="xl" fontWeight="semibold" color="pink.500">
                    [필수] 전자금융거래 약관 동의
                  </Text>
                </Checkbox>
                <Divider />

                {/* [필수] 계약해지 시 콜센터/홈페이지 이용 동의 체크박스 */}
                <Checkbox
                  isChecked={agreements.agree4}
                  onChange={(e) =>
                    handleIndividualAgree("agree4", e.target.checked)
                  }
                  colorScheme="pink" // 체크박스 핑크색 적용
                >
                  <Text fontSize="xl" fontWeight="semibold" color="pink.500">
                    [필수] 계약해지 시 콜센터/홈페이지 이용 동의
                  </Text>
                </Checkbox>

                <Box p="4" bg="gray.200">
                  보험청약내용, 개인정보 이용 및 제공에 관한 사항, 예금자보호에
                  관한 사항, 전자금융거래 이용약관에 대하여 계약자 최준혁님의
                  전자서명을 통한 자필서명으로 동의합니다.
                </Box>
              </DrawerBody>
              <DrawerFooter display="flex" justifyContent="space-between">
                <Button variant="outline" onClick={onClose} color="pink.500">
                  닫기
                </Button>
                <Button
                  colorScheme="pink"
                  onClick={handleConfirm}
                  isDisabled={!canProceed}
                >
                  확인
                </Button>
              </DrawerFooter>
            </ChakraDrawerContent>
          </Drawer>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step0106;
