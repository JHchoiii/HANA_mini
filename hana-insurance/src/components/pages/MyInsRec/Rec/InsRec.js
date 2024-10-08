import React, { useState, useRef } from "react";
import Header2 from "../../../Header2";
import { Button, Box, IconButton, CircularProgress } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../../footer";
import HorizontalStepper from "./HorizontalStepper";
import SlideContent from "./SlideContent";
import SlideContent2 from "./SlideContent2";
import SlideContent1 from "./SlideContent"; // 새로운 질문 컴포넌트 import
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios로 Spring Boot에 요청
import { useDispatch, useSelector } from "react-redux"; //

import "swiper/swiper-bundle.css";
import "../../../css/MyIns.css";

const steps = ["", "", "", "", ""];

const InsRec = () => {
  const user = useSelector((state) => state.user.userInfo);

  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]); // 답변을 저장할 상태 변수
  const swiperRef = useRef(null);
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수 사용

  const handleNext = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      if (swiperRef.current && currentStep < steps.length - 1) {
        swiperRef.current.swiper.slideNext();
      } else if (currentStep === steps.length - 1) {
        try {
          // Spring Boot 서버로 POST 요청, answers는 사용자 응답이 저장된 배열
          console.log(answers);
          const response = await axios.post(
            "http://localhost:8080/api/user/my-ins-Rec/get-recommendations-cos",
            { answers } // answers는 객체 안에 들어감
          );

          const recommendations = response.data; // 추천 결과를 받아옴
          // 결과 페이지로 이동하며 추천 결과 전달
          navigate("/MyInsRec/InsRecResult2", { state: { recommendations } });
        } catch (error) {
          console.error("Error sending answers:", error);
        }
      }
    }, 500);
  };

  const handleBack = () => {
    if (swiperRef.current && currentStep > 0) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleAnswer = (answerIndex) => {
    const newAnswers = [...answers];
    if (currentStep > 0) {
      // 첫 번째 질문은 제외하고 나머지만 저장
      newAnswers[currentStep - 1] = answerIndex + 1; // 첫 번째 질문 이후로 1-based index로 저장
    }
    setAnswers(newAnswers);
  };

  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 }}
        transition={{ duration: 0.3 }}
        style={{ position: "relative", minHeight: "calc(100vh - 70px)" }}
      >
        <div className="mt-[35px]"></div>
        <div className="flex justify-center w-full px-5">
          <HorizontalStepper steps={steps} currentStep={currentStep} />
        </div>
        <Swiper
          ref={swiperRef}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => setCurrentStep(swiper.activeIndex)}
          style={{ height: "550px", width: "60%", maxWidth: "1500px" }}
          speed={850}
          effect="fade"
          fadeEffect={{ crossFade: true }}
        >
          {/* 기존 SlideContent2 사용 */}
          <SwiperSlide key="step1">
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SlideContent2 />
            </Box>
          </SwiperSlide>

          {/* 추가 질문들 */}
          <SwiperSlide key="step2">
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SlideContent1
                question="보장 받을 보험 종류를 선택하세요"
                options={["질병/상해", "특수 부위", "건강 관리", "종합"]}
                onAnswer={(answerIndex) => handleAnswer(answerIndex)}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide key="step3">
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SlideContent1
                question="어느 정도 범위에서의 의료 서비스를 보장 받고 싶나요?"
                options={[
                  "제가 원하는 병에 대해서만",
                  "필요한 부분만",
                  "기본적인 보장 서비스",
                  "매우 다양한 서비스를 보장",
                ]}
                onAnswer={(answerIndex) => handleAnswer(answerIndex)}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide key="step4">
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SlideContent1
                question="평소에 건강관리는 어떻게 하시나요?"
                options={["내과", "3대 질병", "치과", "기타"]}
                onAnswer={(answerIndex) => handleAnswer(answerIndex)}
              />
            </Box>
          </SwiperSlide>
          <SwiperSlide key="step5">
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <SlideContent1
                question="원하는 보험 스타일은?"
                options={[
                  "최소한의 요금으로 필요한 보장만",
                  "무난무난한 기본적인 보장",
                  "많은 돈을 내더라도 많은 보장",
                ]}
                onAnswer={(answerIndex) => handleAnswer(answerIndex)}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
        {currentStep > 0 && (
          <IconButton
            onClick={handleBack}
            sx={{
              color: "#54d2c4",
              fontSize: "4rem",
              width: "64px",
              height: "64px",
              position: "absolute",
              bottom: "50%",
              left: "300px",
              zIndex: 10,
              background: "none",
              "&:hover": {
                background: "none",
              },
            }}
          >
            <ArrowBackIosIcon
              sx={{
                fontSize: "inherit",
                fontWeight: "900",
                color: "#54d2c4",
                "&:hover": {
                  color: "#43b1a2",
                },
              }}
            />
          </IconButton>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            position: "absolute",
          }}
        >
          <Button
            onClick={handleNext}
            sx={{
              backgroundColor:
                currentStep === steps.length - 1 ? "#54d2c4" : "#54d2c4",
              color: "#fff",
              width: "200px",
              height: "50px",
              borderRadius: "25px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              "&:hover": {
                backgroundColor:
                  currentStep === steps.length - 1 ? "#43b1a2" : "#43b1a2",
              },
            }}
          >
            {currentStep === steps.length - 1 ? "결과보기" : "Next"}
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "#fff",
                  position: "absolute",
                  right: "20px",
                }}
              />
            )}
          </Button>
        </Box>
      </motion.div>
      <div className="spacer my-[80px]"></div>
      <Footer />
    </div>
  );
};

export default InsRec;
