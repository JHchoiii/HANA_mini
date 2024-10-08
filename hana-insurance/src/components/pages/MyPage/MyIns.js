import React, { useState, useEffect } from "react";
import Header2 from "../../Header2";
import Footer from "../../footer";
import Slider from "react-slick";
import { Routes, Route, Link } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { setLoginSuccess, logout } from "../store.js";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "animate.css";
import "../../css/MyIns.css";
ChartJS.register(ArcElement, Tooltip, Legend);

const MyIns = () => {
  const user = useSelector((state) => state.user.userInfo);
  const [insuranceCount, setInsuranceCount] = useState(1);
  const [giftBoxCount, setGiftBoxCount] = useState(1);
  const [availablePoints, setAvailablePoints] = useState(0);

  const [claimData, setClaimData] = useState({
    labels: ["승인 완료", "승인 대기", "거부"],
    datasets: [
      {
        label: "보험 청구 현황",
        data: [0, 0, 0],
        backgroundColor: ["#54d2c4", "#9ceaef", "#c4fff9"],
        hoverBackgroundColor: ["#48b2a5", "#9ceaef", "#c4fff9"],
      },
    ],
  });

  useEffect(() => {
    if (user?.id) {
      // 보험 개수 가져오기
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/count-insurances?memberId=${user.id}`
        )
        .then((response) => {
          setInsuranceCount(response.data);
        })
        .catch((error) => {
          console.error("Error fetching insurance count", error);
        });

      // 선물함 개수 가져오기
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/count-giftBoxes?memberId=${user.id}`
        )
        .then((response) => {
          setGiftBoxCount(response.data);
        })
        .catch((error) => {
          console.error("Error fetching gift box count", error);
        });

      // 포인트
      axios
        .get(`http://localhost:8080/api/user/my-ins/points?memberId=${user.id}`)
        .then((response) => {
          setAvailablePoints(response.data);
        })
        .catch((error) => {
          console.error("Error fetching gift box count", error);
        });
    }
  }, [user]);

  return (
    <div className="MyIns overflow-auto">
      <Header2 />
      <main className="main">
        <div className="content-1">
          <div className="info-box">
            <div className="my-info w-1/2">
              <div className="my-info-content pl-[100px] pt-[70px]">
                <h1 className="text-[38px] font-bold pb-4">
                  {user.name} 고객님 안녕하세요
                </h1>
                <p className="pb-2">이름 : {user.name}</p>
                <p className="pb-2">생년월일 : {user.birthDate}</p>
                <p className="pb-2">연락처 : {user.phone}</p>
                <p className="pb-2">이메일 : {user.email}</p>

                <div className="flex items-center border border-white rounded-3xl w-[140px] p-1 justify-center gap-2">
                  <FaCog />
                  <Link
                    to="/profile-edit"
                    className="hover:underline text-white"
                  >
                    회원정보수정
                  </Link>
                </div>
              </div>
            </div>
            <div className="my-insure w-1/2 flex pt-[180px] pr-[20px] gap-[10px]">
              <InfoBoxContent
                title="보험계약현황"
                count={insuranceCount + "건"}
                linkText="자세히보기"
                link="/MyIns/MyInsDetail"
              />
              <InfoBoxContent
                title="선물함"
                count={giftBoxCount + "건"}
                linkText="자세히보기"
                link="/MyIns/MyGiftDetail"
              />
              <InfoBoxContent
                title="포인트 내역"
                count={availablePoints + "P"}
                linkText="자세히보기"
                link="/MyIns/MyPoint"
              />
            </div>
          </div>

          <Widget memberId={user.id} />
        </div>
        <div className="content-2 flex justify-center mb-[40px] ">
          <Box
            bg="#00bfa5"
            w="80%"
            h="220px"
            p={4}
            color="white"
            className="rounded-[10px] flex justify-center items-center"
          >
            <span className="mr-[40px] text-2xl">
              많이 기다렸어요.
              <br />
              고객님, 우리 친해져요.
            </span>
            <SimpleSlider className="" />
          </Box>
        </div>

        {/* <div className="content-3 flex justify-center mb-[70px]">
          <div className="frequently-visited">
            <div className="frequently-visited-content">
              <h2>자주찾는 상품</h2>
              <p>어떤 상품을 찾으시나요?</p>
            </div>
            <hr />
            <ul className="main_quick_ul flex justify-between space-x-4 py-4 rounded-[40px] shadow-lg">
              {quickMenuItems.map((item, index) => (
                <QuickMenuItem
                  key={index}
                  link={item.link}
                  title={item.title}
                  imgNumber={item.imgNumber}
                />
              ))}
            </ul>
          </div>
        </div> */}

        <div className="content-row"></div>
      </main>
      <Footer />
    </div>
  );
};

