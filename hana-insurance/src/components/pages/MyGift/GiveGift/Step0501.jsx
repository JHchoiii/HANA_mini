import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import axios from "axios";

const Step0501 = () => {
  // 리덕스 상태 가져오기
  const insuranceId = useSelector((state) => state.gift.insuranceId); //  ID
  const memberId = useSelector((state) => state.user.userInfo.id);
  const totalPremium = useSelector((state) => state.gift.totalPremium);
  const productName = useSelector((state) => state.gift.productName);
  const vehicleNumber = useSelector((state) => state.gift.vehicleNumber);
  const insurancePeriod = useSelector((state) => state.gift.insurancePeriod);
  const contractHolder = useSelector((state) => state.user.userInfo.name);
  const insuredPerson = useSelector((state) => state.gift.giftPhoneNumbers[0]);
  const insuredPersonId = useSelector((state) => state.gift.insuredPersonId);
  const insuredPersonName = useSelector(
    (state) => state.gift.insuredPersonName
  );
  const productType = useSelector((state) => state.gift.subscriptionType);
  const coverageDetails = useSelector((state) => state.gift.coverageDetails);
  const giftPhoneNumbers = useSelector((state) => state.gift.giftPhoneNumbers);
  const birthDate = useSelector((state) => state.gift.birthDate);
  const isMember = useSelector((state) => state.gift.isMember);
  const usedPoint = useSelector((state) => state.gift.usedPoint);

  // 상태가 바뀔 때마다 모든 리덕스 상태를 콘솔에 출력
  useEffect(() => {
    console.log("Redux State:");
    console.log("memberId: ", memberId);
    console.log("insuranceID: ", insuranceId);
    console.log("Total Premium: ", totalPremium);
    console.log("Product Name: ", productName);
    console.log("Vehicle Number: ", vehicleNumber);
    console.log("Insurance Period: ", insurancePeriod);
    console.log("Contract Holder: ", contractHolder);
    console.log("Insured Person: ", insuredPerson);
    console.log("Subscription Type: ", productType);
    console.log("Coverage Details: ", coverageDetails);
    console.log("Gift Phone Numbers: ", giftPhoneNumbers);
    console.log("Birth Date: ", birthDate);
    console.log("UsedPoint: ", usedPoint);
  }, [
    totalPremium,
    productName,
    vehicleNumber,
    insurancePeriod,
    contractHolder,
    insuredPerson,
    productType,
    coverageDetails,
    giftPhoneNumbers,
    birthDate,
  ]);

  // 임시로 백엔드로 POST 요청을 보내는 함수
  const handleSendToBackend = async () => {
    const insuredPersonValue = isMember ? insuredPersonName : insuredPerson;

    try {
      const data = {
        insuranceId,
        memberId,
        totalPremium,
        insuredPerson: insuredPersonValue,
        insuredPersonId,
        contractor: contractHolder,
        contractDays: insurancePeriod,
        additionalInformation: {
          vehicleNumber,
        },
      };

      // 기존 보험 계약 전송 요청
      const response = await axios.post(
        "http://localhost:8080/api/my-gift/insurance-contract",
        data
      );
      console.log("백엔드 응답:", response.data);

      // 포인트 차감 요청 추가
      await axios.post(
        `http://localhost:8080/api/my-gift/${memberId}/deduct-points`,
        null,
        {
          params: { usedPoint },
        }
      );
      console.log("포인트 차감 성공");
    } catch (error) {
      console.error("백엔드로 데이터를 보내는 중 오류 발생:", error);
    }
  };

  return (
    <div className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      <h1 className="text-center text-[15px] mt-7">가입 완료</h1>
      <div className="mt-2 my-[100px]">
        <div className="flex mt-6 mb-[30px] w-[700px] h-[50px] items-center">
          <span className="w-4 h-4 rounded-full bg-pink-500"></span>
          <span className="w-4 h-4 rounded-full bg-pink-500 mx-2"></span>
          <span className="w-4 h-4 rounded-full bg-pink-500"></span>
          <span className="w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500 mx-2"></span>
        </div>
        <div className="flex flex-col items-center mt-12">
          {/* <h2 className="text-lg font-bold text-gray-800">가입 완료</h2> */}
          <h1 className="text-2xl font-extrabold text-gray-900 mt-4">
            {insuredPersonName}님께 선물이 완료되었습니다
          </h1>
          <p className="text-gray-600 mt-2">가입내용은 이메일로 전송됩니다.</p>

          <div className="flex gap-4 mt-8">
            <Link to="/">
              <button className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 font-semibold">
                메인으로 가기
              </button>
            </Link>
            <Link to="/MyIns/MyGiftDetail">
              <button className="bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 font-semibold">
                계약조회하기
              </button>
            </Link>
          </div>

          <div className="mt-12 bg-white shadow-md rounded-lg p-6 w-full max-w-md text-center">
            <p className="text-teal-600 font-semibold text-sm">
              자동차보험만으로 불안하다면
            </p>
            <h3 className="text-lg font-bold text-gray-900 mt-2">
              원클릭으로 간편하게 가입 가능한
              <span className="block text-teal-600">원데이운전자보험</span>
            </h3>
            <img src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/panel_icon_driver.jpg" />
            <p className="text-teal-700 font-bold text-2xl mt-4">
              하루 750원부터
            </p>
            <p className="text-gray-600 text-sm mt-4">
              스쿨존 사고시 벌금 3천만원 한도보장! 형사적 비용 손해 최대
              1억원까지 가능한 운전자 보험은 필수!
            </p>
            <button className="bg-teal-500 text-white py-3 px-8 mt-6 rounded-lg font-bold hover:bg-teal-600">
              가입하기
            </button>
          </div>
        </div>
      </div>

      {/* 백엔드로 보내는 버튼 */}
      <div className="w-full flex justify-center mt-8">
        <button
          className="w-[180px] bg-pink-400 text-white py-3 rounded-lg font-bold hover:bg-pink-500"
          onClick={handleSendToBackend}
        >
          백엔드로 보내기
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Step0501;
