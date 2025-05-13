import styles from "./Step3.module.css";
import {Grid, Typography, Box} from "@mui/material";
import React from "react";
import RouteMap from "./RouteMap.jsx";

const places = ["장소1", "장소2", "장소3", "장소4", "장소5"];

const Step3Confirm = ()=>{

    
    
    return(
        <Box sx={{p:2}}>
            <Typography variant="h6" gutterBottom
             sx={{fontSize:{
                xs:"1rem",
                sm:"1rem",
                md:"1.3rem",
                lg:"1.5rem",
            }}}>나의 나들이 동선</Typography>
             <Box
        sx={{
          display: "flex", // flexbox로 설정
          overflowX: "auto", // 가로 스크롤 허용
          paddingBottom: "16px",
        }}
      >
            <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            sx={{ display:"flex", flexWrap:"nowrap", gap:"16px",}}
            >
                {places.map((place, index) => (
          <React.Fragment key={index}>
            <Grid item sx={{width:"90px",flexShrink:0,}} >
              <Box display="flex" flexDirection="column" alignItems="center">
                <div className={styles.pic1}></div>
                <Typography>{place}</Typography>
              </Box>
            </Grid>
        
          </React.Fragment>
        ))}
            </Grid>
        </Box>

        {/* <Box sx={{p:2}}>
            <Typography variant="h6" gutterBottom
             sx={{fontSize:{
                xs:"1rem",
                sm:"1rem",
                md:"1.3rem",
                lg:"1.5rem",
            }}}>추천 동선</Typography>
            <Grid 
            container
            spacing={2}>
                <Grid item xs={6} sm={3}>
                    <button fullWidth variant="contained">자가용</button>
                </Grid>
                 <Grid item xs={6} sm={3}>
                    <button fullWidth variant="outlined">대중교통</button>
                </Grid>
            </Grid>
        </Box> */}
        <Box sx={{p:2}}>
            <RouteMap/>
        </Box>    

        </Box>

        
       
    );

}

export default Step3Confirm;