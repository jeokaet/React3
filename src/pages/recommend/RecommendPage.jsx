import React, { useState } from "react";
import StepBar from "./StepBar";
import Map from "./Map";
import { Grid, Box } from "@mui/material";
import MainContent from "./MainContent";
import Panel from "./Panel";
import usePlaceStore from "../../store/usePlaceStore";
import RouteMap from './RouteMap.jsx';
import Step3Confirm from './Step3Confirm';


function RecommendPage() {

  const step = usePlaceStore((s) => s.step);
  const [ getLocation, setLocation ] = useState({});
  const [locations, setLocations] = useState([]); //step3용
  

  const addLocation = ({position, name}) => {
    setLocations((prev)=> [...prev,{position,name}]);
  };

  const resetLocations = () => {
    setLocations([]);
  }


  return (
    <Box
      sx={{
        width: "120vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        paddingTop: "64px"
      }}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          height: "100%",
        }}
      >

        <Grid item xs={12} md={4.5} sx={{ width:"40%", height: "100%",  borderRight: "1px solid #ccc", display:"flex" }}>
          <Grid sx={{ width:"30%", height: "100%",  borderRight: "1px solid #ccc" }}>
            <StepBar/>
          </Grid>
          <Grid sx={{ width:"70%", height: "100%",  borderRight: "1px solid #ccc" }}>
            <MainContent />
          </Grid>
        </Grid>
        <Grid sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "row" }}>
          {step ===2 && <Panel />}
          <Box sx={{ flex: 1 }}>
            {step === 3 ? <RouteMap locations = {locations}/> : <Map setLocation={setLocation} />}
          </Box>
        </Grid>
      </Box>
      {step === 3 && (
        <Step3Confirm addLocation={addLocation} locations={locations} resetLocations={resetLocations} />
      )}
    </Box>
  );
}

export default RecommendPage;
