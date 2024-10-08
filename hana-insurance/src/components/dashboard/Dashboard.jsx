// src/components/dashboard/Dashboard.jsx
import React from "react";
import { Box, useDisclosure } from "@chakra-ui/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";
import VideoConsultationListener from "./VideoConsultationListener"; // 리스너 임포트
import { ConsultationProvider } from "../../contexts/ConsultationContext"; // 컨텍스트 제공자 임포트

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ConsultationProvider>
      <Box minH="100vh" bg="gray.50">
        <Sidebar isOpen={isOpen} onClose={onClose} />
        <Box ml={{ base: 0, md: 60 }} transition="margin-left 0.3s">
          <Header onOpen={onOpen} />
          <Box p="4">
            {/* 알림 리스너 추가 */}
            <VideoConsultationListener />
            <Outlet /> {/* 이 부분에 라우팅된 페이지가 렌더링됨 */}
          </Box>
        </Box>
      </Box>
    </ConsultationProvider>
  );
};

export default Dashboard;
