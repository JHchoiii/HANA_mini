// src/components/FloatingWidget.jsx
import React, { useState } from "react";
import { Box, IconButton, Button } from "@chakra-ui/react";
import { MdChat } from "react-icons/md";
import ChatbotComponent from "./ChatbotComponent";
import VideoConsultationComponent from "./VideoConsultationComponent";
import { motion, AnimatePresence } from "framer-motion";

const FloatingWidget = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChatbotClick = () => {
    setShowChatbot(true);
    setShowVideo(false);
    setShowOptions(false);
  };

  const handleVideoClick = () => {
    setShowVideo(true);
    setShowChatbot(false);
    setShowOptions(false);
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <IconButton
        aria-label="open options"
        icon={<MdChat />}
        onClick={toggleOptions}
        position="fixed"
        bottom="350px"
        right="5px"
        background="#54d2c4"
        borderRadius="full"
        size="lg"
        zIndex={1000}
        color="white"
      />

      {/* 옵션 버튼들 */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              bottom: "350px",
              right: "65px", // 위젯의 왼쪽으로 위치
              zIndex: 9999,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "8px",
            }}
          >
            <Button colorScheme="teal" onClick={handleChatbotClick}>
              챗봇 질문
            </Button>
            <Button colorScheme="blue" onClick={handleVideoClick}>
              화상상담요청
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 챗봇 창 */}
      {showChatbot && (
        <ChatbotComponent onClose={() => setShowChatbot(false)} />
      )}

      {/* 화상상담 창 */}
      {showVideo && (
        <VideoConsultationComponent onClose={() => setShowVideo(false)} />
      )}
    </>
  );
};

export default FloatingWidget;
