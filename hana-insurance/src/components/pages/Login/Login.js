import React, { useState, useEffect } from "react";
import Header2 from "../../Header2";
import Footer from "../../footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // axios 임포트
import "animate.css";
import "../../css/MyIns.css";
import { useDispatch, useSelector } from "react-redux";
import { setLoginSuccess, logout } from "../../../store";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState(""); // 서버 응답 메시지

  const handleLogin = (e) => {
    e.preventDefault();

    // 로그인 요청 보내기
    axios
      .post("http://localhost:8080/api/login", { id, password })
      .then((res) => {
        setLoginMessage(res.data); // 서버에서 보내온 메시지 설정
        dispatch(setLoginSuccess({ token: res.data }));
        navigate("/");
      })
      .catch((error) => {
        setLoginMessage("로그인 실패"); // 에러 처리
        console.error("Login Error:", error);
      });
  };

  return (
    <div className="MyIns flex flex-col justify-between min-h-screen">
      <Header2 />
      <div className="flex flex-1 justify-center items-center">
        <div className="w-[400px] p-8 shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="id"
              >
                이메일
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                비밀번호
              </label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                로그인
              </button>
              <Link
                to="/forgot-password"
                className="inline-block align-baseline font-bold text-sm text-pink-500 hover:text-pink-800"
              >
                비밀번호를 잊으셨나요?
              </Link>
            </div>
          </form>
          {loginMessage && (
            <p className="text-center text-red-500 mt-4">{loginMessage}</p>
          )}
          <p className="text-center text-gray-600 text-xs mt-4">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-pink-500 hover:text-pink-800">
              회원가입
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
