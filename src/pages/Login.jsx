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
  const { setAuth } = useAuthStore();
  const [loginId, setLoginId] = useState("");
  const [pw, setPw] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // 테마 색상 정의
  const mainColor = "#19a1ad"; // 청록색
  const accentColor = "#f89f5e"; // 주황색

  const handleLogin = async (e) => {
    e.preventDefault();
    sessionStorage.clear();

    try {
      const response = await caxios.post("/auth/login", {
        loginId,
        pw,
      });
      const token = response.data;
      setAuth(token, loginId);
      alert("로그인 성공!");
      navigate("/");
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
        minHeight: "80vh",
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
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: 2,
          boxShadow: `0 8px 24px rgba(0, 0, 0, 0.12)`,
          p: 4,
          maxWidth: 400,
          border: `1px solid ${mainColor}15`, // 테두리 추가
        }}
      >
        <Box component="form" onSubmit={handleLogin} sx={{ textAlign: "center" }}>
          <img src="/images/Logo.png" alt="로고" style={{ height: 100 }} />
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mt:1,
              mb: 4, 
              color: "grey", 
              fontFamily: "inherit", 
              fontSize: "1rem",
              fontWeight: 500
            }}
          >
            "로그인하고 최적의 기능을 만나보세요"
          </Typography>

          <TextField
            fullWidth
            placeholder="아이디 입력"
            variant="outlined"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                paddingY: "6px",
                fontSize: "16px",
                borderRadius: "8px",
                "&.Mui-focused fieldset": {
                  borderColor: mainColor,
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: accentColor,
                },
              },
              "& input": {
                padding: "12px",
              },
            }}
          />
          
          <TextField
            fullWidth
            type="password"
            placeholder="비밀번호 입력"
            variant="outlined"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                paddingY: "6px",
                fontSize: "16px",
                borderRadius: "8px",
                "&.Mui-focused fieldset": {
                  borderColor: mainColor,
                  borderWidth: "2px",
                },
                "&:hover fieldset": {
                  borderColor: accentColor,
                },
              },
              "& input": {
                padding: "12px",
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "18px",
              fontWeight: 600,
              borderRadius: "8px",
              backgroundColor: mainColor,
              color: "#fff",
              textTransform: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 12px rgba(25, 161, 173, 0.25)",
              "&:hover": {
                backgroundColor: accentColor,
                boxShadow: "0 6px 16px rgba(248, 159, 94, 0.3)",
                transform: "translateY(-2px)",
              },
            }}
          >
            여행 시작하기
          </Button>

          <Link to="/agreement" style={{ textDecoration: "none" }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate("/register")}
              sx={{
                py: 1.5,
                fontSize: "18px",
                fontWeight: 600,
                borderRadius: "8px",
                border: `1px solid ${mainColor}`,
                color: mainColor,
                textTransform: "none",
                mt: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: accentColor,
                  borderColor: accentColor,
                  color: "#fff",
                  transform: "translateY(-2px)",
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