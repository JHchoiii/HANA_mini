// InsRecChoice.jsx
import React, { useState } from "react";
import { Box, Button, Typography, Popover } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Header2 from "../../../Header2";
import Footer from "../../../footer";

const InsRecChoice = () => {
  const navigate = useNavigate();

  const handleSurveyClick = () => {
    navigate("/MyInsRec/InsRec");
  };

  const handleDeepLearningClick = () => {
    navigate("/MyInsRec/InsRecResult");
  };

  // 서베이 추천 팝오버 상태 관리
  const [anchorElSurvey, setAnchorElSurvey] = useState(null);

  const handleSurveyPopoverOpen = (event) => {
    setAnchorElSurvey(event.currentTarget);
  };

  const handleSurveyPopoverClose = () => {
    setAnchorElSurvey(null);
  };

  const openSurveyPopover = Boolean(anchorElSurvey);

  // 딥러닝 추천 팝오버 상태 관리
  const [anchorElDeep, setAnchorElDeep] = useState(null);

  const handleDeepPopoverOpen = (event) => {
    setAnchorElDeep(event.currentTarget);
  };

  const handleDeepPopoverClose = () => {
    setAnchorElDeep(null);
  };

  const openDeepPopover = Boolean(anchorElDeep);

  // 애니메이션 설정
  const leftToRightAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const rightToLeftAnimation = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          minHeight: "calc(100vh - 70px)",
          width: "100%",
          mt: 5,
        }}
      >
        {/* 서베이 추천 영역 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={leftToRightAnimation}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            marginBottom: "10px",
          }}
        >
          {/* 이미지 왼쪽 */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              padding: "10px",
              minWidth: "300px",
            }}
          >
            {/* rainbow_BG 테두리 이미지 */}
            <img
              src="/rainbow_BG.jpg" // public 폴더에 위치해야 함
              alt="Rainbow Border"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "calc(100% + 20px)", // 메인 이미지보다 양쪽에서 10px 확장
                height: "calc(100% + 10px)", // 메인 이미지보다 위, 아래에서 10px 확장
                zIndex: 0, // 메인 이미지보다 뒤에 위치
                borderRadius: "60px", // 메인 이미지보다 더 둥글게
              }}
            />
            <img
              src="https://www.clify.co.kr/common/pc/images/contents/overview-list-visual-1.png"
              alt="Survey Recommendation"
              style={{
                width: "100%",
                borderRadius: "50px",
                position: "relative", // zIndex 적용을 위해 설정
                zIndex: 1, // rainbow_BG보다 앞에 위치
              }}
            />
          </Box>

          {/* 설명 및 버튼 오른쪽 */}
          <Box sx={{ flex: 1, textAlign: "left", ml: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: "35px",
                background: "linear-gradient(90deg, #54d2c4, black)", // 그라데이션 색상
                WebkitBackgroundClip: "text", // 텍스트에만 배경 클립
                WebkitTextFillColor: "transparent", // 글씨 자체 색상을 투명하게 설정
              }}
            >
              서베이 추천
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              서비스 사용 경험이 없는 분들도 서베이를 통해 맞춤형 보험 추천을
              받아보세요.
            </Typography>
            <Button
              onClick={handleSurveyClick}
              sx={{
                backgroundColor: "#54d2c4",
                color: "#fff",
                mb: 2,
                width: "150px",
                height: "50px",
                borderRadius: "25px",
                "&:hover": { backgroundColor: "#43b1a2" },
              }}
            >
              추천받기
            </Button>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "#54d2c4",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
              onClick={handleSurveyPopoverOpen}
            >
              자세한 설명보기
            </Button>
            <Popover
              open={openSurveyPopover}
              anchorEl={anchorElSurvey}
              onClose={handleSurveyPopoverClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2, maxWidth: 300 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  서베이 기반 추천
                </Typography>
                <Typography variant="body2">
                  서베이에 응답하신 내용을 바탕으로 당신에게 적합한 보험 상품을
                  추천해드립니다. 보험에 대한 경험이 없으신 분들도 쉽게 이용하실
                  수 있습니다.
                </Typography>
              </Box>
            </Popover>
          </Box>
        </motion.div>

        {/* 딥러닝 추천 영역 */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={rightToLeftAnimation}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "80%",
            marginBottom: "10px",
          }}
        >
          {/* 설명 및 버튼 왼쪽 */}
          <Box sx={{ flex: 1, textAlign: "right", mr: 5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 2,
                fontSize: "35px",
                background:
                  "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(84,210,196,1) 78%, rgba(84,210,196,1) 100%);", // 그라데이션 색상
                WebkitBackgroundClip: "text", // 텍스트에만 배경 클립
                WebkitTextFillColor: "transparent", // 글씨 자체 색상을 투명하게 설정
              }}
            >
              AI 기반 추천
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              당신의 리뷰를 기반으로 딥러닝 알고리즘이 최적화된 보험을
              추천해드립니다. <br />
              버튼 한 번으로 간편하게 추천을 받아보세요.
            </Typography>
            <Button
              onClick={handleDeepLearningClick}
              sx={{
                backgroundColor: "#54d2c4",
                color: "#fff",
                mb: 2,
                width: "150px",
                height: "50px",
                borderRadius: "25px",
                "&:hover": { backgroundColor: "#43b1a2" },
              }}
            >
              추천받기
            </Button>
            <Button
              sx={{
                backgroundColor: "transparent",
                color: "#54d2c4",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
              onClick={handleDeepPopoverOpen}
            >
              자세한 설명보기
            </Button>
            <Popover
              open={openDeepPopover}
              anchorEl={anchorElDeep}
              onClose={handleDeepPopoverClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Box sx={{ p: 2, maxWidth: 300 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", mb: 1 }}
                >
                  AI 기반 추천
                </Typography>
                <Typography variant="body2">
                  당신의 리뷰로 남긴 보험 이용 내역을 딥러닝으로 분석하여 최적의
                  보험 상품을 추천해드립니다. 복잡한 과정 없이 버튼 한 번으로
                  간편하게 추천을 받아보세요.
                </Typography>
              </Box>
            </Popover>
          </Box>

          {/* 이미지 오른쪽 */}
          <Box
            sx={{
              flex: 1,
              position: "relative",
              padding: "10px",
              minWidth: "300px",
            }}
          >
            {/* rainbow_BG 테두리 이미지 */}
            <img
              src="/rainbow_BG.jpg" // public 폴더에 위치해야 함
              alt="Rainbow Border"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "calc(100% + 20px)", // 메인 이미지보다 양쪽에서 10px 확장
                height: "calc(100% + 10px)", // 메인 이미지보다 위, 아래에서 10px 확장
                zIndex: 0, // 메인 이미지보다 뒤에 위치
                borderRadius: "60px", // 메인 이미지보다 더 둥글게
              }}
            />
            {/* 메인 이미지 */}
            <img
              src="https://www.clify.co.kr/common/pc/images/contents/overview-list-visual-2.png"
              alt="Deep Learning Recommendation"
              style={{
                width: "100%",
                borderRadius: "50px",
                position: "relative",
                zIndex: 1, // rainbow_BG보다 앞에 위치
              }}
            />
          </Box>
        </motion.div>
      </Box>
      <Footer />
    </div>
  );
};

export default InsRecChoice;
