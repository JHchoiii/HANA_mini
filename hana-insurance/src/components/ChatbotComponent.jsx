// src/components/ChatbotComponent.jsx
import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트

const ChatbotComponent = ({ onClose }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const navigate = useNavigate(); // navigate 초기화

  // 메시지 전송 함수
  const handleSendMessage = async () => {
    if (userInput.trim()) {
      const newMessage = { sender: "user", text: userInput };
      setChatHistory((prev) => [...prev, newMessage]);

      try {
        const response = await axios.post("http://localhost:8080/api/chat", {
          userInput: userInput,
          chatHistory: chatHistory,
        });
        console.log(response.data);
        const gptResponse = response.data;

        if (gptResponse.text) {
          const gptMessage = { sender: "gpt", text: gptResponse.text };
          setChatHistory((prev) => [...prev, gptMessage]);
        }

        if (
          gptResponse.recommendations &&
          gptResponse.recommendations.length > 0
        ) {
          const options = gptResponse.recommendations.map((rec) => ({
            name: rec.product_name,
            description: rec.description,
          }));

          const gptOptionMessage = {
            sender: "gpt",
            text: "다음 상품을 추천드립니다:",
            options: options,
          };

          setChatHistory((prev) => [...prev, gptOptionMessage]);
        }

        setUserInput("");
      } catch (error) {
        console.error("Error communicating with chat backend", error);
        const errorMessage = {
          sender: "gpt",
          text: "죄송합니다. 현재 서비스를 이용할 수 없습니다.",
        };
        setChatHistory((prev) => [...prev, errorMessage]);
        setUserInput("");
      }
    }
  };

  // 엔터키로 전송 처리
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  // 상품명 클릭 시 처리 함수
  const handleProductClick = (productName) => {
    // URL에 쿼리 파라미터로 상품명 전달
    navigate(`/InsProd?search=${encodeURIComponent(productName)}`);
  };

  return (
    <Box
      position="fixed"
      bottom="16px"
      right="16px"
      width="400px"
      height="500px"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      zIndex={1000}
    >
      {/* 채팅 헤더 */}
      <HStack
        bg="#54d2c4"
        color="white"
        p={4}
        borderTopRadius="md"
        justifyContent="space-between"
        height="65px"
      >
        <Heading size="md" marginLeft="20px">
          Mini 상담봇
        </Heading>
        <IconButton
          aria-label="close chat"
          icon={<MdClose />}
          onClick={onClose}
          variant="ghost"
          color="white"
        />
      </HStack>

      {/* 채팅 내용 */}
      <Box flex="1" p={4} overflowY="auto">
        <VStack spacing={4} align="stretch">
          {chatHistory.map((message, index) => (
            <Box
              key={index}
              alignSelf={message.sender === "gpt" ? "flex-start" : "flex-end"}
              bg={message.sender === "gpt" ? "teal.100" : "blue.100"}
              borderRadius="md"
              p={3}
              maxW="80%"
            >
              <Text fontWeight="bold">
                {message.sender === "gpt" ? "GPT:" : "You:"}
              </Text>
              <Text>{message.text}</Text>
              {/* 추천 상품 옵션 */}
              {message.sender === "gpt" && message.options && (
                <VStack align="start" spacing={1} mt={2}>
                  {message.options.map((option, i) => (
                    <Box key={i}>
                      <Text
                        color="teal.600"
                        textDecoration="underline"
                        cursor="pointer"
                        onClick={() => {
                          handleProductClick(option.name);
                        }}
                      >
                        {option.name}
                      </Text>
                      <Text>{option.description}</Text>
                    </Box>
                  ))}
                </VStack>
              )}
            </Box>
          ))}
        </VStack>
      </Box>

      {/* 채팅 입력 */}
      <Box p={4} borderTopWidth="1px">
        <VStack spacing={2}>
          <InputGroup>
            <Input
              placeholder="질문을 입력하세요..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <InputRightElement>
              <Button
                color="white"
                background="#54d2c4"
                onClick={handleSendMessage}
              >
                전송
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
      </Box>
    </Box>
  );
};

export default ChatbotComponent;
