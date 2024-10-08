// src/components/MyInsRec/InsRecResult.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { Divider, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { insuranceIcons } from "../data"; // data.js 파일 경로에 맞게 조정

const InsRecResult = () => {
  const [recommendations, setRecommendations] = useState({
    custom: [], // 맞춤 추천
    ai: [], // AI 추천
    popular: [], // 인기도 추천
    insCompany: [], // 보험사 추천
  });
  const user = useSelector((state) => state.user.userInfo);
  const memberId = user.id;

  const handleSaveRecommendations = async () => {
    const saveData = {
      memberId: memberId,
      recommendations: [
        ...recommendations.ai.map((item) => ({
          insuranceId: item.insuranceId,
          description: item.description,
          recommendationType: "AI 추천", // AI 추천
        })),
        ...recommendations.popular.map((item) => ({
          insuranceId: item.insuranceId,
          description: item.description,
          recommendationType: "인기도 추천", // 인기도 추천
        })),
        ...recommendations.insCompany.map((item) => ({
          insuranceId: item.insuranceId,
          description: item.description,
          recommendationType: "보험사 추천", // 보험사 추천
        })),
      ],
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/my-ins-Rec/save-recommendations",
        saveData
      );
      console.log("추천 저장 성공:", response.data);
    } catch (error) {
      console.error("추천 저장 실패:", error);
    }
  };
  const [isLoading, setIsLoading] = useState(true);

  // 백엔드에서 카테고리별로 데이터를 받아오는 함수
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/my-ins-Rec/get-recommendations?userId=${user.id}`
        );

        // 상태 업데이트
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user.id]);

  // Styling for productType (which is equivalent to level)
  const getLevelStyle = (productType) => {
    switch (productType) {
      case "최소형":
      case "3.0.5 ":
        return "bg-blue-100 text-blue-800";
      case "Grade1":
        return "bg-green-100 text-green-800";
      case "3.0.0 중간단계의 Basic":
      case "기본형":
        return "bg-yellow-100 text-yellow-800";
      case "노멀형":
        return "bg-purple-100 text-purple-800";
      case "Grade2":
      case "Grade3":
        return "bg-orange-100 text-orange-800";
      case "Premium":
      case "프리미엄형":
      case "Grade4":
      case "3.2.5":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const LoadingPage = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="loader border-t-4 border-b-4 border-green-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
        <p>로딩 중입니다. 잠시만 기다려주세요...</p>
      </div>
    </div>
  );

  // 아이콘을 가져오는 헬퍼 함수
  const getIcon = (item) => {
    if (insuranceIcons.insuranceName[item.insuranceName]) {
      return insuranceIcons.insuranceName[item.insuranceName];
    }
    if (insuranceIcons.insuranceCategory[item.insuranceCategory]) {
      return insuranceIcons.insuranceCategory[item.insuranceCategory];
    }
    if (insuranceIcons.productType[item.productType]) {
      return insuranceIcons.productType[item.productType];
    }
    return "/defaultIcon.png"; // 기본 아이콘 경로
  };

  // 짤막한 설명을 가져오는 헬퍼 함수
  const getShortDescription = (insuranceName) => {
    return insuranceIcons.shortDescription[insuranceName] || insuranceName;
  };

  return (
    <div className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="recResult w-3/4 mx-auto my-16">
          {/* AI 추천 */}
          <h2 className="text-3xl font-bold text-[#43b1a2] mb-6">AI 추천</h2>
          <p className="text-gray-700 mb-4">
            당신의 리뷰로 남긴 보험 이용 내역을 딥러닝으로 분석하여 최적의 보험
            상품을 추천해드립니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {recommendations.ai.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                {/* 상단 - 보험 이름과 가격 */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.insuranceName}
                  </h3>
                  <p className="text-l font-bold text-lime-300">
                    {item.productType}
                  </p>
                </div>
                <Divider />
                {/* 설명 */}
                <p className="text-gray-500 mb-4">{item.description}</p>

                {/* 아이콘 그룹 */}
                <div className="flex justify-around mb-4">
                  {/* insuranceName 아이콘 및 shortDescription */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.insuranceName[item.insuranceName] ||
                        "/defaultIcon.png"
                      }
                      alt={item.insuranceName}
                      className="w-10 h-10 mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {getShortDescription(item.insuranceName)}
                    </span>
                  </div>

                  {/* insuranceCategory 아이콘 및 카테고리 이름 */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.insuranceCategory[
                          item.insuranceCategory
                        ] || "/defaultIcon.png"
                      }
                      alt={item.insuranceCategory}
                      className="w-10 h-10 mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {item.insuranceCategory}
                    </span>
                  </div>

                  {/* productType 아이콘 */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.productType[item.productType] ||
                        "/defaultIcon.png"
                      }
                      alt={item.productType}
                      className="w-10 h-10 mb-1"
                    />
                    <span
                      className={`text-sm ${getLevelStyle(item.productType)}`}
                    >
                      {item.productType}
                    </span>
                  </div>
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
          <h2 className="text-3xl font-bold text-[#43b1a2] mb-6">
            인기도 추천
          </h2>
          {/* 짤막한 설명 추가 */}
          <p className="text-gray-700 mb-4">
            당신의 서베이 응답을 기반으로 맞춤형 보험 상품을 추천해드립니다.
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

                {/* 아이콘 그룹 */}
                <div className="flex justify-around mb-4">
                  {/* insuranceName 아이콘 및 shortDescription */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.insuranceName[item.insuranceName] ||
                        "/defaultIcon.png"
                      }
                      alt={item.insuranceName}
                      className="w-10 h-10 mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {getShortDescription(item.insuranceName)}
                    </span>
                  </div>

                  {/* insuranceCategory 아이콘 및 카테고리 이름 */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.insuranceCategory[
                          item.insuranceCategory
                        ] || "/defaultIcon.png"
                      }
                      alt={item.insuranceCategory}
                      className="w-10 h-10 mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {item.insuranceCategory}
                    </span>
                  </div>

                  {/* productType 아이콘 */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.productType[item.productType] ||
                        "/defaultIcon.png"
                      }
                      alt={item.productType}
                      className="w-10 h-10 mb-1"
                    />
                    <span
                      className={`text-sm ${getLevelStyle(item.productType)}`}
                    >
                      {item.productType}
                    </span>
                  </div>
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
          <h2 className="text-3xl font-bold text-[#43b1a2] mb-6">
            보험사 추천
          </h2>
          {/* 짤막한 설명 추가 */}
          <p className="text-gray-700 mb-4">
            당신의 서베이 응답을 기반으로 맞춤형 보험 상품을 추천해드립니다.
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
                  <p className="text-l font-bold text-cyan-300">
                    {item.productType}
                  </p>
                </div>
                <Divider />
                {/* 설명 */}
                <p className="text-gray-500 mb-4">{item.description}</p>

                {/* 아이콘 그룹 */}
                <div className="flex justify-around mb-4">
                  {/* insuranceName 아이콘 및 shortDescription */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.insuranceName[item.insuranceName] ||
                        "/defaultIcon.png"
                      }
                      alt={item.insuranceName}
                      className="w-10 h-10 mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {getShortDescription(item.insuranceName)}
                    </span>
                  </div>

                  {/* insuranceCategory 아이콘 및 카테고리 이름 */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.insuranceCategory[
                          item.insuranceCategory
                        ] || "/defaultIcon.png"
                      }
                      alt={item.insuranceCategory}
                      className="w-10 h-10 mb-1"
                    />
                    <span className="text-sm text-gray-600">
                      {item.insuranceCategory}
                    </span>
                  </div>

                  {/* productType 아이콘 */}
                  <div className="flex flex-col items-center">
                    <img
                      src={
                        insuranceIcons.productType[item.productType] ||
                        "/defaultIcon.png"
                      }
                      alt={item.productType}
                      className="w-10 h-10 mb-1"
                    />
                    <span
                      className={`text-sm ${getLevelStyle(item.productType)}`}
                    >
                      {item.productType}
                    </span>
                  </div>
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
      )}

      <div className="flex gap-5">
        <button
          onClick={handleSaveRecommendations}
          className="bg-[#54d2c4] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#43b1a2] transition-colors duration-300 mb-10"
        >
          추천 저장
        </button>
        <Link to="/MyInsRec/Choice">
          <button className="bg-[#54d2c4] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#43b1a2] transition-colors duration-300 mb-10">
            다시 하기
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default InsRecResult;
