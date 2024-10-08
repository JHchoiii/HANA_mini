import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

const StepperWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "20px 0",
  position: "relative",
  width: "43%", // 스테퍼 너비 조정
  marginLeft: "auto",
  marginRight: "auto", // 중앙 정렬
}));

const StepBlock = styled(Box)(({ theme, isActive }) => ({
  flexGrow: 1,
  textAlign: "center",
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  // margin: "0 5px", // 필요 시 활성화
  "& .step-bar": {
    height: "5px",
    backgroundColor: isActive ? "#54d2c4" : "#e0e0e0",
    margin: "0",
    width: "120px",
    transition: "background-color 0.3s ease",
  },
}));

const HorizontalStepper = ({ steps, currentStep }) => {
  return (
    <StepperWrapper>
      {steps.map((step, index) => (
        <StepBlock key={index} isActive={index === currentStep}>
          <Typography
            variant="body1"
            sx={{
              color: index === currentStep ? "#54d2c4" : "#999999",
              fontWeight: index === currentStep ? "bold" : "normal",
              transition: "color 0.3s ease",
            }}
          >
            {step}
          </Typography>
          <Box className="step-bar"></Box>
        </StepBlock>
      ))}
    </StepperWrapper>
  );
};

export default HorizontalStepper;
