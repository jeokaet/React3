import React, { useEffect, useState } from 'react';
import {
  Box, Grid, Paper, Typography, List, ListItem, ListItemText
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 🔥 추가

function Dashboard() {
  const [data, setData] = useState({
    totalUsers: 0,
    todayUsers: 0,
    totalPlaces: 0,
    totalRecommends: 0,
    recentPlaces: [],
    loginLogs: [],
  });

  const navigate = useNavigate(); // 🔥 추가

  useEffect(() => {
    axios.get('/api/admin/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => console.error('대시보드 데이터 오류:', err));
  }, []);

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>
        📊 관리자 대시보드
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, cursor: 'pointer' }} onClick={() => navigate('/admin/user-stats')}>
            <Typography variant="subtitle1">전체 회원 수</Typography>
            <Typography variant="h6">{data.totalUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1">금일 가입자 수</Typography>
            <Typography variant="h6">{data.todayUsers}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1">등록된 장소 수</Typography>
            <Typography variant="h6">{data.totalPlaces}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="subtitle1">추천 요청 수</Typography>
            <Typography variant="h6">{data.totalRecommends}</Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* 최근 장소 */}
      <Typography variant="h6">🏠 최근 등록된 장소</Typography>
      <Paper sx={{ p: 2, mb: 4 }}>
        <List>
          {data.recentPlaces?.length > 0 ? (
            data.recentPlaces.map((place, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={place.name} secondary={`주소: ${place.address}`} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">등록된 장소가 없습니다.</Typography>
          )}
        </List>
      </Paper>

      {/* 로그인 기록 */}
      <Typography variant="h6">🔐 최근 로그인 기록</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {data.loginLogs?.length > 0 ? (
            data.loginLogs.map((log, idx) => (
              <ListItem key={idx} divider>
                <ListItemText primary={`사용자 ID: ${log.userId}`} secondary={`로그인 시간: ${log.timestamp}`} />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2">로그인 로그가 없습니다.</Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}

export default Dashboard;
