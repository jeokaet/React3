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

  const handleSubmit = (e) => {
    e.preventDefault();
    // validation & submit logic here
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          회원가입 ✈️
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* 로그인 정보 */}
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
              />
            </Grid>
          </Grid>

          {/* 기본 정보 */}
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
                inputProps={{ maxLength: 6 }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="뒷자리 첫글자"
                name="rrn2"
                value={formData.rrn2}
                onChange={handleChange}
                inputProps={{ maxLength: 1 }}
              />
            </Grid>
          </Grid>

          {/* 연락처 */}
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

          {/* 주소 정보 */}
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
                sx={{ height: '100%' }}
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
  );
}

export default Register;
