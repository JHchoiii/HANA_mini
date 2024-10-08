import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // framer-motion import
import Header2 from "../../Header2";
import Footer from "../../footer";

// framer-motion의 motion을 사용하여 Link를 확장한 MotionLink 생성
const MotionLink = motion(Link);

const MyInsRec = () => {
  return (
    <div className="bg-[#f2f6f5]">
      <div className="MyIns flex flex-col justify-between min-h-screen relative">
        <Header2 />

        {/* 애니메이션 배경 이미지 */}
        <motion.img
          src="/rainbow_BG.jpg"
          className="absolute z-0 mt-20"
          initial={{ width: "150%", height: "150%" }}
          animate={{ width: "1000px", height: "500px" }}
          transition={{ delay: 0.2, duration: 1.5 }} // 0.2초 대기 후 2초 동안 애니메이션
          style={{
            objectFit: "cover",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "30px",
          }}
        />

        {/* 메인 콘텐츠 */}
        <div className="flex-grow flex flex-col justify-center items-center text-center z-10">
          {/* 텍스트 콘텐츠 */}
          <div className="mb-10">
            {/* h1 태그 애니메이션 */}
            <motion.h1
              className="text-[40px] font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }} // 배경 애니메이션 완료 후 2.2초 대기 후 1초 동안 페이드 인
            >
              보험에 대한 모든 고정관념을 버리세요
            </motion.h1>
            {/* p 태그 애니메이션 */}
            <motion.p
              className="text-3xl text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.7, duration: 1 }} // h1 애니메이션 완료 후 0.5초 대기 후 1초 동안 페이드 인
            >
              빠르고 간편한 보험 추천 서비스
            </motion.p>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col items-center absolute bottom-44 z-10">
          <motion.div className="flex space-x-4 mt-6">
            {/* 첫 번째 버튼 애니메이션 */}
            <MotionLink
              to="/MyInsRec/CheckInfo"
              className="text-white py-3 px-6 rounded-md shadow-lg transition-all duration-300"
              style={{
                boxShadow: "0 4px 8px rgba(72, 178, 165, 0.5)",
                backgroundColor: "#54d2c4", // 초기 배경색 설정
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.2, duration: 1 }}
              whileHover={{
                backgroundColor: "#3fb1aa", // 호버 시 배경색 변경
                transition: { duration: 0.3 },
              }}
            >
              미니 보험 추천
            </MotionLink>

            {/* 두 번째 버튼 애니메이션 */}
            <MotionLink
              to="/MyInsRec/InsRecChainProd"
              className="text-white py-3 px-6 rounded-md shadow-lg transition-all duration-300"
              style={{
                boxShadow: "0 4px 8px rgba(72, 178, 165, 0.5)",
                backgroundColor: "#54d2c4", // 초기 배경색 설정
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.7, duration: 1 }}
              whileHover={{
                backgroundColor: "#3fb1aa", // 호버 시 배경색 변경
                transition: { duration: 0.3 },
              }}
            >
              미니 보험 연계
            </MotionLink>
          </motion.div>
        </div>
      </div>
      <div className="mb-20" />
      <Footer />
    </div>
  );
};

export default MyInsRec;
