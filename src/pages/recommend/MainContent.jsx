import React from "react";
import usePlaceStore from "../../store/usePlaceStore";
import Step2Place from "./Step2Place";
import Step3Confirm from "./Step3Confirm";
import { Box, IconButton, Badge } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Step1Date from "./Strp1Date";

const MainContent = ({ locations, setRouteLocations}) => {
  const step = usePlaceStore((s) => s.step);
 
  return (
      <Box
        sx={{
          width:"100%",
          transition: "width 0.3s ease",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#fff",
        }}
      >
      

        {/* 본문 */}
        <Box sx={{ padding: 2 }}>
          {step === 1 && <Step1Date />}
          {step === 2 && <Step2Place />}
          {step === 3 && <Step3Confirm locations={locations} setRouteLocations={setRouteLocations} />}
        </Box>
      </Box>
  );
};

export default MainContent;
