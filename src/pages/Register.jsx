import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 
import { Button, Container, Grid, Paper, TextField, Typography, ToggleButton, ToggleButtonGroup } from "@mui/material";
import caxios from "../api/caxios";

function Register() {

  const location = useLocation();
  const { agreement } = location.state || {}; 

  const [formData, setFormData] = useState({
    loginId: "",
    pw: "",
    userName: "",
    birth: "",
    gender: "",
    email: "",
    address1: "",
    address2: "",
    postCode: "",
    agreement: agreement,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = setFormData((prev) => ({ ...prev, [name]: value }));
    console.log("변경된 formData:", updated);
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
      // const payload = {
      //   ...formData,
      //   rrn: `${formData.rrn1}-${formData.rrn2}`,
      // };
      await caxios.post("/auth/register", formData);
      alert("회원가입 성공! 로그인 해주세요.");
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("회원가입 실패: " + (err.response?.data || "서버 오류"));
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 12, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          회원가입
        </Typography>

        <form onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            로그인 정보
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
                name="pw"
                type="password"
                value={formData.pw}
                onChange={handleChange}
                required
                inputProps={{
                  pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,20}$",
                  title: "영문자+숫자 포함 8~20자 입력"
                }}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            기본 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="이름"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="생년월일 (YYMMDD)"
                name="birth"
                value={formData.birth}
                onChange={handleChange}
                inputProps={{
                  maxLength: 6,
                  pattern: "^\\d{6}$",
                  title: "6자리 숫자 (YYMMDD)"
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <ToggleButtonGroup
                value={formData.gender}
                exclusive
                onChange={(e, newGender) => {
                  if (newGender !== null) {
                    handleChange({
                      target: {
                        name: "gender",
                        value: newGender,
                      },
                    });
                  }
                }}
              >
                <ToggleButton value="male">남성</ToggleButton>
                <ToggleButton value="female">여성</ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            이메일
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="이메일"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            주소 정보
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="기본 주소"
                name="address1"
                value={formData.address1}
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
                name="address2"
                value={formData.address2}
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
  );
}

export default Register;