export const Widget = ({ memberId }) => {
  const [claimData, setClaimData] = useState({
    labels: ["승인 완료", "승인 대기", "거부"],
    datasets: [
      {
        label: "보험 청구 현황",
        data: [0, 0, 0], // 초기 데이터
        backgroundColor: ["#54d2c4", "#9ceaef", "#c4fff9"],
        hoverBackgroundColor: ["#48b2a5", "#9ceaef", "#c4fff9"],
      },
    ],
  });

  useEffect(() => {
    if (memberId) {
      // memberId를 기반으로 데이터 가져오기
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/claim-status?memberId=${memberId}`
        )
        .then((response) => {
          const data = response.data;

          // 상태별 청구 건수를 배열로 재구성
          const newData = [0, 0, 0];
          data.forEach((item) => {
            if (item.status === "승인 완료") {
              newData[0] = item.count;
            } else if (item.status === "승인 대기") {
              newData[1] = item.count;
            } else if (item.status === "거부") {
              newData[2] = item.count;
            }
          });

          // 차트 데이터 업데이트
          setClaimData((prevState) => ({
            ...prevState,
            datasets: [
              {
                ...prevState.datasets[0],
                data: newData,
              },
            ],
          }));
        })
        .catch((error) => {
          console.error("Error fetching claim status data", error);
        });
    }
  }, [memberId]);

  const options = {
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          boxWidth: 10,
          padding: 10,
          usePointStyle: true,
          pointStyle: "rect",
          maxWidth: 100,
          font: {
            size: 10,
          },
          color: "#000",
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}건`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className="widget flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md w-[250px]">
      <div className="text-center mb-1">
        <h3 className="text-lg font-bold">교통/ 상해/ 건강(질병)</h3>
        <p className="text-xs text-gray-600">한번에 청구 가능!</p>
      </div>

      <div className="flex justify-center items-center">
        <Box className="w-[200px] h-[200px]">
          <Doughnut data={claimData} options={options} />
        </Box>
      </div>

      <div className="my-2 text-center grid grid-cols-2 gap-6">
        <Link to="/MyIns/ClaimList">
          <p className="text-sm font-semibold p-3 border rounded-lg border-teal-400 shadow-md hover:bg-teal-100 transition-colors">
            청구 내역
          </p>
        </Link>
        <p className="text-sm font-semibold p-3 border rounded-lg border-teal-400 shadow-md hover:bg-teal-100 transition-colors">
          보상 내역
        </p>
        {/* <p className="text-sm font-semibold">보험금 청구 서류 제출</p>
        <p className="text-sm font-semibold">보상 상담 받기</p> */}
      </div>

      <Button
        size="sm"
        height="40px"
        width="160px"
        border="2px"
        borderColor="#54d2c4"
        colorScheme="teal"
        className="mt-2"
        as={Link}
        to="/MyIns/Claim1"
      >
        청구하기
      </Button>
    </div>
  );
};

export const InfoBoxContent = ({ title, count, linkText, link }) => {
  return (
    <div className="flex-col  bg-black bg-opacity-30 text-white p-6 rounded-lg w-[180px] h-[180px]">
      <p className="text-xl font-bold pb-[10px] mb-2">{title}</p>
      <p className="text-xl font-semibold pb-[10px] mb-2">{count}</p>
      <Link to={link} className="text-md hover:underline">
        {linkText}
      </Link>
    </div>
  );
};

export const SimpleSlider = () => {
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Box w="70%" color="white" className="rounded-[10px]">
      <Slider {...settings}>
        <SlideItem
          imageUrl="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/icon_story_diagnosis.png"
          text="보험 하나로 진단"
          link="https://day.hanainsure.co.kr/m/hanaroDiagnosis/inc/main" // 클릭 시 이동할 링크
        />
        <SlideItem
          imageUrl="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/icon_story_feed.png"
          text="My 보험 리뷰"
          link="/MyIns/InsReview"
        />
        <SlideItem
          imageUrl="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/main/icon_story_word.png"
          text="My 미니 추천"
          link="/MyIns/MyInsRecList"
        />
        <SlideItem
          imageUrl="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/menu/icon_my_info.svg"
          text="내 정보 수정"
          link="https://example.com/edit"
        />
        <SlideItem
          imageUrl="your-icon-url4.png"
          text="특약 정보 수정"
          link="https://example.com/clauses"
        />
        <SlideItem
          imageUrl="your-icon-url4.png"
          text="문의 하기"
          link="https://example.com/contact"
        />
        {/* 필요에 따라 추가 슬라이드를 넣을 수 있습니다 */}
      </Slider>
    </Box>
  );
};

const SlideItem = ({ imageUrl, text, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center bg-white p-4 rounded-[20px] mx-2 w-[200px]"
    >
      <img src={imageUrl} alt={text} className="w-10 h-10 mr-2" />{" "}
      {/* 아이콘 크기 조정 */}
      <h3 className="text-m font-bold text-black">{text}</h3>{" "}
      {/* 텍스트 크기 조정 */}
    </Link>
  );
};

export default MyIns;
