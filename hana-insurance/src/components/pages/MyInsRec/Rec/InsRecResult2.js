// InsRecResult2.jsx
import React from "react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { Divider, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";

const InsRecResult2 = () => {
  const location = useLocation();
  const recommendations = location.state?.recommendations || {
    custom: [],
    popular: [],
    insCompany: [],
  };
  const user = useSelector((state) => state.user.userInfo);
  const memberId = user.id;

  const handleSaveRecommendations = async () => {
    const saveData = {
      memberId: memberId,
      recommendations: [
        ...recommendations.custom.map((item) => ({
          insuranceId: item.insuranceId,
          description: item.description,
          recommendationType: "맞춤 추천",
        })),
        ...recommendations.popular.map((item) => ({
          insuranceId: item.insuranceId,
          description: item.description,
          recommendationType: "인기도 추천",
        })),
        ...recommendations.insCompany.map((item) => ({
          insuranceId: item.insuranceId,
          description: item.description,
          recommendationType: "보험사 추천",
        })),
      ],
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/my-ins-Rec/save-recommendations",
        saveData
      );
      console.log("추천 저장 성공:", response.data);
      alert("추천이 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("추천 저장 실패:", error);
      alert("추천 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // productType에 따른 스타일링 함수
  const getLevelStyle = (productType) => {
    switch (productType) {
      case "Premium":
        return "bg-yellow-500 text-white";
      case "Normal":
        return "bg-blue-500 text-white";
      case "Basic":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <div className="MyIns flex flex-col justify-between min-h-screen bg-gray-50">
      <Header2 />
      <div className="recResult w-3/4 mx-auto my-16">
        {/* 서베이 기반 추천 */}
        <h2 className="text-3xl font-bold text-[#54d2c4] mb-6">
          서베이 기반 추천
        </h2>
        {/* 짤막한 설명 추가 */}
        <p className="text-gray-700 mb-4">
          당신의 서베이 응답을 기반으로 맞춤형 보험 상품을 추천해드립니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 ">
          {recommendations.custom.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {/* 상단 - 보험 이름과 가격 */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.insuranceName}
                </h3>
                <p className="text-l font-bold text-lime-300	">
                  {item.productType}
                </p>
              </div>
              <Divider />
              {/* 설명 */}
              <p className="text-gray-500 mb-4">{item.description}</p>

              {/* 아이콘 그룹 (예시로 아이콘 추가) */}
              <div className="flex justify-between mb-4">
                {/* 아이콘 예시 */}
                <div className="flex flex-col items-center">
                  <img
                    src="path-to-icon1"
                    alt="뇌혈관"
                    className="w-8 h-8 mb-1"
                  />
                  <span className="text-sm text-gray-600">뇌혈관</span>
                </div>

                {/* 추가 아이콘 */}
                {/* ... */}
              </div>
              <Divider />
              {/* 자세히 보기 버튼 */}
              <div className="text-center">
                <Button
                  variant="link"
                  rightIcon={<ChevronRightIcon />}
                  colorScheme="teal"
                >
                  자세히 보기
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 인기도 추천 */}
        <h2 className="text-3xl font-bold text-[#43b1a2] mb-6">인기도 추천</h2>
        {/* 짤막한 설명 추가 */}
        <p className="text-gray-700 mb-4">
          현재 해당 카테고리에서 가장 인기 있는 보험 상품입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {recommendations.popular.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {/* 상단 - 보험 이름과 가격 */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.insuranceName}
                </h3>
                <p className="text-l font-bold text-red-300">
                  {item.productType}
                </p>
              </div>
              <Divider />
              {/* 설명 */}
              <p className="text-gray-500 mb-4">{item.description}</p>

              {/* 아이콘 그룹 (예시로 아이콘 추가) */}
              <div className="flex justify-between mb-4">
                {/* 아이콘 예시 */}
                <div className="flex flex-col items-center">
                  <img
                    src="path-to-icon1"
                    alt="뇌혈관"
                    className="w-8 h-8 mb-1"
                  />
                  <span className="text-sm text-gray-600">뇌혈관</span>
                </div>
                {/* 추가 아이콘 */}
                {/* ... */}
              </div>
              <Divider />
              {/* 자세히 보기 버튼 */}
              <div className="text-center">
                <Button
                  variant="link"
                  rightIcon={<ChevronRightIcon />}
                  colorScheme="teal"
                >
                  자세히 보기
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* 보험사 추천 */}
        <h2 className="text-3xl font-bold text-[#43b1a2] mb-6">보험사 추천</h2>
        {/* 짤막한 설명 추가 */}
        <p className="text-gray-700 mb-4">
          보험사에서 추천하는 인기 보험 상품입니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {recommendations.insCompany.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {/* 상단 - 보험 이름과 가격 */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-800">
                  {item.insuranceName}
                </h3>
                <p className="text-l font-bold text-cyan-300	">
                  {item.productType}
                </p>
              </div>
              <Divider />
              {/* 설명 */}
              <p className="text-gray-500 mb-4">{item.description}</p>

              {/* 아이콘 그룹 (예시로 아이콘 추가) */}
              <div className="flex justify-between mb-4">
                {/* 아이콘 예시 */}
                <div className="flex flex-col items-center">
                  <img
                    src="path-to-icon1"
                    alt="뇌혈관"
                    className="w-8 h-8 mb-1"
                  />
                  <span className="text-sm text-gray-600">뇌혈관</span>
                </div>
                {/* 추가 아이콘 */}
                {/* ... */}
              </div>
              <Divider />
              {/* 자세히 보기 버튼 */}
              <div className="text-center">
                <Button
                  variant="link"
                  rightIcon={<ChevronRightIcon />}
                  colorScheme="teal"
                >
                  자세히 보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center mb-10">
        <button
          onClick={handleSaveRecommendations}
          className="bg-[#54d2c4] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#43b1a2] transition-colors duration-300"
        >
          추천 저장
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default InsRecResult2;
