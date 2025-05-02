import React from "react";
import StepBar from "./StepBar";
import PlaceList from "./PlaceList";
import { Grid } from "@mui/material";


function RecommendPage (){

    return (
        <>
        <Grid sx={{p:10}}>
        <StepBar />
        <PlaceList />
        </Grid>
        </>
    )
}

export default RecommendPage;