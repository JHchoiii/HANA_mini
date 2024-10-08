import styled from "styled-components";
import { Link } from "react-router-dom";

export const VisualArea = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 714px; /* 전체 슬라이드의 높이를 적절히 조절 */
`;

export const SlideOverlay = styled.div`
  position: absolute;
  top: 25%;
  left: 15%;
  color: black; /* 텍스트 색상을 흰색으로 설정 */
  padding: 20px;
  border-radius: 10px;
  z-index: 2; /* 텍스트 오버레이가 이미지 위에 나타나도록 z-index를 설정 */

  h1 {
    font-size: 40px;
    font-weight: 900;
  }
`;

export const SlideButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  background-color: white;
  border-radius: 50px;
  color: black;
  text-decoration: none;
  font-weight: bold;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  transition: color 0.3s, transform 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #54d2c4;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
    z-index: -1;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    color: white;
    transform: translateY(-0.001px); /* 들썩이는 효과 제거 */
  }

  span {
    margin-left: 5px;
    transition: margin-left 0.3s;
    color: #54d2c4; /* 화살표 색상 HanaMINI 색상으로 설정 */
  }

  &:hover span {
    color: white;
  }
`;

export const AvatarButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: white;
  border-radius: 50px;
  color: black;
  font-weight: bold;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  transition: color 0.3s, transform 0.3s;
  cursor: pointer; /* 마우스 커서를 손 모양으로 변경 */

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #54d2c4;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease-in-out;
    z-index: -1;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    color: white;
    transform: translateY(-0.001px); /* 들썩이는 효과 제거 */
  }

  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  span {
    margin-left: 5px;
    transition: margin-left 0.3s;
    color: black; /* 텍스트 색상 설정 */
  }

  &:hover span {
    color: white;
  }
`;

export const NavPanel = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.5);
`;

export const NavLink = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  // flex-grow: 1;
  height: 200px; /* 버튼의 고정 높이 설정 */
  color: ${({ $active }) => ($active ? "white" : "#68aaa2")}; //#559b93
  background-color: ${({ $active }) => ($active ? "#54d2c4" : "#b1dcd7bd")};
  cursor: pointer;
  transition: background-color 0.3s;
  border-bottom: 1px solid white; /* 각 NavLink 요소 간 경계선 추가 */

  &:hover {
    background-color: #05c9b2;
  }

  &:last-child {
    border-bottom: none; /* 마지막 요소에는 경계선을 추가하지 않음 */
  }
`;

export const CustomerService = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 52;
  width: 555px;
  height: 236px;
  background: url("cover.png") no-repeat 50% 100%;
`;

export const CustomButton = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92px;
  height: 92px;
  line-height: 1.3;
  background: #f9e33b;
  font-size: 12px;
  color: #392020;
  flex-direction: column;
  border-radius: 19px;
  text-decoration: none;
  margin-right: 20px; /* 버튼과 텍스트 사이의 간격 */
  font-weight: 900;
`;

export const CustomerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: #333;

  i {
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  span {
    font-size: 20px;
    font-weight: 900;
    margin-bottom: 5px;
  }
`;
