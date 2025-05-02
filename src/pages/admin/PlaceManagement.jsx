import React from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  InputLabel,
  Input,
} from '@mui/material';

function PlaceManagement() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        지역 추가
      </Typography>

      <Grid container spacing={3}>
        {/* 지역명 */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="지역명"
            name="regionName"
            variant="outlined"
          />
        </Grid>

        {/* 지역 설명 */}
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="지역 설명"
            name="regionDetail"
            multiline
            rows={4}
            variant="outlined"
          />
        </Grid>

        {/* 지역 이미지 업로드 */}
        <Grid item xs={12}>
          <InputLabel htmlFor="region-image">지역 대표 이미지</InputLabel>
          <Input
            id="region-image"
            type="file"
            inputProps={{ accept: 'image/*' }}
            fullWidth
          />
        </Grid>

        {/* 등록 버튼 */}
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            지역 등록
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PlaceManagement;
