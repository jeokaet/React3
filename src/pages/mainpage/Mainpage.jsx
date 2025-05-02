import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import caxios from "../../api/caxios";

function Mainpage() {
  return (
    <>
      
      {/* 첫 번째 상단 섹션 */}
      <Grid 
      container
      direction="column"
      sx={{ width: "100%", minHeight: "100vh" }}>

        {/* 첫번째 영역 */}
        <Grid
            item
            xs={12}
            lg={6}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                py: 8,
                px: 2,
            }}
        >
            <Grid
            item
            xs={12}
            lg={6}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                py: 8,
                px: 2,
            }}
            >
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                나의 맞춤 여행 플래너
            </Typography>
            <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                고민하던 여행계획을 어쩌구
            </Typography>
            <Button variant="contained">근처 여행지</Button>
            </Grid>

            <Grid item xs={12} lg={6} sx={{ display: { xs: "none", lg: "flex" }, justifyContent: "center", alignItems: "center", bgcolor: "#ffffff", py: 8, px: 2, }}>
            <Box sx={{ width: 400, height: 300, bgcolor: "grey.300" }} />
            </Grid>
        </Grid>
        {/* 두번째 영역 */}
        <Grid item xs={12} sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h5">어디로 여행을 떠나시나요?</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <TextField label="여행지를 입력해주세요" variant="outlined" sx={{ width: 400 }} />
        </Grid>
        <Grid item xs={12} sx= {{ display: "flex", justifyContent: "center", padding : 15, gap : 10}}>
            <Grid>
                <Box sx={{ width: 400, height: 400, bgcolor: "grey.300" }}></Box>
                <Typography>Seoul</Typography>
            </Grid>
            <Grid>
                <Box sx={{ width: 400, height: 400, bgcolor: "grey.300" }}></Box>
                <Typography>Busan</Typography>
            </Grid>
            <Grid>
                <Box sx={{ width: 400, height: 400, bgcolor: "grey.300" }}></Box>
                <Typography>Jeju</Typography>
            </Grid>
        </Grid>
        <Grid item xs={12} sx= {{ display: "flex", justifyContent: "center", padding : 15, gap : 10}}>
            <Grid>
                <Box sx={{ width: 400, height: 400, bgcolor: "grey.300" }}></Box>
                <Typography>Seoul</Typography>
            </Grid>
            <Grid>
                <Box sx={{ width: 400, height: 400, bgcolor: "grey.300" }}></Box>
                <Typography>Busan</Typography>
            </Grid>
            <Grid>
                <Box sx={{ width: 400, height: 400, bgcolor: "grey.300" }}></Box>
                <Typography>Jeju</Typography>
            </Grid>
        </Grid>


        {/* 풋터 */}
        <Grid item xs={12}>
            <Grid>
                <Typography>

                </Typography>
            </Grid>
            <Grid>
                <InstagramIcon/> <YouTubeIcon />
            </Grid>
        </Grid>
      </Grid>
    
    </>
  );
}

export default Mainpage;
