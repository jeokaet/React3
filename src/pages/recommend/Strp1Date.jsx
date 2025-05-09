import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Typography, Button, InputLabel, Input, TableContainer, Paper, TableHead, TableRow, Table, TableBody, Checkbox, TableCell, FormControlLabel, } from '@mui/material';
import caxios from '../../api/caxios';

const Step1Date = () => {
    const [date, setDate] = useState("");

    
  
    return (
      <Box>
        <Typography variant="h6" gutterBottom>날짜 및 위치</Typography>
  
        <Grid item xs={12} sx={{ mb: 2 }}>
          <TextField
            label="날짜 선택"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{shrink: true }}
          />
        </Grid>
  
        <Grid item xs={12}>
            <InputLabel>출발지 선택</InputLabel>
          <TextField
            fullWidth
            placeholder="검색어를 입력해주세요."
            name="searchPlace"
            multiline
            rows={4}
            variant="outlined"
          />
          <Button>장소 검색</Button>
        </Grid>
      </Box>
    );
  };

export default Step1Date;