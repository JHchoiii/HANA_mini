import React, { useState } from "react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import "../../../css/Custom.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Input,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux"; // useDispatch를 import
import { setGiftPhoneNumbers } from "../../../../store"; // 변경된 액션을 import

const Step0101 = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState([]); // 메인 화면에 표시할 전화번호 리스트
  const [tempPhoneNumbers, setTempPhoneNumbers] = useState([]); // Drawer 내에 표시할 임시 전화번호 리스트
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure 훅 사용
  const dispatch = useDispatch(); // 리덕스 디스패치 사용
  const toast = useToast(); // Chakra UI의 useToast 훅 사용

  // 전화번호 정규식 (010, 011 등으로 시작하는 10-11자리 전화번호)
  const phoneNumberRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

  // 전화번호 포맷팅 함수 (01012345678 -> 010-1234-5678)
  const formatPhoneNumber = (number) => {
    return number.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  const handlePhoneNumberChange = (event) => {
    // 숫자만 입력 가능하게 변경
    const value = event.target.value.replace(/[^0-9]/g, "");
    setPhoneNumber(value);
  };

  const handleAddPhoneNumber = () => {
    if (phoneNumberRegex.test(phoneNumber)) {
      // 전화번호가 유효하면 포맷 후 추가
      const formattedNumber = formatPhoneNumber(phoneNumber);
      setTempPhoneNumbers([...tempPhoneNumbers, formattedNumber]);
      setPhoneNumber(""); // 입력 필드 초기화
    } else {
      // Toast로 에러 메시지 출력
      toast({
        title: "유효하지 않은 전화번호입니다.",
        description: "01012345678 형식으로 입력해주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right", // 토스트 위치
      });
    }
  };

  const handleConfirmPhoneNumbers = () => {
    setPhoneNumbers([...tempPhoneNumbers]); // 상태 업데이트
    dispatch(setGiftPhoneNumbers([...tempPhoneNumbers])); // 리덕스에 저장
    setTempPhoneNumbers([]); // 임시 상태 초기화
    onClose(); // Drawer 닫기
  };

  const handleDeleteTempPhoneNumber = (index) => {
    setTempPhoneNumbers(tempPhoneNumbers.filter((_, i) => i !== index));
  };

  const handleRemovePhoneNumber = (number) => {
    setPhoneNumbers(phoneNumbers.filter((num) => num !== number));
    dispatch(setGiftPhoneNumbers(phoneNumbers.filter((num) => num !== number))); // 전화번호 삭제 시 리덕스에서도 업데이트
  };

  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <h1 className="text-center text-[15px] mt-7">선물하기 정보 입력 </h1>
      <div className="mt-2 my-[100px]">
        <div className="flex mt-4 mb-[75px] w-[700px] h-[50px] items-center">
          <span
            className={`w-[19px] h-[19px] rounded-full border-[2px] bg-white border-pink-500 `}
          ></span>
          <span className={`w-4 h-4 rounded-full bg-gray-300 mx-2`}></span>
          <span className={`w-4 h-4 rounded-full bg-gray-300`}></span>
          <span className={`w-4 h-4 rounded-full mx-2 bg-gray-300`}></span>
        </div>
        <div className="mt-[35px] flex flex-col w-[700px]">
          <h2 className="text-2xl mb-2">
            <span className="font-bold ">선물 받을 분의 연락처</span>를
            입력해주세요
          </h2>
        </div>
        <div className="mt-[35px] flex flex-col items-center w-[700px]">
          <div className="w-full ">
            <div className="flex justify-around mb-6">
              <button className="px-4 py-2 border w-[300px] h-[50px] border-gray-300 rounded-[10px] hover:bg-pink-200 focus:outline-none">
                주소록에서 선택
              </button>
              <button
                onClick={onOpen}
                className="px-4 py-2 border w-[300px] h-[50px] border-gray-300 rounded-[10px] hover:bg-pink-200 focus:outline-none"
              >
                직접 입력
              </button>
            </div>
            <hr />
            <label className="block text-sm font-bold text-gray-700 my-8">
              받는 분 휴대폰번호{" "}
              <span className="text-pink-400">({phoneNumbers.length}명)</span>
            </label>
            {phoneNumbers.map((number, index) => (
              <div
                key={index}
                className="flex items-center justify-between my-2"
              >
                <span>{number}</span>
                <button
                  className="text-gray-500 hover:text-red-500 ml-4"
                  onClick={() => handleRemovePhoneNumber(number)}
                >
                  X
                </button>
              </div>
            ))}
            <hr />
            <div className="text-gray-500 text-sm my-8">
              <ul className="pink-custom-list-dot-image list-none pl-5 space-y-1">
                <li className="flex">
                  <img
                    src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                    className="mr-2"
                  />
                  최대 1명에게 선물할 수 있습니다.
                </li>
                <li className="flex">
                  <img
                    src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                    className="mr-2"
                  />
                  휴대전화번호를 잘못 입력할 경우 상대방이 선물을 받을 수
                  없습니다. 정확히 입력해주세요.
                </li>
                <li className="flex">
                  <img
                    src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                    className="mr-2"
                  />
                  만 20세 이상 가입 가능한 상품입니다.
                </li>
              </ul>
            </div>
            <Link to="/InsGift/giveGift/Step0102">
              <div className="flex justify-center">
                <button className="bg-pink-400 text-white font-bold py-3 px-20 rounded-lg hover:bg-pink-600">
                  다음
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Drawer 컴포넌트를 추가 */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent className="flex flex-col items-center justify-center">
          <DrawerCloseButton />
          <DrawerHeader className="m-6">직접 입력</DrawerHeader>

          <DrawerBody className="w-3/4">
            <div className="flex justify-between items-center mb-4">
              <Input
                placeholder="- 제외하고 입력"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="mr-2"
              />
              <Button colorScheme="teal" onClick={handleAddPhoneNumber}>
                추가
              </Button>
            </div>
            {tempPhoneNumbers.map((number, index) => (
              <div
                key={index}
                className="flex items-center justify-between m-5 w-[900px]"
              >
                <span className="text-m text-gray-700">{number}</span>
                <button onClick={() => handleDeleteTempPhoneNumber(index)}>
                  X
                </button>
              </div>
            ))}
          </DrawerBody>

          <DrawerFooter>
            <Button
              colorScheme="pink"
              w="750px"
              onClick={handleConfirmPhoneNumbers}
            >
              확인
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Footer />
    </div>
  );
};

export default Step0101;
