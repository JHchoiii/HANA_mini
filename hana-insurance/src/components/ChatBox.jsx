// src/components/ChatBox.jsx

import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import { disassemble } from "es-hangul";

const ChatBox = ({
  chatOpen,
  setChatOpen,
  chatHistory,
  handleSendMessage,
  userInput,
  setUserInput,
  handleKeyPress,
  handleProductClick,
}) => {
  return (
    <>
      {/* 채팅창 */}
      {chatOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: 400,
            height: 500,
            border: "1px solid gray",
            backgroundColor: "white",
            borderRadius: 2,
            boxShadow: 3,
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* 채팅 헤더 */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "primary.main",
              color: "white",
              p: 2,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            }}
          >
            <Typography variant="h6">채팅</Typography>
            <IconButton
              size="small"
              onClick={() => setChatOpen(false)}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* 채팅 내용 */}
          <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
            {chatHistory.map((message, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection:
                    message.sender === "gpt" ? "column" : "row-reverse",
                  alignItems:
                    message.sender === "gpt" ? "flex-start" : "flex-end",
                }}
              >
                <Paper
                  sx={{
                    p: 1,
                    bgcolor:
                      message.sender === "gpt"
                        ? "primary.light"
                        : "secondary.light",
                    maxWidth: "75%",
                  }}
                >
                  <Typography variant="body2">
                    <strong>
                      {message.sender === "gpt" ? "GPT:" : "You:"}
                    </strong>{" "}
                    {message.text}
                  </Typography>
                </Paper>
                {/* 추천 상품 옵션 */}
                {message.sender === "gpt" && message.options && (
                  <Box sx={{ mt: 1 }}>
                    {message.options.map((option, i) => (
                      <Typography
                        key={i}
                        variant="body2"
                        sx={{
                          cursor: "pointer",
                          color: "primary.main",
                          textDecoration: "underline",
                          mb: 0.5,
                        }}
                        onClick={() => handleProductClick(option.name)}
                      >
                        {option.name}: {option.description}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>

          {/* 채팅 입력 */}
          <Box sx={{ p: 2, borderTop: "1px solid #ddd" }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="질문을 입력하세요..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSendMessage}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 1 }}
              onClick={handleSendMessage}
              fullWidth
            >
              전송
            </Button>
          </Box>
        </Box>
      )}

      {/* 채팅 열기 버튼 */}
      {!chatOpen && (
        <IconButton
          onClick={() => setChatOpen(true)}
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
            zIndex: 1000,
          }}
        >
          <ChatIcon />
        </IconButton>
      )}
    </>
  );
};

export default ChatBox;
