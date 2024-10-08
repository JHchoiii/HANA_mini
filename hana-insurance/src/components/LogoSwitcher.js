import React, { useState, useEffect } from "react";
import "animate.css";
import "./css/LogoSwitcher.css";
import styled from "styled-components";

const LogoContainer = styled.a`
  text-decoration: none;
  color: #444;
  font-size: 2rem;
  font-weight: bold;
  position: absolute; /* VisualArea 내부의 다른 absolute 요소들과 충돌을 피함 */
  top: 50px; /* VisualArea 내부에서의 위치 */
  left: 30px; /* VisualArea 내부에서의 위치 */
  z-index: 1000;
`;

const Co1 = styled.i`
  color: #54d2c4; /* HANA 부분의 색상 설정 */
`;

// 하나손해보험 로고 스타일링
const HanaLogoWrapper = styled.a`
  color: #00796b;
  position: absolute;
  top: 50px;
  left: 10px;
  z-index: 1000;
  display: flex;
  align-items: center;

  .logo-image {
  padding-left:10px;
    width:175px;
    height:50px;
  }

  span {
    font-family: 'CustomFont', sans-serif; !important/* 사용자 정의 폰트 적용 */
    font-size: 25px; !important/* 텍스트 크기 조정 */
    font-weight: bold; !important
    
  }

  
`;

const LogoSwitcher = () => {
  const [isHanaLogo, setIsHanaLogo] = useState(true);
  const [animationClass, setAnimationClass] = useState(
    "animate__animated animate__fadeIn"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationClass("animate__animated animate__fadeOut");
      setTimeout(() => {
        setIsHanaLogo((prevIsHanaLogo) => !prevIsHanaLogo);
        setAnimationClass("animate__animated animate__fadeIn");
      }, 500); // fadeOut 애니메이션 후 로고 변경
    }, 3000); // 3초마다 변경

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 정리
  }, []);

  return (
    <div className="logo-container">
      <div className={animationClass}>
        {isHanaLogo ? (
          <HanaLogoWrapper href="/" className="HanaLogoWrapper">
            {/* <img src="hana_logo.png" alt="하나 로고" className="logo-image" /> */}
            <img src="/img_logo.png" alt="하나 로고" className="logo-image" />
            {/* <span>하나손해보험</span> */}
          </HanaLogoWrapper>
        ) : (
          <LogoContainer href="/" title="하나미니">
            <span className="logo">
              <Co1>Hana</Co1>Mini
            </span>
          </LogoContainer>
        )}
      </div>
    </div>
  );
};

export default LogoSwitcher;
