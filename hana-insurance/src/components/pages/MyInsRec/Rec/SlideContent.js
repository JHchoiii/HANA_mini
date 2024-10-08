import React, { useState } from "react";
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const SlideContent1 = ({ question, options = [], onAnswer }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    const index = options.indexOf(value); // 선택한 값의 인덱스를 구함
    onAnswer(index); // 인덱스를 부모 컴포넌트로 전달
  };

  return (
    <Box
      sx={{
        height: "100%",
        backgroundColor: "#f2f6f5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        {question}
      </Typography>

      <RadioGroup
        aria-label="account"
        name="account"
        value={selectedValue}
        onChange={handleChange}
        sx={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option}
            sx={{
              width: "300px",
              backgroundColor: "#f0f0f0",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
};

export default SlideContent1;
