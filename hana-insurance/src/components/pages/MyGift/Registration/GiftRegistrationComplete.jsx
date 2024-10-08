import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const GiftRegistrationComplete = () => {
  const { contractId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 계약 상태를 '등록'으로 업데이트하는 API 호출
    axios
      .put(`http://localhost:8080/api/my-gift/register/${contractId}`)
      .then((response) => {
        console.log("Contract updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating contract:", error);
        alert("계약 상태 업데이트 중 오류가 발생했습니다.");
      });
  }, [contractId]);

  return (
    <div className="container mx-auto text-center">
      <h1 className="text-3xl font-bold mt-8">계약이 완료되었습니다!</h1>
      <p className="text-lg mt-4">계약 ID: {contractId}</p>
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => navigate("/")}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default GiftRegistrationComplete;
