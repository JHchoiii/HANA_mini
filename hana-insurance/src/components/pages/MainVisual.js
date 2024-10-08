import React, { useState, useRef, useEffect } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import "animate.css";
import "../css/MainVisual.css";
import {
  VisualArea,
  CustomerService,
  CustomButton,
  NavPanel,
  NavLink,
  SlideOverlay,
  SlideButton,
  CustomerText,
} from "../StyledComponents";
import Header from "../Header";
import { Link } from "react-router-dom";

// Swiper 모듈 사용 설정
SwiperCore.use([Navigation, Pagination, Autoplay]);

const MainVisual = ({ hello }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("");
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
    triggerAnimation();
  };

  const triggerAnimation = () => {
    setAnimationClass("hidden"); // 슬라이드 전환 시 텍스트를 숨기기

    // 슬라이드 전환 후 텍스트 애니메이션 실행
    setTimeout(() => {
      setAnimationClass("animate__animated animate__fadeInUp"); // 애니메이션 시작
    }, 550); // 0.5초 후 애니메이션 시작
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
    triggerAnimation();
  };

  return (
    <div className="MainVisual">
      <Header />
      <p>{hello}</p>
      <VisualArea>
        <NavPanel>
          <NavLink onClick={() => goToSlide(0)} $active={activeIndex === 0}>
            <span style={{ fontSize: "18px", fontWeight: "900" }}>
              마이 보험
            </span>
          </NavLink>
          <NavLink onClick={() => goToSlide(1)} $active={activeIndex === 1}>
            <span style={{ fontSize: "18px", fontWeight: "900" }}>
              미니 추천
            </span>
          </NavLink>
          <NavLink onClick={() => goToSlide(2)} $active={activeIndex === 2}>
            <span style={{ fontSize: "18px", fontWeight: "900" }}>
              보험 상품
            </span>
          </NavLink>
          <NavLink onClick={() => goToSlide(3)} $active={activeIndex === 3}>
            <span style={{ fontSize: "18px", fontWeight: "900" }}>
              보험 선물
            </span>
          </NavLink>
        </NavPanel>

        <Swiper
          direction="vertical"
          spaceBetween={0}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          autoplay={{ delay: 4500 }}
          pagination={{ clickable: true }}
          ref={swiperRef}
          speed={1000} // 슬라이드 전환 속도
        >
          <SwiperSlide>
            <div style={{ position: "relative", height: "100%" }}>
              <img
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
                // src="img_visual01.jpg"
                // src="https://www.finnq.com/images/service/agree/PC/01_Agree_content_01_BG.jpg"
                // src="upscale_sample_fix_1.png"
                src="BG_sample_1_2.png"
              />
              <SlideOverlay className="animate__animated animate__fadeInUp">
                <h1 className={"text-[100px]" + animationClass}>MY 보험</h1>
                <p className={animationClass}>최적의 금융 상품을 선택하세요.</p>
                <SlideButton to="/MyIns" className={animationClass}>
                  내 보험
                  <span style={{ marginLeft: "5px" }}>➜</span>
                </SlideButton>
              </SlideOverlay>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ position: "relative", height: "100%" }}>
              <img
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src="sample_7_2.png"
              />
              <SlideOverlay>
                <h1 className={animationClass}>미니 보험 추천</h1>
                <p className={animationClass}>
                  최적의 미니 보험 상품을 선택하세요.
                </p>
                <SlideButton to="/MyInsRec" className={animationClass}>
                  추천받기
                  <span style={{ marginLeft: "5px" }}>➜</span>
                </SlideButton>
              </SlideOverlay>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ position: "relative", height: "100%" }}>
              <img
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src="BG_sample_3_4.png"
              />
              <SlideOverlay>
                <h1 className={animationClass}>미니 보험 상품</h1>
                <p className={animationClass}>
                  하나 미니에서 제공하는 미니 보험 상품을 확인하세요
                </p>
                <SlideButton to="/InsProd" className={animationClass}>
                  확인하기
                  <span style={{ marginLeft: "5px" }}>➜</span>
                </SlideButton>
              </SlideOverlay>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div style={{ position: "relative", height: "100%" }}>
              <img
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  background: "#f2f6f5",
                }}
                src="BG_sample_6_5.png"
              />
              <SlideOverlay>
                <h1 className={animationClass}>미니 보험 선물하기</h1>
                <p className={animationClass}>
                  소중한 분들에게 든든함을 선물하세요
                </p>
                <SlideButton to="/InsGift" className={animationClass}>
                  선물하기
                  <span style={{ marginLeft: "5px" }}>➜</span>
                </SlideButton>
              </SlideOverlay>
            </div>
          </SwiperSlide>
        </Swiper>

        <CustomerService className="CustomerService animate__animated animate__fadeInRight">
          <div
            className="willBLogin"
            style={{ display: "flex", marginTop: "70px" }}
          >
            {/* <CustomButton href="tel:1588-2271" style={{fontWeight: 'bolder'}}>
            카카오톡<br/>친구추가
          </CustomButton> */}
            <div className="flex flex-col items-start ml-[130px]">
              <span className="text-[13px] text-[#54d2c4] font-bold ">
                공 지 사 항
              </span>
              <h2 className="text-[15px] text-gray-900 font-bold ">
                자동차 보험사기 피해구제
              </h2>
              <p className="text-[14px] text-gray-700 ">
                2024년 4월 15일부터 시범운영, 6월부터 정식운영!
              </p>
              <p className="text-[12px] text-gray-500 py-3">
                #벌점삭제 #범칙금감면 #사고기록삭제
              </p>
              <a
                href="https://aipis.kidi.or.kr:1443/"
                className="text-white bg-[#54d2c4] px-3 py-1 rounded-[30px] text-[12px]"
                target="_blank"
                rel="noopener noreferrer"
              >
                자세히보기 ➜
              </a>
            </div>
          </div>
        </CustomerService>
      </VisualArea>
    </div>
  );
};

export default MainVisual;
