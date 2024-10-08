import React, { useState, useEffect } from "react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import {
  useDisclosure,
  IconButton,
  Tooltip,
  Tag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react"; // Chakra UI 관련 임포트
import { FaQuestionCircle } from "react-icons/fa"; // React Icons에서 아이콘 임포트
import { useDispatch, useSelector } from "react-redux"; // Redux 디스패치 및 리덕스 상태 가져오기
import { Link } from "react-router-dom";
import axios from "axios";

import {
  setTotalPremium,
  setProductType,
  setCoverageDetails,
  setInsuranceId,
} from "../../../../store"; // 필요한 Redux 액션 임포트

// 보험 플랜 정보
// const insurancePlans = {
//   종합형: {
//     basePrice: 11530, // 1일차 가격
//     dailyIncrease: 5300, // 일일 증가 가격
//     details: [
//       { label: "대인배상(대인 II)", price: "무한" },
//       { label: "대인배상Ⅰ지원금 특약", price: "1억5천만원" },
//       { label: "대물배상", price: "3천만원" },
//       { label: "타인차량 복구비용", price: "자기부담금 50만원" },
//       { label: "자기신체사고", price: "3천만원" },
//       { label: "무보험차상해", price: "2억원" },
//       { label: "법률비용특약 가입", price: "" },
//     ],
//     tags: ["무한대인", "대물배상", "자기신체사고"],
//     modalContent: `
//       <h3>대인배상Ⅱ</h3>
//       <p>기명피보험자가 피보험자동차를 운전하는 동안 생긴 사고로 다른 사람을 사망하게 하거나 다치게 한 경우 그로 인한 손해를 보상합니다.</p>
//       <p>피해자당 무한(책임보험 초과분)</p>

//       <h3>대인배상Ⅰ지원금 특약</h3>
//       <p>피보험자가 대인배상Ⅰ에서 담보하는 금액을 피해자에게 지급한 경우 실제 지급금액을 보전합니다.</p>
//       <p>피해자 1인당 최고 1억5천만원</p>

//       <h3>대물배상</h3>
//       <p>사고로 다른 사람의 재물을 없애거나 훼손한 경우 그 손해를 보상합니다.</p>
//       <p>1사고당 1억원 한도</p>

//       <h3>자기신체사고</h3>
//       <p>사고로 피보험자가 사망하거나 다친 경우, 그로 인한 손해를 보상합니다.</p>
//       <p>피해자 1인당 최고 3천만원(부상: 최고 1천5백만원)</p>

//       <h3>무보험자동차에 의한 상해</h3>
//       <p>무보험자동차로 인한 사고로 사망하거나 다친 경우 손해를 보상합니다.</p>
//       <p>피해자 1인당 최고 2억원</p>

//       <h3>법률비용지원 특약</h3>
//       <p>사고로 다른 사람을 사망하게 하거나 다치게 한 경우 형사상 책임을 지는 경우 발생된 손해를 보상합니다.</p>
//       <p>형사합의지원금 3천만원 한도, 방어비용지원 2백만원 한도, 벌금비용 3천만원 한도</p>
//     `,
//   },
//   기본형: {
//     basePrice: 8750,
//     dailyIncrease: 4000,
//     details: [
//       { label: "대인배상(대인 II)", price: "무한" },
//       { label: "대물배상", price: "1억원" },
//       { label: "자기신체사고", price: "3천만원" },
//       { label: "타인차량 복구비용", price: "" },
//     ],
//     tags: ["대인배상", "대물배상"],
//     modalContent: `
//       <h3>대인배상Ⅱ</h3>
//       <p>기명피보험자가 피보험자동차를 운전하는 동안 생긴 사고로 다른 사람을 사망하게 하거나 다치게 한 경우 그로 인한 손해를 보상합니다.</p>
//       <p>피해자당 무한(책임보험 초과분)</p>

//       <h3>대물배상</h3>
//       <p>사고로 다른 사람의 재물을 없애거나 훼손한 경우 그 손해를 보상합니다.</p>
//       <p>1사고당 1억원 한도</p>

//       <h3>자기신체사고</h3>
//       <p>사고로 피보험자가 사망하거나 다친 경우, 그로 인한 손해를 보상합니다.</p>
//       <p>피해자 1인당 최고 3천만원(부상: 최고 1천5백만원)</p>
//     `,
//   },
//   최소형: {
//     basePrice: 7000,
//     dailyIncrease: 3200,
//     details: [
//       { label: "대인배상(대인 II)", price: "무한" },
//       { label: "대물배상", price: "1억원" },
//       { label: "자기신체사고", price: "" },
//     ],
//     tags: ["대인배상", "대물배상"],
//     modalContent: `
//       <h3>대인배상Ⅱ</h3>
//       <p>기명피보험자가 피보험자동차를 운전하는 동안 생긴 사고로 다른 사람을 사망하게 하거나 다치게 한 경우 그로 인한 손해를 보상합니다.</p>
//       <p>피해자당 무한(책임보험 초과분)</p>

