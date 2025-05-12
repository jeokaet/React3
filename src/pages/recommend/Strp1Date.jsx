import React, { useState } from 'react';
import {
  Box, Grid, TextField, Typography, Button,
  InputLabel
} from '@mui/material';
import useLocationStore from '../../store/useLocationStore'; // 🆕 위치 Store
import { create } from 'zustand';

const Step1Date = () => {
  const [date, setDate] = useState("");
  const setLocation = useLocationStore((state) => state.setLocation);
  const { latitude, longitude } = useLocationStore();

  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log("현재 위치:", latitude, longitude);
          setLocation(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
          alert("위치 정보를 가져오는 데 실패했습니다.");
        }
      );
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>스탭1</Typography>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          label="날짜 선택"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <InputLabel>출발지 선택</InputLabel>
        <TextField
          fullWidth
          placeholder="검색어를 입력해주세요."
          name="searchPlace"
          multiline
          rows={4}
          variant="outlined"
        />
        <Button sx={{ mt: 1, mr: 2 }} variant="contained">장소 검색</Button>
        <Button sx={{ mt: 1 }} variant="outlined" onClick={handleFindMyLocation}>
          📍 내 위치 찾기
        </Button>
      </Grid>

      {/* 위치 디버깅용 출력 */}
      {latitude && longitude && (
        <Typography variant="body2" color="textSecondary">
          현재 위치: 위도 {latitude}, 경도 {longitude}
        </Typography>
      )}
    </Box>
  );
};

export default Step1Date;
