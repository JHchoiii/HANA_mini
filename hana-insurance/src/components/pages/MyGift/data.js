import { Description } from "@mui/icons-material";

export const insuranceDatas = [
  {
    title: "생활",
    img: "/giftImg_6.png",
    description: "생활 속에서 필요한 보험들을 보장합니다",
    tags: ["생명보험", "질병보장", "종신보장"],
  },
  {
    title: "건강",
    img: "/giftImg_2.png",
    description: "암보험으로 든든한 암보장, 나와 가족의 안심",
    tags: ["암보장", "수술비", "암치료"],
  },
  {
    title: "여행",
    img: "/giftImg_9.png",
    description: "여행지에서 일어날 수 있는 위험을 보장합니다.",
    tags: ["여행자 보험", "위험보장", "응급보장"],
  },
  {
    title: "자동차",
    img: "/giftImg_8.png",
    description: "차량 사고에 대한 보장으로 안전한 운전 생활",
    tags: ["자동차보험", "대인배상", "대물배상"],
  },
  {
    title: "운전자",
    img: "/giftImg_5.png",
    description: "운전자 보험으로 더욱 안전하게 운전하세요",
    tags: ["운전사고", "교통사고", "보장"],
  },
  {
    title: "여가",
    img: "/giftImg_3.png",
    description: "건강보험으로 다양한 질병에 대비하세요.",
    tags: ["건강보장", "질병보장", "의료비"],
  },
  {
    title: "사고",
    img: "/giftImg_7.png",
    description: "여가 생활에 대한 보험으로 마음 편하게 즐기세요.",
    tags: ["레저보장", "여가생활", "보장"],
  },
];

export const popluarInsuranceDatas = [
  {
    title: "뇌심안심건강공제",
    description: "소중한 내 가족을 위한 현명한 선택!",
    tags: ["뇌보장", "수술 특약", "20세부터 70세까지 가입가능"],
  },
  {
    title: "뇌심안심건강공제",
    description: "소중한 내 가족을 위한 현명한 선택!",
    tags: ["뇌보장", "수술 특약", "20세부터 70세까지 가입가능"],
  },
  {
    title: "뇌심안심건강공제",
    description: "소중한 내 가족을 위한 현명한 선택!",
    tags: ["뇌보장", "수술 특약", "20세부터 70세까지 가입가능"],
  },
];

export const insurancePlans = {
  종합형: {
    price: "11,530원",
    details: [
      "대인배상(대인 II) 무한",
      "대인배상Ⅰ지원금 특약 1억5천만원",
      "대물배상 3천만원",
      "타인차량 복구비용 자기부담금 50만원",
      "자기신체사고 3천만원",
      "무보험차상해 2억원",
      "법률비용특약 가입",
    ],
    tags: ["무한대인", "대물배상", "자기신체사고"],
    modalContent: "종합형 플랜에 대한 상세 설명이 여기에 들어갑니다.",
  },
  기본형: {
    price: "8,750원",
    details: [
      "대인배상(대인 II) 무한",
      "대물배상 1억원",
      "자기신체사고 3천만원",
      "타인차량 복구비용",
    ],
    tags: ["대인배상", "대물배상"],
    modalContent: "기본형 플랜에 대한 상세 설명이 여기에 들어갑니다.",
  },
  최소형: {
    price: "7,000원",
    details: ["대인배상(대인 II) 무한", "대물배상 1억원", "자기신체사고"],
    tags: ["대인배상", "대물배상"],
    modalContent: "최소형 플랜에 대한 상세 설명이 여기에 들어갑니다.",
  },
  차량손해보장형: {
    price: "1,750원",
    details: ["타인차량 복구비용"],
    tags: ["타인차량복구"],
    modalContent: "차량손해보장형 플랜에 대한 상세 설명이 여기에 들어갑니다.",
  },
};
