// src/App.js
import React from "react";
import MainVisual from "./components/pages/MainVisual";
import MyIns from "./components/pages/MyPage/MyIns";
import Claim1 from "./components/pages/MyPage/Claim/Claim1";
import Claim2 from "./components/pages/MyPage/Claim/Claim2";
import InsReview from "./components/pages/MyPage/Review/InsReview";
import MyInsDetail from "./components/pages/MyPage/MyInsDetail/MyInsDetail";
import MyGiftDetail from "./components/pages/MyPage/MyGift/MyGiftDetail";
import MyInsRecList from "./components/pages/MyPage/MyInsRec/MyInsRecList";
import InsRecChoice from "./components/pages/MyInsRec/Rec/InsRecChoice";
import MyPoint from "./components/pages/MyPage/MyPoint/MyPoint";
import GiftRegistration from "./components/pages/MyGift/Registration/GiftRegistration";
import InsuranceRegistration from "./components/pages/MyGift/Registration/InsuranceRegistration";
import SignatureCanvasRegistration from "./components/pages/MyGift/Registration/SignatureCanvasRegistration";
import GiftRegistrationComplete from "./components/pages/MyGift/Registration/GiftRegistrationComplete";

import CheckInfo from "./components/pages/MyInsRec/Rec/CheckInfo";
// import LoanProducts from "./components/LoanProducts";
import Login from "./components/pages/Login/Login";
import InsProd from "./components/pages/MyProd/InsProd";
import HealthGradeProd from "./components/pages/MyProd/ProductDetail/HealthGradeProd";

import InsGift from "./components/pages/MyGift/InsGift";
import Test from "./components/pages/Test";
import { Routes, Route, Link } from "react-router-dom";
import InsRec from "./components/pages/MyInsRec/Rec/InsRec";
import MyInsRec from "./components/pages/MyInsRec/MyInsRec";
import InsRecResult from "./components/pages/MyInsRec/Rec/InsRecResult";
import InsRecResult2 from "./components/pages/MyInsRec/Rec/InsRecResult2";
import InsRecChainProd from "./components/pages/MyInsRec/Chain/InsRecChainProd";
import InsRecChainProdResult from "./components/pages/MyInsRec/Chain/InsRecChainProdResult";

import OnedayCarGift from "./components/pages/MyGift/ProductDetail/OnedayCarGift";
import DomesticTravelProd from "./components/pages/MyProd/ProductDetail/DomesticTravelProd";

import Step0101 from "./components/pages/MyGift/GiveGift/Step0101";
import Step0102 from "./components/pages/MyGift/GiveGift/Step0102";
import Step0103 from "./components/pages/MyGift/GiveGift/Step0103";
import Step0104 from "./components/pages/MyGift/GiveGift/Step0104";
import Step0105 from "./components/pages/MyGift/GiveGift/Step0105";
import Step0106 from "./components/pages/MyGift/GiveGift/Step0106";
import Step0501 from "./components/pages/MyGift/GiveGift/Step0501";

import Dashboard from "./components/dashboard/Dashboard";
import VideoConsultationPage from "./components/dashboard/VideoConsultationPage";
import DashboardPage from "./components/dashboard/DashboardPage";
import Temp from "./components/pages/MyProd/temp";
import FloatingWidget from "./components/FloatingWidget"; // 플로팅 위젯 임포트
import ClaimManagementPage from "./components/dashboard/ClaimManagementPage";

import "animate.css";

import "./App.css";

const App = () => {
  const roomId = "test-room"; // 동일한 방 ID 사용

  return (
    <div className="App">
      <FloatingWidget />
      <Routes>
        <Route path="/" element={<MainVisual />} />
        <Route path="/Test" element={<Test roomId={roomId} />} />
        <Route path="/temp" element={<Temp />} />

        <Route path="/dashboard" element={<Dashboard />}>
          {/* 대시보드 기본 페이지 */}
          <Route path="main" element={<DashboardPage />} />
          {/* 회원 상담 페이지 */}
          <Route
            path="consultation"
            element={<VideoConsultationPage roomId="test-room" />}
          />
          <Route path="claimManagement" element={<ClaimManagementPage />} />
        </Route>
        {/* 데이터를 MainVisual에 전달 */}
        <Route path="/MyIns" element={<MyIns />} />
        <Route path="/MyIns/Claim1" element={<Claim1 />} />
        <Route path="/MyIns/ClaimList" element={<Claim2 />} />
        <Route path="/MyIns/MyInsDetail" element={<MyInsDetail />} />
        <Route path="/MyIns/MyGiftDetail" element={<MyGiftDetail />} />
        <Route path="/MyIns/InsReview" element={<InsReview />} />
        <Route path="/MyIns/MyInsRecList" element={<MyInsRecList />} />
        <Route path="/MyIns/MyPoint" element={<MyPoint />} />

        <Route path="/MyInsRec" element={<MyInsRec />} />
        <Route path="/MyInsRec/InsRec" element={<InsRec />} />
        <Route path="/MyInsRec/InsRecResult" element={<InsRecResult />} />
        <Route path="/MyInsRec/InsRecResult2" element={<InsRecResult2 />} />

        <Route path="/MyInsRec/InsRecChainProd" element={<InsRecChainProd />} />
        <Route
          path="/MyInsRec/InsRecChainProdResult"
          element={<InsRecChainProdResult />}
        />
        <Route path="/MyInsRec/CheckInfo" element={<CheckInfo />} />
        <Route path="/MyInsRec/Choice" element={<InsRecChoice />} />

        <Route path="/InsProd" element={<InsProd />} />
        <Route path="/InsProd/HealthGrade" element={<HealthGradeProd />} />
        <Route
          path="/InsProd/DomesticTravel"
          element={<DomesticTravelProd />}
        />

        <Route
          path="InsGift/ProductDetail/OnedayCarGift"
          element={<OnedayCarGift />}
        />
        <Route path="InsGift/giveGift/Step0101" element={<Step0101 />} />
        <Route path="InsGift/giveGift/Step0102" element={<Step0102 />} />
        <Route path="InsGift/giveGift/Step0103" element={<Step0103 />} />
        <Route path="InsGift/giveGift/Step0104" element={<Step0104 />} />
        <Route path="InsGift/giveGift/Step0105" element={<Step0105 />} />
        <Route path="InsGift/giveGift/Step0106" element={<Step0106 />} />
        <Route path="InsGift/giveGift/Step0501" element={<Step0501 />} />
        <Route
          path="InsGift/giftRegistration/:contractId"
          element={<GiftRegistration />}
        />
        <Route
          path="InsGift/Registration/:contractId"
          element={<InsuranceRegistration />}
        />
        <Route
          path="InsGift/SignatureRegistration/:contractId"
          element={<SignatureCanvasRegistration />}
        />
        <Route
          path="InsGift/RegistrationComplete/:contractId"
          element={<GiftRegistrationComplete />}
        />

        <Route path="/InsGift" element={<InsGift />} />
        <Route
          path="/InsuranceRegistration"
          element={<InsuranceRegistration />}
        />
        {/* <Route path="/InsPayment" element={<InsPayment/>} /> */}
        <Route path="/Login" element={<Login />} />

        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
};

export default App;

//main color : #54d2c4
//Pink : #dc70a7
//main background color : #f2f6f5
