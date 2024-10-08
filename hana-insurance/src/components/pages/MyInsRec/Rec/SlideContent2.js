import React, { useState } from "react";
import { Box, Typography, Checkbox, FormControlLabel } from "@mui/material";

const SlideContent2 = () => {
  const [selectedItems, setSelectedItems] = useState([]); // 선택된 항목 상태
  const nextButtonColor = "#54d2c4"; // NEXT 버튼 색상과 동일하게 설정

  const handleSelect = (label) => {
    setSelectedItems(
      (prev) =>
        prev.includes(label)
          ? prev.filter((item) => item !== label) // 선택 해제
          : [...prev, label] // 선택 추가
    );
  };

  const items = [
    {
      label: "자동차",
      image:
        "https://www.hanainsure.co.kr/static/resources/web/img/main/main_icon_01.png",
      style: {}, //{ width: "85px", height: "62px" }, // 자동차 이미지 스타일
    },
    {
      label: "운전자",
      image:
        "https://www.hanainsure.co.kr/static/resources/web/img/main/main_icon_02.png",
      style: {}, //{ width: "85px", height: "62px" }, // 자동차 이미지 스타일
    },
    {
      label: "여행",
      image:
        "https://www.hanainsure.co.kr/static/resources/web/img/main/main_icon_04.png",
      style: {}, //{ width: "85px", height: "62px" }, // 자동차 이미지 스타일
    },
    {
      label: "건강",
      image:
        "https://www.hanainsure.co.kr/static/resources/web/img/main/main_icon_06.png",
      style: {}, //{ width: "85px", height: "62px" }, // 자동차 이미지 스타일
    },
    {
      label: "반려동물",
      image: "/freepik_pet.jpeg",
      style: { width: "80px", height: "75px" }, // 반려동물 이미지 스타일
    },
    {
      label: "생활",
      image:
        "https://www.hanainsure.co.kr/static/resources/web/img/main/main_icon_05.png",
      style: {}, //{ width: "85px", height: "62px" }, // 자동차 이미지 스타일
    },
    {
      label: "레저",
      image: "/freepik_golf.png",
      style: { width: "75px", height: "70px" }, // 레저 이미지 스타일
    },
    {
      label: "사고",
      image: "/freepik_ambulance.png",
      style: { width: "70px", height: "65px" }, // 사고 이미지 스타일
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        어떤 종류의 보험을 추천받길 원하시나요?
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "20px",
          gap: "20px",
          width: "80%",
        }}
      >
        {items.map(({ label, image, style }) => (
          <Box
            key={label}
            sx={{
              flex: "1 0 21%",
              padding: "20px",
              border: selectedItems.includes(label)
                ? `2px solid ${nextButtonColor}` // 선택된 경우 색상 변경
                : "1px solid #ddd",
              borderRadius: "10px",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: selectedItems.includes(label)
                ? `0px 8px 15px rgba(84, 210, 196, 0.7)` // 선택된 경우 쉐도우 변경
                : "0px 8px 10px 3px rgba(0, 0, 0, 0.1)",
              boxSizing: "border-box",
              minWidth: "150px",
              maxWidth: "200px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "180px",
              cursor: "pointer",
              transition: "box-shadow 0.3s ease", // 부드러운 쉐도우 전환
            }}
            onClick={() => handleSelect(label)} // 박스 클릭 시 항목 선택
          >
            <img
              src={image}
              alt={label}
              style={{ ...style, marginBottom: "10px" }}
            />
            <Typography variant="body1" component="p">
              {label}
            </Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedItems.includes(label)} // 선택된 항목은 체크됨
                  onChange={() => handleSelect(label)} // 체크박스 클릭 시 항목 선택
                  sx={{
                    "&.Mui-checked": {
                      color: nextButtonColor, // 선택된 체크박스 색상 변경
                    },
                  }}
                />
              }
              label=""
              sx={{ display: "block", margin: "0 auto" }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SlideContent2;
