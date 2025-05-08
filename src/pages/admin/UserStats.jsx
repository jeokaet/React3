import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from '../../api/caxios';

function UserStats() {
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/user-stats")
      .then(res => {
        setWeeklyStats(res.data.weeklyStats);
        setRecentUsers(res.data.recentUsers);
      })
      .catch(err => console.error("회원통계 오류", err));
  }, []);

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant="h4" gutterBottom>
        👥 회원 가입 통계
      </Typography>

      {/* 📊 주간 차트 */}
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>📈 최근 5주 가입 추이</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={weeklyStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#4facfe" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* 📋 최근 가입자 테이블 */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>📋 최근 가입자 목록</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>아이디</TableCell>
                <TableCell>닉네임</TableCell>
                <TableCell>가입일</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentUsers.map((user, idx) => (
                <TableRow key={idx}>
                  <TableCell>{user.loginId}</TableCell>
                  <TableCell>{user.nickName}</TableCell>
                  <TableCell>{user.joinedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default UserStats;
