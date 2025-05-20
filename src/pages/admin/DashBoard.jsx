import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Typography, List, ListItem, ListItemText, Divider
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🔥 추가

function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 736,
    todayUsers: 12,
    totalPlaces: 1232,
    totalRecommends: 0,
    recentPlaces: [],
    loginLogs: [],
  });


  useEffect(() => {
    axios.get('/api/admin/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => console.error('대시보드 데이터 오류:', err));
  }, []);

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      <Typography variant="h4" gutterBottom>
        관리자 대시보드
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container spacing={3} sx={{ mb: 6, width: "100%", p:2 }}>
        <Grid item xs={12} md={3} sx={{ width: "30%"}}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1">전체 회원 수</Typography>
            <Typography variant="h6">{data.totalUsers} 명</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width: "30%"}}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1">금일 가입자 수 명</Typography>
            <Typography variant="h6">{data.todayUsers} 명</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3} sx={{ width: "30%"}}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1">등록된 장소 수</Typography>
            <Typography variant="h6">{data.totalPlaces} 곳</Typography>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%', height: '100%' }}>
  <img src="/images/chart.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
</Box>

    </Box>
  );
}

export default Dashboard;
