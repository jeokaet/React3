import React, { useState } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import DrivingPathMap from "./DrivingPathMap";
import TransitMap from "./TransitMap";

const places = ["장소1", "장소2", "장소3", "장소4", "장소5"];

const Step3Confirm = ({ addLocation, locations, resetLocations }) => {
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState(null);

  const handleSearch = () => {
    if (!keyword || !window.kakao || !window.kakao.maps) {
      alert("지도 준비가 안됐습니다.");
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0];
        const position = new window.kakao.maps.LatLng(parseFloat(place.y), parseFloat(place.x));
        const name = place.place_name;

        addLocation({ position, name });
        setKeyword("");
      } else {
        alert("장소를 찾을 수 없습니다.");
      }
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>나의 나들이 동선</Typography>

      <Box sx={{ display: "flex", overflowX: "auto", paddingBottom: "16px" }}>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ display: "flex", flexWrap: "nowrap", gap: "16px" }}>
          {places.map((place, index) => (
            <Grid key={index} item sx={{ width: "90px", flexShrink: 0 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <div style={{ width: 60, height: 60, backgroundColor: '#ddd', borderRadius: 4, marginBottom: 8 }} />
                <Typography>{place}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>추천 동선</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant={mode === 'car' ? 'contained' : 'outlineed'} onClick={()=>setMode('car')}>자가용</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant={mode === 'transit' ? 'contained' : 'outliend'} onClick={()=>setMode('transit')}>대중교통</Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 2 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="장소를 입력하세요"
          style={{ padding: "8px", width: "60%", marginRight: "8px" }}
        />
        <button onClick={handleSearch}>장소 추가</button>
        <button onClick={resetLocations} style={{ marginLeft: "8px" }}>초기화</button>
      </Box>
           <Box sx={{ mt: 2, height: "300px", border: "1px solid #ccc" }}>
        {mode === "car" && <DrivingPathMap locations={locations} />}
        {mode === "transit" && <TransitMap locations={locations} />} 
      </Box>

    </Box>
  );
};

export default Step3Confirm;
