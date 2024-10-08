import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import axios from "axios";
import { useSelector } from "react-redux";

const InsRecChainProdResult = () => {
  const [insuranceData, setInsuranceData] = useState([]); // 보험 데이터를 담는 상태
  const [benefitsData, setBenefitsData] = useState([]); // 혜택 데이터를 담는 상태
  const user = useSelector((state) => state.user.userInfo);

  useEffect(() => {
    // 사용자 보험 내역 요청
    axios
      .get(
        `http://localhost:8080/api/user/my-ins/my-insurances?memberId=${user.id}`
      )
      .then((response) => {
        setInsuranceData(response.data); // 받아온 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching insurance data:", error);
      });

    // 사용자 혜택 내역 요청
    axios
      .get(`http://localhost:8080/api/user/my-ins-Rec/${user.id}/benefits`)
      .then((response) => {
        setBenefitsData(response.data); // 받아온 혜택 데이터를 상태에 저장
      })
      .catch((error) => {
        console.error("Error fetching benefits data:", error);
      });
  }, [user.id]);

  // 보험 상태에 따른 표시되는 텍스트 및 스타일링
  const getStatusText = (status) => {
    switch (status) {
      case "등록":
        return <span className="text-red-500 font-semibold">등록</span>;
      case "미등록":
        return <span className="text-gray-400 font-semibold">미등록</span>;
      case "만기":
        return <span className="text-red-500 font-semibold">만기</span>;
      default:
        return <span className="text-gray-400 font-semibold">N/A</span>;
    }
  };

  return (
    <div className="MyIns flex flex-col justify-between min-h-screen bg-gray-50">
      <Header2 />
      {/* 메인 컨텐츠 시작 */}
      <motion.div
        className="flex-grow flex flex-col justify-center items-center text-center py-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-6xl flex flex-col md:flex-row justify-between items-start p-4 md:p-8 space-y-8 md:space-y-0">
          {/* 왼쪽 영역 - 보험 제품들 */}
          <div className="flex flex-col text-left w-full md:w-1/2">
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {user.name}님의 상품이력
            </h1>
            {/* 추가 설명 텍스트 (필요 시 주석 해제) */}
            {/* <p className="text-xl text-gray-600 mb-4">
              Upgrade your insurance for wider coverage and more benefits!
            </p> */}
          </div>

          {/* 오른쪽 영역 - 사용자 보험 내역 */}
          <div className="flex flex-col w-full md:w-1/2">
            <div className="overflow-y-auto w-500px max-h-80 p-2 bg-white rounded-lg shadow-md">
              <div className="flex flex-col space-y-4">
                {insuranceData.length > 0 ? (
                  insuranceData.map((insurance, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-white rounded-lg shadow-sm space-x-4"
                    >
                      <img
                        src="/path/to/insurance-icon.png" // 보험 아이콘 이미지 경로
                        alt="insurance icon"
                        className="w-12 h-12 object-cover"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-semibold text-gray-700">
                          {insurance.productName}
                        </h3>
                        <p className="text-gray-500">
                          기간: {insurance.insurancePeriod}
                        </p>
                        <p className="text-gray-500">
                          상태: {getStatusText(insurance.status)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No insurance data available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 혜택 영역 */}
      <div className="bg-gray-100 py-12">
        <h2 className="text-center text-4xl font-bold mb-8 text-gray-800">
          연계 시 혜택이 있는 장기 보험
        </h2>
        <div className="container mx-auto px-4">
          {benefitsData.length > 0 ? (
            benefitsData.map((benefit, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col"
              >
                <h3 className="text-2xl font-semibold mb-2 text-blue-600">
                  {benefit.benefitType}
                </h3>
                <p className="text-gray-600 mb-4">
                  {benefit.benefitContent}
                  {benefit.benefitValue
                    ? ` - ${benefit.benefitValue}${
                        benefit.benefitType === "할인" ? "%" : ""
                      }`
                    : ""}
                </p>

                {/* 기여한 단기 보험 표시 */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-700">
                    기여한 단기 보험:
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {benefit.contributingInsurances.map((item, idx) => (
                      <li key={idx}>
                        {item.insuranceName} ({item.count}회)
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 연계된 장기 보험 표시 */}
                <div>
                  <h4 className="font-semibold text-gray-700">
                    연계된 장기 보험:
                  </h4>
                  <p className="text-gray-600">
                    {benefit.longTermInsurance.insuranceName} -{" "}
                    {benefit.longTermInsurance.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">
              No benefits available at the moment.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InsRecChainProdResult;
