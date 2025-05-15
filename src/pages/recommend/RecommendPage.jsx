import React, { useState, useEffect } from "react";
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
  const [locations, setLocations] = useState([]);
  const [kakaoReady, setKakaoReady] = useState(false);

  // 카카오 SDK 딱 한번만 로딩
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setKakaoReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=37885c5d1e4edc0bd7f3a41a8c23872b&libraries=services&autoload=false";
    script.onload = () => {
      window.kakao.maps.load(() => {
        setKakaoReady(true);
        console.log("Kakao SDK loaded in RecommendPage");
      });
    };
    document.head.appendChild(script);
  }, []);

  // 장소 추가 함수
  const addLocation = ({ position, name }) => {
    setLocations(prev => [...prev, { position, name }]);
  };

  // 초기화 함수
  const resetLocations = () => setLocations([]);

  return (
    <Box sx={{ width: "120vw", height: "100vh", overflow: "hidden", position: "relative", paddingTop: "64px" }}>
      <Box sx={{ position: "relative", zIndex: 1, display: "flex", height: "100%" }}>
        <Grid item xs={12} md={4.5} sx={{ width: "40%", height: "100%", borderRight: "1px solid #ccc", display: "flex" }}>
          <Grid sx={{ width: "30%", height: "100%", borderRight: "1px solid #ccc" }}>
            <StepBar />
          </Grid>
          <Grid sx={{ width: "70%", height: "100%", borderRight: "1px solid #ccc" }}>
            <MainContent addLocation={addLocation} locations={locations} resetLocations={resetLocations} />
          </Grid>
        </Grid>

        <Grid sx={{ flex: 1, height: "100%", display: "flex", flexDirection: "row" }}>
          {step === 2 && <Panel />}

          <Box sx={{ flex: 1 }}>
            {step === 3 ? (
              kakaoReady ? (
                <>
                  <RouteMap locations={locations} />
                </>
              ) : (
                <div>지도 로딩중...</div>
              )
            ) : (
              <Map />
            )}
          </Box>
        </Grid>
      </Box>
    </Box>
  );
}

export default RecommendPage;
