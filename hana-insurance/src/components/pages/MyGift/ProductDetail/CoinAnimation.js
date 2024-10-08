import React, { useEffect } from "react";
import "./CoinAnimation.css"; // 관련 CSS 파일을 임포트

const CoinAnimation = () => {
  useEffect(() => {
    const coins = document.querySelectorAll(".coin");
    coins.forEach((coin, index) => {
      setTimeout(() => {
        coin.classList.add("animate");
      }, index * 300); // 0.3초 간격으로 애니메이션 시작
    });
  }, []);

  return (
    <div className="icon-animation relative w-[100px] h-[100px] mb-5">
      <div className="coin sub-coin-1"></div>
      <div className="coin sub-coin-2"></div>
      <div className="coin sub-coin-3"></div>
      <div className="coin sub-coin-down"></div>
    </div>
  );
};

export default CoinAnimation;
