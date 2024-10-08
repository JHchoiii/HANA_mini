import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // framer-motion import
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import axios from "axios";
import { SlideButton } from "../../../StyledComponents";
import "animate.css";

const InsRecChainProd = () => {
  const [insuranceData, setInsuranceData] = useState([]); // 보험 데이터를 담는 상태

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/insurances")
      .then((response) => {
        setInsuranceData(response.data); // 받아온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching insurance data:", error);
      });
  }, []);

  return (
    <div className="bg-[#f2f6f5]">
      <div className="MyIns flex flex-col justify-between min-h-screen relative">
        <Header2 />
        {/* 메인 컨텐츠 시작 */}

        {/* 배경 이미지 */}
        <img
          src="/rainbow_BG.jpg"
          className="absolute z-0 mt-20 w-[1000px] h-[500px]"
          style={{
            objectFit: "cover",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "30px",
            pointerEvents: "none", // 이미지가 클릭을 차단하지 않도록 설정
          }}
          alt="Rainbow Background"
        />

        {/* 애니메이션 박스 */}
        <motion.div
          className="absolute z-0 mt-40"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.2, duration: 1.8, ease: [0.42, 0, 0.58, 1] }} // 이징 함수 변경
          style={{
            backgroundColor: "#D6F6F3",
            transformOrigin: "left", // 왼쪽부터 확장
            borderRadius: "30px",
            position: "absolute",
            width: "1000px", // 기존 크기 유지
            height: "500px", // 기존 크기 유지
            pointerEvents: "none", // 애니메이션 박스가 클릭을 차단하지 않도록 설정
            zIndex: 0, // 콘텐츠보다 뒤에 위치
          }}
        />

        {/* 메인 콘텐츠 */}
        <motion.div
          className="flex-grow flex flex-col justify-center items-center text-center z-10"
          initial={{ opacity: 0 }} // 처음에 투명하게 시작
          animate={{ opacity: 1 }} // 투명도가 1로 변화하면서 나타남
          transition={{ delay: 2, duration: 1.5 }} // 약간의 딜레이 후 1.5초 동안 천천히 나타남
        >
          {/* 상단 텍스트 */}
          <div className="mb-3">
            <h1 className="text-[40px] font-bold mb-4">
              장기 보험으로 더 넓은 보장을 받으세요
            </h1>
            <p className="text-3xl text-gray-600 mb-8">
              지금 가입한 미니 보험을 장기 보험으로 업그레이드 하세요!
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-4 animate__animated animate__fadeIn">
            <SlideButton
              to="/MyInsRec/InsRecChainProdResult"
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                borderRadius: "999px",
                top: "7px",
                width: "100px",
                height: "100px",
                backgroundColor: "#f2f6f5",
                color: "black",
                zIndex: 20,
              }}
              className="shadow"
            >
              연계 <br />
              확인하기
            </SlideButton>
          </div>

          {/* 추가적인 설명 섹션 */}
          <div className="flex flex-col items-center relative">
            <div className="mt-10 text-center">
              <p className="text-lg text-gray-600">
                미니 보험의 보장 범위가 한정되어 있나요? 장기 보험으로 전환하고,
                더 많은 혜택을 받아보세요.
              </p>
              <p className="text-lg text-gray-600 mt-2">
                장기 보험은 더 넓은 보장과 혜택을 제공하여 당신과 가족의 안전을
                더욱 튼튼하게 지켜드립니다.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mb-20" />

      <Footer />
    </div>
  );
};

export default InsRecChainProd;