//       <h3>대물배상</h3>
//       <p>사고로 다른 사람의 재물을 없애거나 훼손한 경우 그 손해를 보상합니다.</p>
//       <p>1사고당 1억원 한도</p>

//       <h3>자기신체사고</h3>
//       <p>사고로 피보험자가 사망하거나 다친 경우, 그로 인한 손해를 보상합니다.</p>
//       <p>피해자 1인당 최고 3천만원(부상: 최고 1천5백만원)</p>
//     `,
//   },
//   차량손해보장형: {
//     basePrice: 1750,
//     dailyIncrease: 800,
//     details: [{ label: "타인차량 복구비용", price: "" }],
//     tags: ["타인차량복구"],
//     modalContent: `
//       <h3>타인차량 복구비용(빌린 차량 수리비용)</h3>
//       <p>사고로 피보험자동차가 파손된 경우 손해를 보상합니다. 다른 차량과의 충돌 또는 접촉으로 인한 손해만 보상되며, 단독 사고는 보상되지 않습니다.</p>
//       <p>1사고당 보험가액 한도(최고 3천만원, 자기부담금 50만원)</p>
//     `,
//   },
// };

const Step0105 = () => {
  const dispatch = useDispatch();

  // 리덕스 스토어에서 보험 기간을 가져옴
  const insurancePeriod = useSelector((state) => state.gift.insurancePeriod);
  const [insurancePlans, setInsurancePlans] = useState({});
  const [selectedPlan, setSelectedPlan] = useState("종합형");
  const [displayedPrice, setDisplayedPrice] = useState(0); // 표시되는 가격
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();

  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/my-gift/insurance-products/type/INS0101"
        );
        const data = response.data;

        // 각 보험 상품에 해당하는 보장(Guarantee) 데이터 추가
        const updatedPlans = {
          종합형: {
            insuranceId: data.find((item) => item.insuranceId === "INS010101")
              ?.insuranceId,
            basePrice: data.find((item) => item.insuranceId === "INS010101")
              ?.basePrice,
            dailyIncrease: data.find((item) => item.insuranceId === "INS010101")
              ?.dailyIncrease,
            details: data
              .find((item) => item.insuranceId === "INS010101")
              ?.guarantees.map((guarantee) => ({
                label: guarantee.guaranteeType,
                price: guarantee.guaranteeFee
                  ? `${guarantee.guaranteeFee.toLocaleString()}원`
                  : "무한",
                content: guarantee.guaranteeContent,
              })),
          },
          기본형: {
            insuranceId: data.find((item) => item.insuranceId === "INS010102")
              ?.insuranceId,
            basePrice: data.find((item) => item.insuranceId === "INS010102")
              ?.basePrice,
            dailyIncrease: data.find((item) => item.insuranceId === "INS010102")
              ?.dailyIncrease,
            details: data
              .find((item) => item.insuranceId === "INS010102")
              ?.guarantees.map((guarantee) => ({
                label: guarantee.guaranteeType,
                price: guarantee.guaranteeFee
                  ? `${guarantee.guaranteeFee.toLocaleString()}원`
                  : "무한",
                content: guarantee.guaranteeContent,
              })),
          },
          최소형: {
            insuranceId: data.find((item) => item.insuranceId === "INS010103")
              ?.insuranceId,
            basePrice: data.find((item) => item.insuranceId === "INS010103")
              ?.basePrice,
            dailyIncrease: data.find((item) => item.insuranceId === "INS010103")
              ?.dailyIncrease,
            details: data
              .find((item) => item.insuranceId === "INS010103")
              ?.guarantees.map((guarantee) => ({
                label: guarantee.guaranteeType,
                price: guarantee.guaranteeFee
                  ? `${guarantee.guaranteeFee.toLocaleString()}원`
                  : "무한",
                content: guarantee.guaranteeContent,
              })),
          },
          차량손해보장형: {
            insuranceId: data.find((item) => item.insuranceId === "INS010104")
              ?.insuranceId,
            basePrice: data.find((item) => item.insuranceId === "INS010104")
              ?.basePrice,
            dailyIncrease: data.find((item) => item.insuranceId === "INS010104")
              ?.dailyIncrease,
            details: data
              .find((item) => item.insuranceId === "INS010104")
              ?.guarantees.map((guarantee) => ({
                label: guarantee.guaranteeType,
                price: guarantee.guaranteeFee
                  ? `${guarantee.guaranteeFee.toLocaleString()}원`
                  : "무한",
                content: guarantee.guaranteeContent,
              })),
          },
        };

        setInsurancePlans(updatedPlans); // 플랜 업데이트
      } catch (error) {
        console.error("데이터를 불러오는 중 에러가 발생했습니다.", error);
      }
    };

    fetchInsuranceData();
  }, []);

  useEffect(() => {
    if (insurancePlans[selectedPlan]) {
      const plan = insurancePlans[selectedPlan];
      const targetPrice =
        plan.basePrice + (insurancePeriod - 1) * plan.dailyIncrease;
      setDisplayedPrice(targetPrice);

      // 카운트업 애니메이션
      let start = 0;
      const duration = 1000; // 1초 동안 카운트업
      const increment = targetPrice / (duration / 10); // 10ms마다 값 증가

      const interval = setInterval(() => {
        start += increment;
        if (start >= targetPrice) {
          setDisplayedPrice(targetPrice);
          clearInterval(interval); // 목표 가격에 도달하면 인터벌 종료
        } else {
          setDisplayedPrice(Math.floor(start));
        }
      }, 10);

      return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 제거
    }
  }, [selectedPlan, insurancePeriod, insurancePlans]);

  const handlePlanClick = (plan) => {
    setSelectedPlan(plan);
  };

  const handleGiftClick = () => {
    const plan = insurancePlans[selectedPlan];
    const totalPremium =
      plan.basePrice + (insurancePeriod - 1) * plan.dailyIncrease;

    // Redux로 상태 저장
    dispatch(setTotalPremium(totalPremium));
    dispatch(setProductType(selectedPlan));
    dispatch(setCoverageDetails(plan.details));
    dispatch(setInsuranceId(plan.insuranceId));
    console.log(
      `총 보험료: ${totalPremium}, 선택한 플랜: ${selectedPlan}, 보험ID: ${plan.insuranceId}`
    );
  };

  return (
    <div className="MyIns overflow-auto min-h-screen">
      <Header2 /> {/* Header 추가 */}
      <h1 className="text-center text-[15px] mt-7">선물하기 정보 입력 </h1>
      <div className="flex mt-6 mb-[30px] w-[700px] h-[50px] items-center">
        <span className={`w-4 h-4 rounded-full bg-pink-500`}></span>
        <span className={`w-4 h-4 rounded-full bg-pink-500  mx-2`}></span>
        <span
          className={`w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500`}
        ></span>
        <span className={`w-4 h-4 rounded-full mx-2 bg-gray-300`}></span>
      </div>
      <div className="w-[650px] mx-auto">
        <h1 className="text-center text-[30px] font-bold mb-4">
          상품 유형 선택
        </h1>

        {/* 보험 플랜 선택 탭 */}
        <div className="flex justify-between mb-4">
          {["종합형", "기본형", "최소형", "차량손해보장형"].map((plan) => (
            <button
              key={plan}
              className={`w-full text-center py-4 ${
                selectedPlan === plan
                  ? "bg-pink-400 text-white"
                  : "bg-slate-300"
              }`}
              onClick={() => handlePlanClick(plan)}
            >
              {plan}
            </button>
          ))}
        </div>

        <h2 className="text-lg font-bold mb-4 flex justify-between">
          <span>총 보험료</span>
          <p>{displayedPrice.toLocaleString()}원</p>
        </h2>

        {/* 보험 플랜 내용 표시 */}
        <div className="bg-white p-4 rounded-lg shadow-md h-[380px]">
          <ul className="mb-4">
            <div className="flex items-center mb-2 ">
              <span className="text-[17px] font-bold">보장 확인</span>
              <Tooltip label="보장 확인" aria-label="필요서류 설명">
                <IconButton
                  aria-label="도움말"
                  icon={<FaQuestionCircle />}
                  variant="link"
                  color="gray.400"
                  onClick={onModalOpen}
                />
              </Tooltip>
            </div>

            {/* 데이터가 로드되었는지 확인하고 렌더링 */}
            {insurancePlans[selectedPlan] &&
            insurancePlans[selectedPlan].details ? (
              <div className="flex flex-col space-y-2">
                {insurancePlans[selectedPlan].details.map((detail, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{detail.label}</span>
                    <span className="text-gray-600 font-semibold">
                      {detail.price || "-"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>보장 내용을 불러오는 중입니다...</div> // 데이터가 없을 때 표시할 메시지
            )}
          </ul>
        </div>

        <div className="w-full flex justify-center">
          <Link to="/InsGift/giveGift/Step0106">
            <button
              className="w-[180px] bg-pink-400 text-white py-3 rounded-lg font-bold hover:bg-pink-500 mt-4 mb-8"
              onClick={handleGiftClick} // 선물하기 버튼 클릭 시 실행
            >
              선물하기
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Step0105;

{
  /* 태그 표시 */
}
{
  /* <div className="flex space-x-2">
              {insurancePlans[selectedPlan].tags.map((tag, index) => (
                <Tag
                  key={index}
                  colorScheme="trans"
                  backgroundColor="pink.300"
                  textColor="white"
                  className="mb-3"
                  borderWidth="1px"
                  borderRadius="20px"
                >
                  {tag}
                </Tag>
              ))}
            </div> */
}

{
  /* 모달 */
}
{
  /* <Modal isOpen={isModalOpen} onClose={onModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedPlan} 설명</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{insurancePlans[selectedPlan].modalContent}</ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onModalClose}>
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */
}
