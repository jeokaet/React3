import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import caxios from "../api/caxios"; // ✅ axios 인스턴스

function Register() {
  const [formData, setFormData] = useState({
    loginId: "",
    loginPw: "",
    name: "",
    rrn1: "",
    rrn2: "",
    phoneNumber: "",
    emailAddress: "",
    mainAddress: "",
    subAddress: "",
    postCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const openPostCode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        setFormData((prev) => ({
          ...prev,
          mainAddress: data.address,
          postCode: data.zonecode,
        }));
      },
    }).open();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        rrn: `${formData.rrn1}-${formData.rrn2}`,
      };
      await caxios.post("/auth/register", payload);
      alert("회원가입 성공! 로그인 해주세요.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: " + (err.response?.data || "서버 오류"));
    }
  };

  return (
<<<<<<< HEAD
    <Container maxWidth="sm" sx={{ mt: 12, mb: 5 }}>
=======
    <Container maxWidth="sm" sx={{ mt: 10, mb: 5 }}>
>>>>>>> a650f7db5cae05849a6631b6fae390cfe4ba3dc8
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          회원가입 ✈️
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            🔐 로그인 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="아이디"
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                required
                inputProps={{
                  pattern: "^[a-zA-Z0-9]{5,15}$",
                  title: "5~15자의 영문/숫자만 허용됩니다."
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="비밀번호"
                name="loginPw"
                type="password"
                value={formData.loginPw}
                onChange={handleChange}
                required
                inputProps={{
                  pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$",
                  title: "영문자+숫자 포함 8~20자 입력"
                }}
              />
            </Grid>
          </Grid>

<<<<<<< HEAD
=======
          {/* 기본 정보 */}
>>>>>>> a650f7db5cae05849a6631b6fae390cfe4ba3dc8
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            👤 기본 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="이름"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="주민등록번호 앞자리"
                name="rrn1"
                value={formData.rrn1}
                onChange={handleChange}
                inputProps={{
                  maxLength: 6,
                  pattern: "^\\d{6}$",
                  title: "6자리 숫자 (YYMMDD)"
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="뒷자리 첫글자"
                name="rrn2"
                value={formData.rrn2}
                onChange={handleChange}
                inputProps={{
                  maxLength: 1,
                  pattern: "^[1-4]$",
                  title: "1~4 사이 숫자 (성별코드)"
                }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            📞 연락처
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="전화번호"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                inputProps={{
                  pattern: "^01[016789]-?\\d{3,4}-?\\d{4}$",
                  title: "형식: 010-1234-5678 또는 01012345678"
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="이메일"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

<<<<<<< HEAD
=======

          {/* 주소 정보 */}
>>>>>>> a650f7db5cae05849a6631b6fae390cfe4ba3dc8
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            🏠 주소 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="기본 주소"
                name="mainAddress"
                value={formData.mainAddress}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                sx={{ height: "100%" }}
                onClick={openPostCode}
              >
                주소 검색
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="상세 주소"
                name="subAddress"
                value={formData.subAddress}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="우편번호"
                name="postCode"
                value={formData.postCode}
                onChange={handleChange}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 4 }}>
            회원가입 완료
          </Button>
        </form>
      </Paper>
    </Container>
<<<<<<< HEAD
=======

>>>>>>> a650f7db5cae05849a6631b6fae390cfe4ba3dc8
  );
}

export default Register;
