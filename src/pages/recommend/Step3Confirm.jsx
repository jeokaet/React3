import React, { useState, useEffect, useMemo } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import DrivingPathMap from "./DrivingPathMap";
import caxios from "../../api/caxios";
import useLocationStore from "../../store/useLocationStore";
import usePlaceStore from "../../store/usePlaceStore";
import TransitMap from "./TransitMap";


// 출발지 정해서 보내줘야 함. 그리고 도착지도 출발지에서 제일 먼 곳 찾아서 넣어줘야함. 
const Step3Confirm = ({setRouteLocations}) => {
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState(null);
  const { selectedPlaces } = usePlaceStore(); // ✅ 실제 선택된 장소들
  const {startingPoint, latitude, longitude} = useLocationStore();
   const [ result, setResult ] = useState([]);


  console.log("목적지:",selectedPlaces);
  
  const routeLocations = useMemo(() => {
    if (!result || result.length === 0) return [];

    return result.map(place => ({
      name: place.name,
      position: new window.kakao.maps.LatLng(place.latitude, place.longitude)
    }));
  }, [result]);

  console.log("✅ routeLocations:", routeLocations);

  useEffect(() => {
    if (routeLocations.length > 0) {
      setRouteLocations(routeLocations);
    }
  }, [routeLocations]);
  

  console.log("selectedPlaces:", selectedPlaces);


 
  console.log(latitude + "위도" +longitude + "경도");



const payload = {
          places: selectedPlaces,
          longitude: longitude,
          latitude: latitude,
        };

     useEffect(() => {
        
        caxios.post("/api/route/optimize", payload)
          .then((resp) => {
            console.log("동선 생성 완료.");
            console.log (resp.data);
            setResult(resp.data);
          })
          .catch((error) => {
            console.error("저장 실패 :", error);
            alert("동선 실패.");
          });
      }, [selectedPlaces, latitude, longitude]);

  const handleSave = () => {
    
    
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>나의 나들이 동선</Typography>

      <Box sx={{ display: "flex", overflowX: "auto", paddingBottom: "16px" }}>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ display: "flex", flexWrap: "nowrap", gap: "16px" }}>
          {result.map((place, index) => (
            <Grid key={index} item sx={{ width: "100px", flexShrink: 0 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <img
                  src={place.imageUrl && place.imageUrl !== "null" ? place.imageUrl : "/images/NoImage.png"}
                  alt={place.name}
                  style={{
                    width: 60,
                    height: 60,
                    objectFit: "cover",
                    borderRadius: 4,
                    marginBottom: 4,
                  }}
                />
                <Typography variant="body2" fontWeight="bold">
                  {place.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" align="center">
                  위도: {place.latitude ? Number(place.latitude).toFixed(4) : "N/A"}<br />
                  경도: {place.longitude ? Number(place.longitude).toFixed(4) : "N/A"}
                </Typography>

              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>추천 동선</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant={mode === 'car' ? 'contained' : 'outlined'} onClick={()=>setMode('car')}>자가용</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant={mode === 'transit' ? 'contained' : 'outlined'} onClick={()=>setMode('transit')}>대중교통</Button>
          </Grid>
        </Grid>
      </Box>

      {/* <Box sx={{ p: 2 }}>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="장소를 입력하세요"
          style={{ padding: "8px", width: "60%", marginRight: "8px" }}
        />
  
      </Box> */}
           <Box sx={{ mt: 2, height: "300px", border: "1px solid #ccc" }}>
        {mode === "car" && <DrivingPathMap locations={routeLocations} />}
        {mode === "transit" && <TransitMap locations={routeLocations} />} 
      </Box>
      <Button
        onClick={handleSave}
        Width = "30%"
        variant="contained"
        sx={{ mt: 2 }} >
        일정 저장
      </Button>  
    </Box>
  );
};

export default Step3Confirm;
