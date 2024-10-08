import React, { useRef, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../../Header2";
import Footer from "../../../footer";
import SignatureCanvas from "react-signature-canvas";
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
} from "@chakra-ui/react";
import axios from "axios";

const SignatureCanvasRegistration = () => {
  const { contractId } = useParams(); // Get contractId from URL
  const [insuranceInfo, setInsuranceInfo] = useState(null);
  const [trimmedDataURL, setTrimmedDataURL] = useState(null); // 서명 저장을 위한 state
  const sigCanvasRef = useRef(null); // 서명 캔버스 참조
  const navigate = useNavigate(); // 페이지 이동을 위한 hook 추가

  useEffect(() => {
    // Fetch insurance product and contract info
    axios
      .get(
        `http://localhost:8080/api/my-gift/insurance-products/contract/${contractId}`
      )
      .then((response) => {
        console.log("Response data:", response.data); // Log response data
        setInsuranceInfo(response.data); // Save data to state
      })
      .catch((error) => {
        console.error("Error fetching insurance product data:", error);
      });
  }, [contractId]);

  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer 상태 제어

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setTrimmedDataURL(null); // 저장된 서명 데이터도 초기화
    } else {
      console.error("Signature canvas is not initialized yet.");
    }
  };

  const saveSignature = () => {
    if (!sigCanvasRef.current.isEmpty()) {
      const canvas = sigCanvasRef.current.getCanvas();
      const dataURL = canvas.toDataURL("image/png");
      setTrimmedDataURL(dataURL); // 서명 결과를 저장
      onClose(); // Drawer 닫기
    } else {
      alert("서명을 입력해주세요.");
    }
  };

  const handleConfirm = () => {
    if (trimmedDataURL) {
      // 서명이 존재할 때만 페이지 이동
      navigate(`/InsGift/RegistrationComplete/${contractId}`);
    } else {
      alert("서명을 입력해주세요.");
    }
  };

  return (
    <div className="MyIns flex flex-col justify-between min-h-screen bg-gray-50">
      <Header />

      {insuranceInfo ? (
        <div className="insurance-info px-6 py-4 bg-white shadow-md rounded-lg mx-4 mt-4">
          <h1 className="text-2xl font-bold text-pink-600 mb-2">
            {insuranceInfo.insuranceName || "보험 상품명"}
          </h1>
          <p>
            피보험자명:{" "}
            <span className="text-red-500">
              {insuranceInfo.insuredPerson || "최준혁"}
            </span>
          </p>
          <p>
            청약번호: {insuranceInfo.applicationNumber || "800010520240702903"}
          </p>
          <p>
            주 의주거래번호:{" "}
            {insuranceInfo.transactionNumber || "20240702094826147997"}
          </p>
        </div>
      ) : (
        <p className="text-center py-6">
          보험 상품 정보를 불러오는 중입니다...
        </p>
      )}

      <div className="flex flex-col items-center mt-6">
        {/* 서명 영역 */}
        <h2 className="text-red-500 mb-2">피보험자명</h2>
        <div
          className="w-full h-48 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-100 cursor-pointer"
          onClick={onOpen}
        >
          {trimmedDataURL ? (
            <img src={trimmedDataURL} alt="서명" className="h-full" />
          ) : (
            <p className="text-gray-500">해당 영역을 터치해주세요.</p>
          )}
        </div>

        {/* Drawer 내부 */}
        <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent
            style={{
              width: "55%",
              margin: "0 auto",
              borderRadius: "10px",
            }}
          >
            <DrawerCloseButton />
            <DrawerHeader>서명 후 확인을 눌러주세요.</DrawerHeader>
            <DrawerBody>
              <div className="flex flex-col items-center">
                <SignatureCanvas
                  ref={sigCanvasRef}
                  penColor="black"
                  canvasProps={{
                    width: 400,
                    height: 150,
                    className: "signatureCanvas bg-transparent", // bg-transparent 추가
                  }}
                />
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={saveSignature}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    확인
                  </button>
                  <button
                    onClick={clearSignature}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    취소
                  </button>
                </div>
              </div>
            </DrawerBody>
            <DrawerFooter>
              <Button variant="outline" onClick={onClose}>
                닫기
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex justify-center mt-6 mb-4">
        <Button
          colorScheme="blue"
          onClick={handleConfirm}
          isDisabled={!trimmedDataURL} // 서명이 없으면 비활성화
        >
          확인
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default SignatureCanvasRegistration;
