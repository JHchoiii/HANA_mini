import React, { useState } from "react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import "../../../css/Custom.css";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; // useNavigate 훅 import
import { useToast } from "@chakra-ui/react"; // useToast 훅 import
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react"; // Import Popover components

// Reusable InfoPopover component
const InfoPopover = ({ title, body }) => (
  <Popover className="">
    <PopoverTrigger>
      <img
        src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
        alt="Info"
        className="ml-1 cursor-pointer mr-2 mt-[15px]"
        style={{ width: "16px", height: "16px" }}
      />
    </PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader fontSize="sm" fontWeight="bold">
        {title}
      </PopoverHeader>
      <PopoverBody fontSize="xs">{body}</PopoverBody>
    </PopoverContent>
  </Popover>
);

const questions = [
  {
    id: 1,
    image:
      "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance/insurance_car_icon08.png",
    question: (
      <>
        <p className="text-[30px] mb-2">
          선물 받는 분이 <br />
          <span className="font-bold">운전면허증</span>을<br />
          보유하고 계신가요?
        </p>
      </>
    ),
    subText: "※운전면허증이 있어야 보험가입이 가능합니다.",
  },
  {
    id: 2,
    image:
      "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance/insurance_car_icon09.png",
    question: (
      <>
        <p className="text-[30px] mb-2">
          빌려주는 차량이 <br />
          <span className="font-bold">의무보험에 가입된</span> <br />
          차량인가요?
        </p>
      </>
    ),
    subText: (
      <>
        ※의무보험은 상대방의 인적(대인배상Ⅰ), 물적(대물배상) 손해를 보상하기
        위해
        <br />
        자동차보험 가입시 의무적으로 가입해야 하는 보험입니다.
      </>
    ),
  },
  {
    id: 3,
    image:
      "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance/insurance_car_icon10.png",
    question: (
      <>
        <p className="text-[30px] mb-2">
          빌려주는 차량이 <br />
          <span className="font-bold">본인 소유의</span> <br />
          차량인가요?
        </p>
      </>
    ),
    subText: (
      <>
        ※본인소유차량이 아닌 경우 보험사고 발생시 <br />
        보상받지 못할 수 있습니다{" "}
      </>
    ),
  },
  {
    id: 4,
    image:
      "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance/insurance_car_icon11.png",
    question: (
      <>
        <p className="text-[30px] mb-2">
          빌려주는 차량이 <br />
          <span className="font-bold">
            승용차(10인승 이하), <br />
            승합차(16인승 이하), <br />
            화물차(1톤 이하),
          </span>{" "}
          <br />
          또는 <span className="font-bold">장기렌터가</span>인가요?
        </p>
      </>
    ),
    subText: "",
  },
  {
    id: 5,
    image:
      "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance/insurance_car_icon12.png",
    question: (
      <>
        <p className="text-[30px] mb-2">
          빌려주는 차량이 <br />
          <span className="font-bold">
            임직원 운전자 한정운전 특별약관
          </span>{" "}
          <br />에 가입한 차량인가요?
        </p>
      </>
    ),
    subText:
      "본인소유차량이 아닌 경우 보험사고 발생시 보상받지 못할 수 있습니다.",
  },
  {
    id: 6,
    image:
      "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance/insurance_car_icon10.png",
    question: (
      <>
        <p className="text-[30px] mb-2">
          빌려주는 차량이 <br />
          <span className="flex font-bold justify-center">
            <InfoPopover
              title="차대차사고 정보"
              body="※차대차사고는 차량간의 사고로 타차량의 차량번호 및 운전자의 신분등이 확인되는 경우에 한합니다."
            />
            차대차사고만 보상이 가능
          </span>
          <span className="flex font-bold">
            <span className="font-medium mr-2">그 외 </span>{" "}
            <InfoPopover
              title="단독사고 정보"
              body="단독사고는 보행인, 시설물 등을 충격한 사고로 빌려주는 차량만 보상되지 않으며 피해물은 보상합니다."
            />
            단독사고는 보상하지
          </span>
          <span className="font-bold">않는것에</span> 동의하시나요?
        </p>
      </>
    ),
    subText: "",
  },
];

const Step0103 = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate(); // useNavigate 훅 사용
  const toast = useToast(); // useToast 훅 사용

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      // 마지막 질문이라면 Step0104로 이동
      navigate("/InsGift/giveGift/Step0104");
    }
  };

  const handlePrevious = () => {
    // 아니오 버튼 클릭 시 토스트 메시지 표시
    toast({
      title: "아니오 선택시 불가합니다",
      status: "warning",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <h1 className="text-center text-[15px] mt-7">선물하기 정보 입력 </h1>
      <div className="mt-2 my-[100px]">
        <div className="flex mt-4 mb-[75px] w-[700px] h-[50px] items-center">
          <span className={`w-4 h-4 rounded-full bg-pink-500`}></span>
          <span className={`w-4 h-4 rounded-full bg-pink-500  mx-2`}></span>

          <span
            className={`w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500`}
          ></span>
          <span className={`w-4 h-4 rounded-full mx-2 bg-gray-300`}></span>
        </div>
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center items-center text-center h-[300px] w-[500px]"
            >
              <img
                src={questions[currentQuestionIndex].image}
                alt="Icon"
                className="mx-auto mb-4 w-[70px] -[70px]"
              />
              <h2>{questions[currentQuestionIndex].question}</h2>
              <p className="text-sm text-gray-500 my-3">
                {questions[currentQuestionIndex].subText}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex mt-[50px] w-[500px] justify-center">
            {questions.map((_, index) => (
              <span
                key={index}
                className={`w-[90px] h-1 mx-1 ${
                  index === currentQuestionIndex ? "bg-pink-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-[70px]">
          <button
            className="bg-gray-600 text-white font-bold py-3 px-8 rounded-[10px] hover:bg-gray-800 w-[150px]"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            아니요
          </button>
          <button
            className="bg-pink-400 text-white font-bold py-3 px-8 rounded-[10px] hover:bg-pink-600 w-[150px]"
            onClick={handleNext}
          >
            {currentQuestionIndex === questions.length - 1 ? "다음" : "예"}
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Step0103;
