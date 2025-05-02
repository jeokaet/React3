import React from "react";
import StepBar from "./StepBar";
import PlaceList from "./PlaceList";
import { Grid } from "@mui/material";

function RecommendPage() {
  return (
    <Grid
      container
      sx={{
        height: "calc(100vh - 64px)", // ✅ 헤더가 fixed니까 제외
        marginTop: "64px", // ✅ 헤더가 fixed라면 여백 필요
        overflow: "hidden",
      }}
    >
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          width:"15%",
          height: "100%",
          overflowY: "auto",
          backgroundColor: "#f9f9f9",
        }}
      >
        <StepBar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          width:"85%",
          height: "100%",
          padding: 0,
        }}
      >
        <PlaceList />
      </Grid>

      
    </Grid>


  );
}

export default RecommendPage;
