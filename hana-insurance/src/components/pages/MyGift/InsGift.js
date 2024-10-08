import Header2 from "../../Header2";
import Footer from "../../footer";
import "swiper/css";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { insuranceDatas, popluarInsuranceDatas } from "./data";
import InsuranceTypeBtn from "./InsuranceTypeBtn";
import PopGifts from "./popGift";
import { useNavigate } from "react-router-dom"; // useNavigate import

// Swiper의 모듈 사용
SwiperCore.use([Pagination]);

const InsGift = () => {
  const [currentSlide, setCurrentSlide] = useState();
  const [swiperInstance, setSwiperInstance] = useState(null);
  const navigate = useNavigate();

  const currentSlideStyle = {
    transition: "all 1000ms ease-in-out",
    backgroundColor: "#54d2c4",
    width: "600px",
    borderRadius: "20px",
    textOverflow: "hidden",
  };
  const notCurrentSlideStyle = {
    backgroundColor: "#A0AEC0",
    width: "350px",
    marginLeft: "6px",
    borderRadius: "20px",
    textOverflow: "hidden",
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.realIndex); // Swiper의 실제 인덱스 사용
  };

  const handlePrevClick = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperInstance.activeIndex - 1); // 이전 슬라이드로 이동
    }
  };

  const handleNextClick = () => {
    if (swiperInstance) {
      swiperInstance.slideTo(swiperInstance.activeIndex + 1); // 다음 슬라이드로 이동
    }
  };

  useEffect(() => {
    if (swiperInstance || currentSlide === null) {
      // Swiper 인스턴스가 준비되고 처음 슬라이드 설정할 때만 실행swiperInstance.activeIndex
      setCurrentSlide(swiperInstance.activeIndex);
    }
  }, [swiperInstance, currentSlide]);

  // 슬라이드 클릭 시 호출될 함수
  const handleSlideClick = () => {
    navigate("/InsGift/ProductDetail/OnedayCarGift");
  };

  return (
    <div className="MyIns overflow-auto bg-[#f2f6f5] ">
      <Header2 />
      <div
        className=" h-[200px] w-[1200px] top-[120px] rounded-[20px] bg-cover"
        style={{ backgroundImage: "url('/rainbow_BG.jpg')" }}
      >
        <p className="mt-[50px] z-10 flex itmes-center justify-center font-hanaLight ">
          <strong className="text-[35px] ">미니 선물하기</strong>
        </p>
        <p className="text-[25px] mt-[20px] z-10 flex itmes-center justify-center font-hanaLight ">
          소중한 분들에게 든든함을 선물하세요
        </p>
      </div>
      {/* 선물하기 이용법 (24.8.30) */}
      <div className="flex gap-5 my-14">
        {insuranceDatas.map((data, i) => (
          <InsuranceTypeBtn
            key={i}
            data={data}
            bgColor={
              currentSlide === i ? "bg-[#54d2c4] text-white" : "bg-white"
            }
            setCurrentSlide={() => swiperInstance.slideTo(i)}
          />
        ))}
      </div>
      <div className="flex justify-center relative">
        <Swiper
          onSwiper={setSwiperInstance}
          spaceBetween={30}
          slidesPerView={3} // 한 번에 1.5 슬라이드를 보여줌
          centeredSlides={true} // 슬라이드를 중앙 정렬
          slidesPerGroup={1} // 한 번에 하나의 슬라이드만 이동
          style={{ width: "1200px", height: "376px", textOverflow: "hidden" }}
          onSlideChange={handleSlideChange}
          grabCursor={true}
        >
          {/* {insuranceDatas.map((_, i) => (
            <SwiperSlide
              key={i}
              style={
                currentSlide === i ? currentSlideStyle : notCurrentSlideStyle
              }
              className="rounded-[20px]"
            >
              <div className="h-[250px] flex items-center justify-center rounded-[20px]">
                <p>{_.title}</p>
              </div>
            </SwiperSlide>
          ))} */}

          {insuranceDatas.map((data, i) => (
            <SwiperSlide
              key={i}
              style={
                currentSlide === i
                  ? currentSlideStyle
                  : {
                      ...notCurrentSlideStyle,
                      backgroundImage: `url(${data.img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
              }
              className="rounded-[20px]"
              onClick={handleSlideClick}
            >
              <div className="h-[250px] flex flex-col justify-between rounded-[20px]">
                <div className="w-full h-full p-8 flex flex-col justify-between items-start rounded-[20px]">
                  <h2
                    className={
                      currentSlide === i
                        ? "text-black text-[24px] font-bold"
                        : "text-white text-[24px] font-bold"
                    }
                  >
                    {data.title}
                  </h2>

                  {/* 슬라이드 선택 시 더 많은 정보 표시 */}
                  {currentSlide === i && (
                    <div className="mt-4 w-full">
                      <p
                        className="text-white text-[16px]"
                        style={{
                          whiteSpace: "nowrap", // 줄바꿈 방지
                          overflow: "hidden", // 넘치는 텍스트 숨기기
                          textOverflow: "ellipsis", // 넘치는 부분을 생략 부호(...)로 표시
                        }}
                      >
                        {data.description}
                      </p>

                      {/* 구분선 추가 */}
                      <hr className="border-t border-white mt-[180px]" />

                      {/* 자세히 보기 버튼 */}
                      <a
                        href="#"
                        className="text-black font-bold mt-5 flex justify-between"
                        style={{ textDecoration: "none" }} // 밑줄 제거
                      >
                        자세히 보기
                        <img
                          className="w-10 h-10"
                          src="/arrow-btn2.png"
                          alt="자세히 보기 화살표"
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute left-[130px] bottom-[-60px] text-black font-bold text-[20px]">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(insuranceDatas.length).padStart(2, "0")}
        </div>
        {/* Custom Navigation Buttons */}
        <div className="absolute flex items-center w-[100px] bottom-[-60px] right-[200px]">
          <div
            onClick={handlePrevClick}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "black",
              fontSize: "50px",
              marginRight: "10px",
            }}
          >
            ←
          </div>
          <div
            onClick={handleNextClick}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "black",
              fontSize: "50px",
            }}
          >
            →
          </div>
        </div>
      </div>
      <div className="my-36 flex flex-col justify-center gap-10">
        <h1 className="text-[30px]">
          고객님을 위한 추천상품을 준비해 보았어요!
        </h1>
        <div className="flex gap-6">
          {popluarInsuranceDatas.map((data, i) => (
            <PopGifts key={i} data={data} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InsGift;
