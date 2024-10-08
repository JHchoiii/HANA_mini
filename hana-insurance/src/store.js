import { jwtDecode } from "jwt-decode"; // jwtDecode를 default import로 변경
import { configureStore, createSlice } from "@reduxjs/toolkit"; // redux-thunk 제거

// 사용자 정보 및 로그인 상태를 관리할 슬라이스 정의
export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: null,
    userInfo: null,
  },
  reducers: {
    setLoginSuccess: (state, action) => {
      const decodedToken = jwtDecode(action.payload.token); // JWT 디코딩
      state.userInfo = {
        id: decodedToken.id,
        name: decodedToken.name,
        birthDate: decodedToken.birthDate,
        gender: decodedToken.gender,
        email: decodedToken.email,
        phone: decodedToken.phone,
        point: decodedToken.point,
      }; // 디코딩한 정보에서 사용자 ID와 이름을 추출
      state.token = action.payload.token; // JWT 토큰을 상태에 저장
      state.isLoggedIn = true;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo)); // 사용자 정보를 로컬스토리지에 저장
      localStorage.setItem("token", state.token); // JWT 토큰을 로컬스토리지에 저장
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
  },
});

export const giftSlice = createSlice({
  name: "gift",
  initialState: {
    insuranceId: "",
    productName: "", // 상품명
    vehicleNumber: "", // 차량번호
    insurancePeriod: "", // 보험기간
    contractHolder: "", // 계약자
    insuredPersonId: "", // 피보험자
    insuredPersonName: "", // 피보험자
    productType: "", // 가입유형 (종합형, 기본형, 최소형 등)
    coverageDetails: [], // 보장내용
    totalPremium: 0, // 총 보험료
    giftPhoneNumbers: [], // 전화번호 저장
    birthDate: "", // 생년월일 (추가)
    isMember: false, // 회원 여부 초기값 (boolean)
    usedPoint: 0, //
  },
  reducers: {
    setInsuranceId: (state, action) => {
      state.insuranceId = action.payload;
    },
    setProductName: (state, action) => {
      state.productName = action.payload;
    },
    setVehicleNumber: (state, action) => {
      state.vehicleNumber = action.payload;
    },
    setInsurancePeriod: (state, action) => {
      state.insurancePeriod = action.payload;
    },
    setContractHolder: (state, action) => {
      state.contractHolder = action.payload;
    },
    setInsuredPersonId: (state, action) => {
      state.insuredPersonId = action.payload;
    },
    setInsuredPersonName: (state, action) => {
      state.insuredPersonName = action.payload;
    },
    setCoverageDetails: (state, action) => {
      state.coverageDetails = action.payload;
    },
    setTotalPremium: (state, action) => {
      state.totalPremium = action.payload;
    },
    setGiftPhoneNumbers: (state, action) => {
      state.giftPhoneNumbers = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload; // 생년월일을 상태에 저장
    },
    setProductType: (state, action) => {
      state.productType = action.payload; // 가입유형을 상태에 저장
    },
    setIsMember: (state, action) => {
      state.isMember = action.payload; // 회원 여부 상태를 업데이트
    },
    setUsedPoint: (state, action) => {
      state.usedPoint = action.payload; // 회원 여부 상태를 업데이트
    },
  },
});

// 액션 export
export const {
  setInsuranceId,
  setProductName,
  setVehicleNumber,
  setInsurancePeriod,
  setContractHolder,
  setInsuredPersonId,
  setInsuredPersonName,
  setCoverageDetails,
  setTotalPremium,
  setGiftPhoneNumbers,
  setBirthDate,
  setProductType,
  setIsMember, // 추가된 setIsMember 액션
  setUsedPoint,
} = giftSlice.actions;

export const { setLoginSuccess, logout } = userSlice.actions;

// 초기 상태를 localStorage에서 불러와 설정
const preloadedState = {
  user: {
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
    token: localStorage.getItem("token") || null,
    isLoggedIn: !!localStorage.getItem("token"),
  },
  gift: {
    insuranceId: "",
    productName: "",
    vehicleNumber: "",
    insurancePeriod: "",
    contractHolder: "",
    insuredPersonId: "",
    insuredPersonName: "",
    subscriptionType: "선물",
    coverageDetails: [],
    totalPremium: 0,
    giftPhoneNumbers: [],
    birthDate: "",
    productType: "",
    isMember: false, // 초기값 설정
    usedPoint: 0,
  },
};

// 스토어를 생성하고 슬라이스의 리듀서를 스토어에 연결
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    gift: giftSlice.reducer,
  },
  preloadedState,
});

export default store;
