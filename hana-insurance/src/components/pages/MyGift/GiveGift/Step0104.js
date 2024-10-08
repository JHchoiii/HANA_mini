import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setVehicleNumber,
  setInsurancePeriod,
  setBirthDate,
  setInsuredPersonId,
  setInsuredPersonName,
  setIsMember,
} from "../../../../store";
import axios from "axios"; // axios 추가

const Dropdown = ({ title, selectedValue, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-[650px] mb-4">
      <div
        className="flex justify-between items-center p-4 bg-white cursor-pointer border rounded-lg"
        onClick={toggleDropdown}
      >
        <h2
          className={`w-full flex justify-between ml-4 font-bold ${
            isOpen ? "text-pink-500" : "text-black"
          }`}
        >
          <p>{title}</p>
          <p className="text-pink-500 mr-6">{selectedValue}일</p>
        </h2>
        <img
          src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/btn_accordion_down_16px.svg"
          alt="Arrow"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          style={{ width: "20px", height: "20px" }}
        />
      </div>
      {isOpen && (
        <div className="p-4 bg-white overflow-y-auto max-h-48">
          <div className="flex flex-col items-center">
            {options.map((option, index) => (
              <div
                key={index}
                className={`py-2 cursor-pointer text-center ${
                  selectedValue === option
                    ? "text-pink-500 font-bold"
                    : "text-black"
                }`}
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false); // 선택 후 드롭다운 닫기
                }}
              >
                {option}일
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const MemberModal = ({ isOpen, onClose, member, onConfirm }) => {
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleConfirm = () => {
    dispatch(setIsMember(true)); // isMember를 true로 설정
    onConfirm(); // 모달 확인 동작
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">사용자 확인</h2>

        {member ? (
          <>
            <h3 className="text-xl font-bold mb-4">회원이 탐지 되었습니다</h3>
            <p>
              선물하시는 분이
              <strong className="text-2xl"> {member.name} </strong>님이 맞나요?
            </p>
          </>
        ) : (
          <p>Member not found.</p>
        )}

        <div className="flex justify-between mt-6 space-x-4">
          {" "}
          {/* 버튼 간격 추가 */}
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg w-full"
            onClick={handleConfirm}
          >
            확인
          </button>
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-lg w-full"
            onClick={onClose}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

const Step0104 = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [carNumber, setCarNumber] = useState("");
  const [birthDate, setBirthDateState] = useState("");
  const [insurancePeriod, setInsurancePeriodState] = useState(1);
  const phoneNumber = useSelector((state) => state.gift.giftPhoneNumbers[0]);
  const [member, setMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const checkMember = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/my-gift/check-member",
        {
          birthDate,
          phoneNumber,
        }
      );

      const { memberId, name } = response.data;

      dispatch(setInsuredPersonId(memberId));
      dispatch(setInsuredPersonName(name));

      setMember(response.data);
      setIsModalOpen(true);
    } catch (error) {
      setMember(null);
      setIsModalOpen(true);
    }
  };

  useEffect(() => {
    if (birthDate.length === 8) {
      setStep(2);
    }
  }, [birthDate]);

  const handleCalculate = () => {
    dispatch(setVehicleNumber(carNumber));
    dispatch(setBirthDate(birthDate));
    dispatch(setInsurancePeriod(insurancePeriod));

    checkMember(); // checkMember 실행 (모달 띄우기)
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate("/InsGift/giveGift/Step0105"); // 모달 확인 후 navigate 실행
  };

  return (
    <>
      <div className="MyIns overflow-auto min-h-screen ">
        <Header2 />
        <h1 className="text-center text-[15px] mt-7">차량 정보 입력 </h1>
        <div className="flex mt-6 mb-[30px] w-[700px] h-[50px] items-center">
          <span className={`w-4 h-4 rounded-full bg-pink-500`}></span>
          <span className={`w-4 h-4 rounded-full bg-pink-500  mx-2`}></span>
          <span
            className={`w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500`}
          ></span>
          <span className={`w-4 h-4 rounded-full mx-2 bg-gray-300`}></span>
        </div>
        <div className="w-[650px] mx-auto mb-40">
          <h1 className="text-center text-[30px] font-bold mb-4">
            차량 정보 입력
          </h1>

          {/* 차량 번호 입력 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 w-full"
          >
            <label className=" text-[20px] font-semibold mb-2 block">
              차량 번호
            </label>
            <input
              type="text"
              placeholder="예: 12가 3456"
              value={carNumber}
              onChange={(e) => setCarNumber(e.target.value)}
              className="border p-4 w-full rounded-lg mb-4"
            />
            <p className="text-gray-500 mt-2 text-sm">
              정기렌터카의 경우 종합보험만 가입 가능합니다.
            </p>
          </motion.div>

          {/* 생년월일 입력 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 w-full"
          >
            <label className="text-[20px] font-semibold mb-2 block">
              생년월일 8자리
            </label>
            <input
              type="text"
              maxLength="8"
              placeholder="예: 20000101"
              value={birthDate}
              onChange={(e) => setBirthDateState(e.target.value)}
              className="border p-4 w-full rounded-lg mb-4"
            />
            <div className="text-gray-500 text-[14px] flex my-3">
              <img src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg" />
              <span className="ml-2">만 20세 이상 가입 가능합니다.</span>
            </div>
            <div className="text-gray-500 text-[14px] flex mt-3 mb-6">
              <img src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg" />
              <span className="ml-2">
                운전자의 생년월일을 정확하게 입력 바랍니다. 생년월일이 상이한
                경우 선물등록이 불가합니다.
              </span>
            </div>
          </motion.div>

          {/* 보험 기간 선택 드롭다운 */}
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 relative"
            >
              <label className="text-[20px] font-semibold mb-2 block">
                보험 기간
              </label>
              <Dropdown
                title="보험 기간"
                selectedValue={insurancePeriod}
                options={[1, 2, 3, 4, 5, 6, 7]}
                onSelect={setInsurancePeriodState}
                className="w-[650px]"
              />
              <div className="text-gray-500 text-[14px] flex my-6">
                <img src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg" />
                <span className="ml-2">
                  보험가입은 최대 7일까지 선택 가능합니다.
                </span>
              </div>

              {/* 보험료 계산하기 버튼 */}
              <div className="w-full flex justify-center">
                <button
                  onClick={handleCalculate}
                  className="w-[200px] bg-pink-400 text-white py-4 rounded-lg font-bold hover:bg-pink-500 mt-4"
                >
                  보험료 계산하기
                </button>
              </div>
            </motion.div>
          )}

          {/* 모달 추가 */}
          <MemberModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            member={member}
            onConfirm={handleModalConfirm} // 확인 버튼을 클릭하면 handleModalConfirm 실행
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Step0104;
