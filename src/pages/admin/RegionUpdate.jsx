import { Box, Grid, TextField, Typography, Button, InputLabel, Input, Modal, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import caxios from '../../api/caxios';

function RegionUpdate({ open, onClose, editRegion }) {
  const [region, setRegion] = useState({});

  useEffect(() => {
    if (editRegion) {
      setRegion(editRegion);
    }
  }, [editRegion]);

  const handleInputRegion = (e) => {
    const { name, value, files } = e.target;
    setRegion({ ...region, [name]: files ? files[0] : value });
  };

  const handleUpdateRegion = () => {
    caxios
      .put("/region/update", region)
      .catch((error) => {
        console.log(error);
        alert("수정 실패했습니다.");
      })
      .then(() => {
        onClose();
        alert("수정이 완료되었습니다.");
      });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          지역 정보 수정
        </Typography>
        <InputLabel htmlFor="region-image" sx={{ mb: 1 }}>지역 정보</InputLabel>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="지역명"
              name="regionName"
              value={region.regionName || ''}
              variant="outlined"
              onChange={handleInputRegion}
              sx={{ backgroundColor: '#f5f5f5' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              label="지역 설명"
              name="regionDetail"
              value={region.regionDetail || ''}
              multiline
              rows={4}
              variant="outlined"
              onChange={handleInputRegion}
              sx={{ backgroundColor: '#f5f5f5' }}
            />
          </Grid>

          <Grid item xs={12}>
            <InputLabel htmlFor="region-image" sx={{ mb: 1 }}>지역 대표 이미지</InputLabel>
            <Input
              id="region-image"
              type="file"
              name="filePath"
              inputProps={{ accept: 'image/*' }}
              fullWidth
              onChange={handleInputRegion}
              sx={{ border: '1px solid #ccc', borderRadius: 1, padding: '6px' }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={handleUpdateRegion}
              sx={{
                mt: 1,
                py: 1.3,
                fontWeight: 600,
                fontSize: "16px",
                backgroundColor: "#19a1ad",
                borderRadius: "8px",
                color: "white",
                boxShadow: "0 4px 12px rgba(25, 161, 173, 0.25)",
                textTransform: "none",
                ':hover': {
                  backgroundColor: '#f89f5e',
                  boxShadow: '0 6px 16px rgba(248, 159, 94, 0.3)'
                }
              }}
            >
              수정 하기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default RegionUpdate;