import React, { useState } from "react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import "../../../css/Custom.css";
import { Link } from "react-router-dom";

const Step0102 = () => {
  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <h1 className="text-center text-[15px] mt-7">선물하기 정보 입력 </h1>
      <div className="mt-2 my-[100px]">
        <div className="flex mt-4 mb-[75px] w-[700px] h-[50px] items-center">
          <span className={`w-4 h-4 rounded-full bg-pink-500`}></span>
          <span
            className={`w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500 mx-2`}
          ></span>
          <span className={`w-4 h-4 rounded-full bg-gray-300`}></span>
          <span className={`w-4 h-4 rounded-full mx-2 bg-gray-300`}></span>

          {/* <span
            className={`w-4 h-4 rounded-full border-4 ${
              currentQuestionIndex === 2
                ? "bg-pink-500 border-pink-500"
                : "bg-white border-pink-500"
            }`}
          ></span>
          <span
            className={`w-4 h-4 rounded-full border-4 mx-2 ${
              currentQuestionIndex === 3
                ? "bg-pink-500 border-pink-500"
                : "bg-white border-pink-500"
            }`}
          ></span> */}
        </div>
        <div className="mt-[35px] flex flex-col w-[700px]">
          <h2 className="text-2xl mb-4 ">
            <span className="font-bold">차량유형</span>을 확인해주세요
          </h2>
        </div>
        <div className="border border-gray-300 p-5 w-[700px] h-[150px] flex flex-col justify-center">
          <div className="pl-4">
            <h3 className="font-bold mb-2">본인차량을 타인이 운전하는 경우</h3>
            <p className="text-gray-600">
              본인(개인) 소유의 승용차, 16인승 이하 승합차, 1톤 이하 화물차,
              장기렌터카인 경우
            </p>
          </div>
        </div>

        <div className="mt-4 w-[700px]">
          <h3 className="font-bold text-gray-700 mb-2">꼭 확인하세요!</h3>
          <ul className="pink-custom-list-dot-image list-none pl-5 text-sm text-gray-600">
            <li className="my-3 flex ">
              <img
                src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                className="mr-2 mb-4"
              />
              본 선물은 선물받으신 분이 선물등록을 하여 최종 가입완료시 지정을
              보험가입일부터 <br />
              효력이 발생하며, 보상이 가능합니다.
            </li>
            <li className="my-3 flex">
              <img
                src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                className="mr-2"
              />
              선물받으신 분이 가입을 진행하지 않거나, 보험가입을 완료하지 않을
              경우 선물이 취소됩니다.
            </li>
            <li className="my-3 flex">
              <img
                src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                className="mr-2 mb-4"
              />
              선물된 보험상품의 가입완료 이후에는 취소 및 환불이 불가하며, 출고
              이후 사고가 발생해도 <br />
              보상이 가능합니다.
            </li>
          </ul>
        </div>

        <Link to="/InsGift/giveGift/Step0103">
          <div className="flex justify-center mt-6">
            <button className="bg-pink-400 text-white font-bold py-3 px-20 rounded-lg hover:bg-pink-600">
              확인
            </button>
          </div>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Step0102;
