import Header2 from "../../../Header2";
import Footer from "../../../footer";
import "swiper/css";
import "swiper/swiper-bundle.css";
import "../../../css/Custom.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import CoinAnimation from "./CoinAnimation";
import Dropdown from "./Dropdown";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom"; // Link import
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { setProductName } from "../../../../store";
// Swiper의 모듈 사용
SwiperCore.use([Pagination]);

const OnedayCarGift = () => {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch(); // 디스패치 가져오기

  const controls = useAnimation();
  const { ref, inView } = useInView({
    threshold: 0.1, // 요소가 10%만큼 보이면 inView가 true가 됩니다.
  });

  const messages = [
    {
      text: "내차를 지인 · 가족에게 하루만 빌려줘야 해요",
      avatar:
        "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/intro/icon_dialouge_pic04.svg",
      align: "left",
    },
    {
      text: "지금 당장 보험 가입이 필요해요",
      avatar:
        "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/intro/icon_dialouge_pic05.svg",
      align: "right",
    },
    {
      text: "혹시 모를 사고에 대비해 안전하게 보장받고 싶어요",
      avatar:
        "https://day.hanainsure.co.kr/static/resources/platform/oneday/images/intro/icon_dialouge_pic06.svg",
      align: "left",
    },
    {
      text: "가족과 지인들에게 원데이자동차®보험을 선물하세요",
      avatar: null, // 마지막 메시지는 이미지가 없습니다.
      align: "center", // 가운데 정렬을 위한 align 설정
    },
  ];

  useEffect(() => {
    dispatch(setProductName("원데이자동차®보험")); // 페이지 로드 시 바로 저장
  }, [dispatch]); // 빈 배열이므로 한 번만 실행됨

  useEffect(() => {
    if (inView) {
      setVisibleMessages([]);
      messages.forEach((message, index) => {
        setTimeout(() => {
          setVisibleMessages((prevMessages) => {
            if (!prevMessages.includes(message)) {
              return [...prevMessages, message];
            }
            return prevMessages;
          });
        }, index * 600); // 2초 간격으로 메시지 추가
      });

      // 애니메이션 시작
      controls.start("visible");
    } else {
      // 뷰포트에서 벗어나면 애니메이션을 초기화
      setVisibleMessages([]);
      controls.start("hidden");
    }
  }, [inView]);

  return (
    <div className="MyIns overflow-auto bg-[#f2f6f5]">
      <Header2 />
      <div className="mt-10 bg-[#E0FFE3] rounded-[20px] flex flex-col justify-center">
        <h1 className="m-5 text-center text-[30px] font-[1000]">
          원데이자동차®보험(선물)
        </h1>
        <img
          src="https://www.hanacapital.co.kr/assets/img-long-term-car-rental-main.png"
          alt="자동차 이미지"
          className="car-image"
        />
      </div>

      <div className="flex justify-around items-start mx-10 my-20">
        <div className="flex flex-col items-center text-center w-[300px] relative">
          <img
            src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance_intro/sub-7day-1.svg"
            alt="아이콘 1"
            className="w-25 h-25 mb-4 animate__animated animate__fadeInLeft animate__delay-0.7s"
          />
          <h2 className="text-lg font-bold h-[30px]">원하는 기간만큼</h2>
          <h2 className="text-lg font-bold h-[30px]">최대 7일</h2>
          <p className="text-sm h-[50px]">당일 가입도 가능!</p>
          <div className="absolute right-0 top-[20%] h-[55%] border-r border-gray-300"></div>
        </div>
        <div className="flex flex-col justify-center items-center text-center w-[300px] relative">
          <CoinAnimation className="w-25 h-25 mb-4" />{" "}
          <h2 className="text-lg font-bold h-[30px] mb-2">
            부담없는 <br />
            보험료
          </h2>
          <p className="text-sm h-[50px]">
            <br />
            승용차 전 모델
            <br />
            (국산차, 수입차)
          </p>
          <div className="absolute right-0 top-[20%] h-[60%] border-r border-gray-300"></div>
        </div>
        <div className="flex flex-col items-center text-center w-[300px]">
          <img
            src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/insurance_intro/sub-gift-3.svg"
            alt="아이콘 3"
            className="w-[90px] h-[90px] mb-6 animate__animated animate__fadeInRight animate__delay-1.4s"
          />
          <h2 className="text-lg font-bold h-[30px] mb-3">
            운전가능한 <br />
            누구에게나
          </h2>
          <p className="text-sm h-[50px]">
            <br />
            간편하고 빠르게 가입가능
          </p>
        </div>
      </div>

      <div
        ref={ref}
        className="bg-gradient-to-b from-pink-500 to-purple-500 p-10 text-white text-center w-[800px] h-[450px] rounded-[20px]"
      >
        <h2 className="text-2xl font-bold mb-6">이럴 때 추천합니다!</h2>
        <div className="flex flex-col gap-4">
          {visibleMessages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`flex items-center ${
                message.align === "left"
                  ? "justify-start"
                  : message.align === "right"
                  ? "justify-end"
                  : "justify-center"
              } ${message.align === "center" ? "bg-transparent" : "bg-white"} ${
                message.align === "center" ? "" : "rounded-full"
              } p-3`}
            >
              {message.avatar && message.align !== "center" && (
                <motion.img
                  src={message.avatar}
                  alt="avatar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className={`w-10 h-10 rounded-full ${
                    message.align === "right" ? "order-last ml-3" : "mr-3"
                  }`}
                />
              )}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
                className={`${
                  message.align === "center"
                    ? "text-white text-[25px] mt-4 font-[300]"
                    : "text-black"
                }`}
              >
                {message.text}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="intro-video my-[50px] w-[800px] h-[450px] rounded-[20px] overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          title="원데이 자동차보험"
          src="https://youtube.com/embed/8S8mTDRT7GU?autoplay=0"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <Dropdown title="상품안내">
        <div className="mx-[25px]">
          <ul className="pink-custom-list-dot text-gray-800 text-[14px] ">
            <li>
              원데이자동차®보험의 보험기간은 첫 날 개시시간부터 마지막 날
              종료시간까지입니다.
            </li>
            <li>
              타인차량 복구비용은 빌린 차량의 일방적인 과실사고의 경우 실제 수리
              시에만 보상이 가능합니다.
            </li>
            <li>
              본인의 차량을 타인이 운전하는 경우 차량 소유주(본인)가 운전자에게
              원데이보험을 선물할 수 있습니다.
            </li>
            <li>
              보험기간은 최대 7일까지 선택 가능하며, 보험시작일은
              운전자(선물받은 분)이 선택할 수 있습니다. (단, 선물한 날로부터 7일
              이내 선물등록이 되지 않으면 자동취소 됩니다.)
            </li>
          </ul>

          <div class="text-gray-800 text-[14px] flex my-6">
            <img src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg" />
            <span className="ml-2">
              순수보장형 상품으로 보험계약 만기 시 지급하는 만기환급금이 없는
              상품입니다.
            </span>
          </div>
        </div>
      </Dropdown>
      <Dropdown title="상품구성">
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-4 py-2">담보명</th>
                <th className="text-center px-4 py-2">최소형</th>
                <th className="text-center px-4 py-2">기본형</th>
                <th className="text-center px-4 py-2">중형형</th>
                <th className="text-center px-4 py-2">종합형</th>
                <th className="text-center px-4 py-2">종합안심형</th>
                <th className="text-center px-4 py-2">차량손해 보장형</th>
              </tr>
            </thead>
            <tbody>
              {[
                "대인 배상 (대인 II)",
                "대물 배상",
                "자기 신체 사고",
                "자동차상해",
                "무보험 자동차에 의한 상해",
                "타인차량 복구 비용",
                "대인 배상 II 지급금 특약",
                "법률비용 지원 특약",
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item}</td>
                  {Array(6)
                    .fill(0)
                    .map((_, i) => (
                      <td key={i} className="text-center px-4 py-2">
                        {i === index % 6 ? "○" : ""}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Dropdown>
      <Dropdown title="보장한도">
        <div className="overflow-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-4 py-2">담보명</th>
                <th className="text-left px-4 py-2">지급사유 / 보장한도</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  title: "대인배상 (대인 II)",
                  details:
                    "- 사고로 다른 사람을 죽게 하거나 다치게 한 경우\n- 피해자 1인당 무한 (대물배상 I 초과)",
                },
                {
                  title: "대물배상",
                  details:
                    "- 사고로 다른 사람의 재물을 없애거나 훼손한 경우\n- 사고당 최고 1억원",
                },
                {
                  title: "자기신체사고",
                  details:
                    "- 사고로 피보험자가 죽거나 다친 경우\n- 피해자 1인당 최고 1.5억원(사망: 최고 1.5억원한도)",
                },
                {
                  title: "자동차상해",
                  details:
                    "- 사고로 피보험자가 죽거나 다친 경우\n- 피해자 1인당 최고 1억원 (사망: 최고 1억원한도)",
                },
                {
                  title: "무보험자동차에 의한 상해",
                  details:
                    "- 타인의 차량이 없을 때나 무보험자동차에 의하여 피보험자가 죽거나 다친 경우\n- 피해자 1인당 최고 2억원",
                },
                {
                  title: "타인차량 복구비용",
                  details:
                    "- 사고로 피보험자가 피보험자가 다른 차를 빌렸을 때나\n- 피해자 1인당 최고 2천만원",
                },
                {
                  title: "대인배상 II 지급금 특약",
                  details:
                    "- 피보험자가 대인배상 II에 가입된 차량과 대인배상 I 이상 담보하는 금액을 피해자에게 지급한 경우 실제 지급금액 보전",
                },
                {
                  title: "법률비용 지원 특약",
                  details:
                    "- 사고로 다른 사람을 죽게 하거나 다치게 하여 형사상 책임을 지는 경우\n- 형사합의지원금: 최고 3천만원 한도",
                },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{item.title}</td>
                  <td className="px-4 py-2 whitespace-pre-line">
                    {item.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div class="text-gray-800 text-[14px] flex my-6">
          <img src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg" />
          <span className="ml-2">
            상품 플랜에따라 보장내용이 달라질 수 있습니다.
          </span>
        </div>
      </Dropdown>
      <Dropdown title="알아두실사항">
        <ul className="list-none pl-4 space-y-4">
          <li>
            <h3 className="text-m font-bold mb-5">보험계약 체결 전 유의사항</h3>
            <ul className="list-disc pl-3 pink-custom-list-dot">
              <li>
                보험계약의 체결 전 보험상품설명서, 약관, 청약서류(청약서 사본은
                계약자에게 교부), 상품 설명서 등을 반드시 수령하시고, 보장내용을
                반드시 확인하시기 바랍니다.
              </li>
              <li>
                계약자가 계약에 있어 이를 충분히 이해할 수 있도록 설명을
                받으시기 바랍니다.
              </li>
              <li>
                기타 필요한 사항들은 보험계약자보호를 위한 법률과 규정,
                감독당국의 지시에 따라 고객이 이해할 수 있도록 충분히 설명될
                것입니다.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-m font-bold mb-5 ">계약 전 알릴 의무</h3>
            <ul className="list-disc pl-6 pink-custom-list-dot">
              <li>
                계약자 또는 피보험자는 청약의 철 정하여제시 질문한 사항에 대하여
                알고 있는 사실을 반드시 사실대로 알려야 합니다. 만약에 따라 알릴
                의무 위반 시 계약이 해제되거나 보장이 제한될 수 있습니다.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-m font-bold mb-5 ">계약 후 알릴 의무</h3>
            <ul className="list-disc pl-6 pink-custom-list-dot">
              <li>
                계약자 또는 피보험자는 보험계약의 효력 중 보험계약에 정한 계약
                후 알릴 의무 사항이 발생하였을 경우 회사에 지체없이 알려야
                합니다. 그렇지 않을 경우 보험금 지급이 거절되거나 계약이 해지될
                수 있습니다.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-m font-bold mb-5 ">품질보증제도</h3>
            <ul className="list-disc pl-6 pink-custom-list-dot">
              <li>
                이 상품은 무배당 상품으로 품질보증제도의 적용을 받지 않습니다.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-m font-bold mb-5 ">청약철회 청구제도</h3>
            <ul className="list-disc pl-6 pink-custom-list-dot">
              <li>
                보험계약자는 보험증권을 받은 날부터 15일 이내(청약일로부터는
                30일 이내)에 청약을 철회할 수 있으며, 청약철회는 서면으로 청구할
                수 있습니다.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-m font-bold mb-5 ">위험계약 해지권</h3>
            <ul className="list-disc pl-6 pink-custom-list-dot">
              <li>
                회사는 계약전 알릴의무사항 또는 계약후 알릴의무사항에 대해
                중요한 사항이 고지되지 않은 경우 계약을 해지할 수 있으며,
                보험계약의 해지시 이미 납입한 보험료는 환급되지 않습니다.
              </li>
            </ul>
          </li>
          <li>
            <h3 className="text-m font-bold mb-5 ">예금자보호 안내</h3>
            <ul className="list-disc pl-6 pink-custom-list-dot">
              <li>
                이 보험은 예금자보호법에 따라 예금보험공사가 보호하지 않습니다.
              </li>
            </ul>
          </li>
        </ul>
      </Dropdown>

      {/* PDF 보기 버튼 */}
      <div
        className="w-[800px] m-1 flex justify-between items-center p-4 bg-white cursor-pointer hover:bg-gray-100 transition-colors duration-200 group" // group 클래스 추가
        onClick={() => setShowModal(true)} // 구역 클릭 시 모달 열기
      >
        <span className="ml-4 font-bold">약관보기</span>
        <span className="relative bg-gray-600 text-white text-xs font-semibold px-2 py-1 rounded transition-colors duration-200 group-hover:bg-[#dc70a7]">
          PDF
        </span>
      </div>

      {/* PDF 모달 */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)} // 모달 닫기
        className="w-[80%] h-[80%] bg-white rounded-lg shadow-lg p-4 overflow-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <button
          onClick={() => setShowModal(false)}
          className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
        >
          닫기
        </button>
        <embed
          src="/OneDayCarInsPDF.pdf"
          width="100%"
          height="100%"
          type="application/pdf"
        />
      </Modal>

      <Link to="/InsGift/giveGift/Step0101">
        <button className="w-[250px] h-[55px] m-[50px] bg-[#dc70a7] hover:bg-black rounded-[30px] text-white font-bold py-2 px-4 shadow-md transition duration-300">
          선물하기
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default OnedayCarGift;
