import React from "react";
import StepBar from "./StepBar";
import PlaceList from "./PlaceList";
import { Grid, Box } from "@mui/material";

function RecommendPage() {
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)", // 헤더 fixed 고려
        marginTop: "64px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container sx={{ flex: 1 }}>
        {/* 왼쪽 사이드바 */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            width:"15%",
            height: { xs: "30vh", md: "100%" },
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
          }}
        >
          <StepBar />
        </Grid>

        {/* 오른쪽 지도 */}
        <Grid
          item
          xs={12}
          md={8}
          sx={{
            width:"85%",
            height: { xs: "70vh", md: "100%" },
            overflow: "hidden",
          }}
        >
          <PlaceList />
        </Grid>
      </Grid>
    </Box>
  );
}

export default RecommendPage;
