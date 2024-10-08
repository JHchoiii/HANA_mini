// src/components/MyInsHeader.js
// import ExpandingSearchBar from "./ExpandSearchBar.js";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LogoSwitcher from "./LogoSwitcher.js";
import { Link } from "react-router-dom";
import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { SlideButton, AvatarButton } from "./StyledComponents.js";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store.js";

const HeaderContainer = styled.header`
  position: absolute;
  top: 0;
  left: 10%;
  width: 87%;
  padding: 20px;
  z-index: 1000;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ExpandingSearchBar = styled.div`
  width: ${(props) => (props.expanded ? "300px" : "80px")};
  transition: width 0.4s ease;
  border-radius: 30px;
  background-color: #fff;
  padding: 5px 10px;

  &:hover {
    cursor: text; /* 마우스 커서를 텍스트 입력 커서로 변경 */
  }

  input {
    width: 100%;
    border: none;
    background: transparent;
    color: #000;
    opacity: ${(props) => (props.expanded ? 1 : 0)};
    pointer-events: ${(props) => (props.expanded ? "auto" : "none")};
    transition: opacity 0.4s ease;
  }
`;

const PopupMenu = styled.div`
  position: absolute;
  top: 115%; /* AvatarButton 바로 밑에 위치하게 설정 */
  right: -45%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  z-index: 1001;
  text-align: center;

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin: 0 auto 10px; /* 이미지가 중앙에 오도록 설정 */
  }

  .email {
    font-size: 14px;
    color: #666;
    margin-bottom: 10px;
  }

  .welcome-message {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 49.7%; /* 두 버튼이 가로로 배치되고 여유 공간이 생기도록 */
      padding: 10px 0;
      // background-color: #f1f3f4;
      border: 0.5px solid #ccc;
      // border-radius: 5px;
      text-decoration: none;
      color: black;
      box-sizing: border-box;
      font-size: 14px;
      font-weight: 500;
      transition: background-color 0.3s;

      &:hover {
        background-color: #54d2c4;
      }
    }
  }
`;

const Spacer = styled.div`
  height: 130px; // 헤더의 높이와 일치하게 설정
  background-color: transparent; // 헤더와 같은 배경색으로 설정
`;

const Header2 = () => {
  const [expanded, setExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 추가

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch(); // Redux dispatch 사용

  const popupRef = useRef(null);

  const togglePopup = () => {
    setShowPopup(!showPopup); // 팝업 열기/닫기 토글
  };

  const handleLogout = () => {
    dispatch(logout());
    setShowPopup(false); // 팝업 닫기
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false); // 팝업 외부 클릭 시 닫기
    }
  };

  useEffect(() => {
    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <>
      <HeaderContainer>
        <h1 className="Header-item-1">
          <LogoSwitcher />
        </h1>

        <ul class="font-hanaLight flex space-x-[50px] mt-10 ml-[130px] font-medium">
          <li class="relative group">
            <Link
              to="/MyIns"
              className="text-lg text-gray-600 hover:text-[#54d2c4]"
            >
              마이 보험
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#54d2c4] transition-all duration-300 group-hover:w-full"></div>
          </li>
          <li class="relative group">
            <Link
              to="/MyInsRec"
              className="text-lg text-gray-600 hover:text-[#54d2c4]"
            >
              미니 추천
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#54d2c4] transition-all duration-300 group-hover:w-full"></div>
          </li>
          <li class="relative group">
            <Link
              to="/InsProd"
              className="text-lg text-gray-600 hover:text-[#54d2c4]"
            >
              보험 상품
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#54d2c4] transition-all duration-300 group-hover:w-full"></div>
          </li>
          <li class="relative group">
            <Link
              to="/InsGift"
              className="text-lg text-gray-600 hover:text-[#54d2c4]"
            >
              선물하기
            </Link>
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#54d2c4] transition-all duration-300 group-hover:w-full"></div>
          </li>
        </ul>

        <div className="Header-item-3 flex items-center">
          <ExpandingSearchBar
            expanded={expanded ? "true" : undefined} // string 값으로 전달하거나 속성을 생략
            onClick={() => setExpanded(true)}
            onBlur={() => setExpanded(false)}
            className="mt-[25px] mr-[20px] shadow"
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaSearch color="#000" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search"
                onFocus={() => setExpanded(true)}
                onBlur={() => setExpanded(false)}
              />
            </InputGroup>
          </ExpandingSearchBar>
          {user ? (
            // 로그인된 상태에서는 AvatarButton을 사용하여 사용자 이름과 아바타를 표시
            <div className="relative">
              <AvatarButton
                style={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  borderRadius: "30px",
                  top: "7px",
                }}
                className="shadow"
                onClick={togglePopup} // 아바타 버튼 클릭 시 팝업 토글
              >
                <img
                  src="/avatar_example.png" // 사용자 아바타 이미지 경로
                  alt="User Avatar"
                />
                <span>{user.name}</span>
              </AvatarButton>
              {showPopup && (
                <PopupMenu ref={popupRef}>
                  <img
                    src="avatar_example.png" // 사용자 아바타 이미지 경로
                    alt="User Avatar"
                    className="avatar"
                  />
                  <p className="email">{user.id}</p>
                  <p className="welcome-message">
                    안녕하세요, {user.name}님.
                  </p>{" "}
                  <div className="actions">
                    <Link
                      to="/profile"
                      className="flex-1 px-4 py-2 bg-[#b1dcd7bd] text-center rounded-l-[25px] hover:bg-[#54d2c4]"
                    >
                      회원정보 수정
                    </Link>
                    <a
                      href="#"
                      onClick={handleLogout}
                      className="flex-1 px-4 py-2 bg-[#b1dcd7bd] text-center rounded-r-[25px] hover:bg-[#54d2c4]"
                    >
                      로그아웃
                    </a>
                  </div>
                </PopupMenu>
              )}
            </div>
          ) : (
            <SlideButton
              to="/Login"
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                borderRadius: "30px",
                top: "7px",
              }}
              className="shadow"
            >
              로그인 <ChevronRightIcon />
            </SlideButton>
          )}
        </div>
      </HeaderContainer>
      <Spacer />
    </>
  );
};

export default Header2;
