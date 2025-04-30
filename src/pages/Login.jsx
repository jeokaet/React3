import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import caxios from "../api/caxios"; // axios 인스턴스 경로 맞춰서 사용
import useAuthStore from "../store/useAuthStore"; // zustand store 경로 맞춰서 사용

function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuthStore(); // zustand에서 token 저장하는 함수
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const randomImageUrl = `https://picsum.photos/1280/1080?random=${Math.floor(Math.random() * 1000)}`;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await caxios.post("/auth/login", {
        loginId,
        loginPw,
      });
      const token = response.data;
      setToken(token); // JWT 토큰 저장
      alert("로그인 성공!");
      navigate("/main"); // 로그인 성공 후 이동할 페이지
    } catch (error) {
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <form className="login-form" onSubmit={handleLogin}>
          <h1 className="login-title">ROUTY ✈️</h1>
          <p className="login-subtitle">"지금 어디로 떠나고 싶나요?"</p>
          <input
            type="text"
            placeholder="아이디 입력"
            className="login-input"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 입력"
            className="login-input"
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
          />
          <button type="submit" className="login-button">여행 시작하기</button>

          {/* 회원가입 이동 버튼 */}
          <button
            type="button"
            className="register-move-button"
            onClick={() => navigate("/register")}
          >
            회원가입 하러가기
          </button>
        </form>
      </div>

      <div className="login-right">
        <img src={randomImageUrl} alt="Travel" className="login-image" />
      </div>
    </div>
  );
}

export default Login;
