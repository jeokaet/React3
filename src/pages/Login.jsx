// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";
// import caxios from "../api/caxios"; // axios 인스턴스 경로 맞춰서 사용
// import useAuthStore from "../store/useAuthStore"; // zustand store 경로 맞춰서 사용

// function Login() {
//   const navigate = useNavigate();
//   const { setToken } = useAuthStore(); // zustand에서 token 저장하는 함수
//   const [loginId, setLoginId] = useState("");
//   const [loginPw, setLoginPw] = useState("");

//   const randomImageUrl = `https://picsum.photos/1280/1080?random=${Math.floor(Math.random() * 1000)}`;

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await caxios.post("/auth/login", {
//         loginId,
//         loginPw,
//       });
//       const token = response.data;
//       setToken(token); // JWT 토큰 저장
//       alert("로그인 성공!");
//       navigate("/main"); // 로그인 성공 후 이동할 페이지
//     } catch (error) {
//       alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
//     }
//   };

//   return (
//     <div className="login-page">
//       <div className="login-left">
//         <form className="login-form" onSubmit={handleLogin}>
//           <h1 className="login-title">ROUTY ✈️</h1>
//           <p className="login-subtitle">"지금 어디로 떠나고 싶나요?"</p>
//           <input
//             type="text"
//             placeholder="아이디 입력"
//             className="login-input"
//             value={loginId}
//             onChange={(e) => setLoginId(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="비밀번호 입력"
//             className="login-input"
//             value={loginPw}
//             onChange={(e) => setLoginPw(e.target.value)}
//           />
//           <button type="submit" className="login-button">여행 시작하기</button>

//           {/* 회원가입 이동 버튼 */}
//           <button
//             type="button"
//             className="register-move-button"
//             onClick={() => navigate("/register")}
//           >
//             회원가입 하러가기
//           </button>
//         </form>
//       </div>

//       <div className="login-right">
//         <img src={randomImageUrl} alt="Travel" className="login-image" />
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import caxios from "../api/caxios";
import useAuthStore from "../store/useAuthStore";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useAuthStore();
  const [loginId, setLoginId] = useState("");
  const [loginPw, setLoginPw] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const randomImageUrl = `https://picsum.photos/1280/1080?random=${Math.floor(
    Math.random() * 1000
  )}`;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await caxios.post("/auth/login", {
        loginId,
        loginPw,
      });
      const token = response.data;
      setToken(token);
      alert("로그인 성공!");
      navigate("/main");
    } catch (error) {
      alert("로그인 실패: 아이디 또는 비밀번호를 확인하세요.");
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${randomImageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        p: 2,
      }}
    >
      <Grid
        item
        xs={12}
        sm={10}
        md={6}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          maxWidth: 400,
        }}
      >
        <Box component="form" onSubmit={handleLogin} sx={{ textAlign: "center" }}>
          <Typography variant="h3" sx={{ mb: 1, color: "#333" }}>
            ROUTY ✈️
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: "#666" }}>
            "지금 어디로 떠나고 싶나요?"
          </Typography>

          <TextField
            fullWidth
            placeholder="아이디 입력"
            variant="outlined"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            sx={{
              mb: 2,
              "& input": {
                padding: "0.8rem",
              },
            }}
          />

          <TextField
            fullWidth
            type="password"
            placeholder="비밀번호 입력"
            variant="outlined"
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
            sx={{
              mb: 2,
              "& input": {
                padding: "0.8rem",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1.1rem",
              fontWeight: "bold",
              borderRadius: "0.5rem",
              background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)",
              color: "white",
              mb: 2,
              ":hover": {
                background: "linear-gradient(90deg, #00f2fe 0%, #4facfe 100%)",
              },
            }}
          >
            여행 시작하기
          </Button>
          <Link to="/register">
          <Button
            fullWidth
            variant="outlined"
            onClick={() => navigate("/register")}
            sx={{
              py: 1,
              borderRadius: "0.5rem",
              fontWeight: "bold",
              color: "#4facfe",
              borderColor: "#4facfe",
              ":hover": {
                backgroundColor: "#4facfe",
                color: "white",
                borderColor: "#4facfe",
              },
            }}
          >
            회원가입 하러가기
          </Button>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;

