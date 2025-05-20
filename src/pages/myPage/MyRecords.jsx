import React from 'react';
import { Grid, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import MyRecordStyle from './MyRecords.module.css';
import { Link } from 'react-router-dom';
import { useState } from "react";


function MyRecords() {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOpen = (record) => {
    setSelectedRecord(record);
    setCurrentIndex(0);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const images = [
    "/images/car.png",
    "/images/transit.png"
  ];

  const handleImageClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (selectedRecord?.images?.length || 1));
  };

  return (
    <>
      <Grid item xs={12} sx={{ display: "flex", gap: 10 }}>
        <Grid container spacing={8} sx={{ display: "flex", justifyContent: "center" }}>
          <Grid sx={{ cursor: "pointer" }} onClick={() => handleOpen({
            title: "제주도 1일차",
            date: "2025-06-13",
            images: ["/images/trasit.png", "/images/car.png"],
            description: "해안도로 드라이브와 흑돼지 맛집 탐방"
          })}>

            <div className={MyRecordStyle.card}>
              <img src="/images/jeju.png" alt="지역이미지" width="100%" height="100%"></img>
              <div className={MyRecordStyle.card__content}>
                <div className={MyRecordStyle.textArea}>
                  <p className={MyRecordStyle.card__title}>제주도 1일차</p>
                  <p className={MyRecordStyle.card__description}> 2025-06-13 </p>
                </div>
              </div>
            </div>
            <Typography className={MyRecordStyle.regionName} sx={{ mt: 1 }}></Typography>
          </Grid>
          <Grid sx={{ cursor: "pointer" }} onClick={() => handleOpen({
            title: "제주도 1일차",
            date: "2025-06-13",
            images: ["/images/trasit.png", "/images/car.png"],
            description: "해안도로 드라이브와 흑돼지 맛집 탐방"
          })}>

            <div className={MyRecordStyle.card}>
              <img src="/images/daejeon.png" alt="지역이미지" width="100%" height="100%"></img>
              <div className={MyRecordStyle.card__content}>
                <div className={MyRecordStyle.textArea}>
                  <p className={MyRecordStyle.card__title}>대전 당일치기</p>
                  <p className={MyRecordStyle.card__description}>2025-08-10</p>
                </div>
              </div>
            </div>
            <Typography className={MyRecordStyle.regionName} sx={{ mt: 1 }}></Typography>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {selectedRecord?.title} - {selectedRecord?.date}
        </DialogTitle>
        <DialogContent dividers>
          {selectedRecord?.images?.length > 0 && (
            <img
              src={selectedRecord.images[currentIndex]}
              alt="기록 이미지"
              style={{ width: '100%', borderRadius: '8px', cursor: 'pointer' }}
              onClick={handleImageClick}
            />
          )}
          <Typography variant="body2" sx={{ mt: 2 }}>
            {selectedRecord?.description}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );


}

export default MyRecords;
