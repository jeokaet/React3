import React, {useEffect, useState} from "react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import caxios from "../../api/caxios";
import { grey } from "@mui/material/colors";

function Mainpage() {
     const [ regionList, setRegionList ] = useState([]);
    
    
        useEffect (() => {
            caxios.get("/region")
            .catch((error) => {
                console.error("에러 발생:", error);
                alert("지역 목록을 불러오는데 실패했습니다.");
            })
            .then((resp) =>{
                setRegionList(resp.data);
            })
        }, [])

  return (
    <Grid sx={{display:"flex", flexDirection:"column", bgcolor: "#f5f5f5"}}>
      
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
            <Link to="/recommendPage"><Button variant="contained">근처 여행지</Button></Link>
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
            <Grid container spacing={3} sx={{ display: "flex", justifyContent:"center"}}>
            {
                regionList.map((region, i) => (
                    <Grid key={i} >
                        <Box sx={{ width: 400, height: 400, border: "1px solid black" }}></Box>
                        <Typography>{region.regionName}</Typography>
                    </Grid>
                ))
            }
            </Grid>  
        </Grid>
        


        {/* 풋터 */}
        <Grid item xs={12} md={12} sx={{width : "100%" ,height: 500,  display: "flex" , gap:100, backgroundColor:grey[400], p:15, }}>
            <Grid item xs={12} md={6}>
                <Typography>
                    (주) CodeBreaker<br></br>
                    서울특별시 관악구 봉천로 227<br></br>
                    CodeBreaker@gmail.com<br></br>

                    이용약관 | 개인정보처리방침 | 고객지원 | 문의<br></br>
                    CopyRight CodeBreaker.ALL RIGHTS RESERVED.
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} sx={{display: "flex", gap :2, justifyItems:"flex-end"}}>
            <InstagramIcon sx={{ fontSize: 50, color: "#E1306C" }} />
            <YouTubeIcon sx={{ fontSize: 50, color: "red" }} />
            </Grid>
        </Grid>
      </Grid>
    
    </Grid>
  );
}

export default Mainpage;
