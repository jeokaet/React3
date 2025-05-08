import React from "react";
import StepBar from "./StepBar";
import Map from "./Map";
import { Grid, Box } from "@mui/material";
import MainContent from "./MainContent";


function RecommendPage() {

  
  return (
    <Box
      sx={{
        width:"100%", height: "100%",
        position: "fixed", 
        top: "64px",
        display: "flex",
      }}
    >
      {/* <Grid container sx={{ flex: 1, height: "100%" }}> */}
        <Grid item xs={12} md={4.5} sx={{ width:"30%", height: "100%",  borderRight: "1px solid #ccc", display:"flex" }}>
          <Grid sx={{ width:"20%", height: "100%",  borderRight: "1px solid #ccc" }}>
            <StepBar/>
          </Grid>
          <Grid sx={{ width:"80%", height: "100%",  borderRight: "1px solid #ccc" }}>
            <MainContent />
          </Grid>
        </Grid>
        <Grid item xs={12} md={7.5} sx={{ width:"70%", height: "100%", overflow: "hidden", }}>
          <Map />
        </Grid>
      {/* </Grid> */}
    </Box>
  );
}

export default RecommendPage;
