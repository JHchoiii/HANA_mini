// src/components/dashboard/VideoConsultationListener.jsx
import React, { useEffect, useContext } from "react";
import SignalService from "../../SignalService";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { ConsultationContext } from "../../contexts/ConsultationContext";

const VideoConsultationListener = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { notifyNewRequest, clearRequest } = useContext(ConsultationContext);

  const roomId = "test-room";

  useEffect(() => {
    const handleSignal = (message) => {
      const data = JSON.parse(message.body);
      console.log("Received signal in listener:", data);
      if (data.type === "offer" && data.sender === "caller") {
        // Offer received
        notifyNewRequest();
        toast({
          title: "화상 상담 요청",
          description: "새로운 화상 상담 요청이 있습니다.",
          status: "success", // 초록색
          duration: 5000,
          isClosable: true,
          onCloseComplete: () => {
            // 상담 페이지로 이동
            navigate("/dashboard/consultation");
            clearRequest(); // 상태 초기화
          },
        });
      }
    };

    SignalService.connect(() => {
      console.log("Connected to signaling server in listener");
      SignalService.subscribe(roomId, handleSignal);
    });

    return () => {
      SignalService.disconnect();
    };
  }, [navigate, notifyNewRequest, clearRequest, roomId, toast]);

  return null; // 렌더링할 내용 없음
};

export default VideoConsultationListener;
