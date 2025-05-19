import React, { useState, useEffect, useMemo } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import DrivingPathMap from "./DrivingPathMap";
import caxios from "../../api/caxios";
import useLocationStore from "../../store/useLocationStore";
import usePlaceStore from "../../store/usePlaceStore";
import TransitMap from "./TransitMap";
import step3Styles from "./Step3.module.css";


// 출발지 정해서 보내줘야 함. 그리고 도착지도 출발지에서 제일 먼 곳 찾아서 넣어줘야함. 
const Step3Confirm = ({ setRouteLocations }) => {
  const [keyword, setKeyword] = useState("");
  const [mode, setMode] = useState(null);
  const { selectedPlaces } = usePlaceStore(); // ✅ 실제 선택된 장소들
  const { startingPoint, latitude, longitude } = useLocationStore();
  const [result, setResult] = useState([]);
  const [saved, setSaved] = useState(false);

  console.log("목적지:", selectedPlaces);

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



  const payload = {
    places: selectedPlaces,
    longitude: longitude,
    latitude: latitude,
  };

  useEffect(() => {

    caxios.post("/opti/optimize", payload)
      .then((resp) => {
        console.log("동선 생성 완료.");
        console.log(resp.data);
        setResult(resp.data);
      })
      .catch((error) => {
        console.error("저장 실패 :", error);
        alert("동선 실패.");
      });
  }, [selectedPlaces, latitude, longitude]);

  const handleSave = () => {

    setSaved(true);
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>나의 최단 동선</Typography>

      <Box sx={{ display: "flex", mb: 10 }}>
        <Grid container justifyContent="flex-start" alignItems="center" sx={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {
            result.map((place, index) => (
              <Grid key={index} item xs={6} sm={4} md={2} lg={1.5} sx={{ width: "100px" }}>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box sx={{ height: "90px", mb: 1 }}>
                    <img
                      src={place.imageUrl && place.imageUrl !== "null" ? place.imageUrl : "/images/NoImage.png"}
                      alt={place.name}
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 4,
                        marginBottom: 4,
                      }}
                    />
                  </Box>
                  <Box sx={{ height: "10px", width: "auto" }}>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {place.name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          }
        </Grid>
      </Box>

      <Box sx={{ mt: 5, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">자가용/대중교통 길찾기</Typography>
        {/* <Grid container spacing={2}>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant={mode === 'car' ? 'contained' : 'outlined'} onClick={()=>setMode('car')}>자가용</Button>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Button fullWidth variant={mode === 'transit' ? 'contained' : 'outlined'} onClick={()=>setMode('transit')}>대중교통</Button>
          </Grid>
        </Grid> */}
        <div className={step3Styles.wrapper}>
          <div className={step3Styles["checkbox-wrapper-35"]}>
            <input
              defaultValue="private"
              name="switch"
              id="switch"
              type="checkbox"
              className={step3Styles.switch}
              onChange={(e) => {
                const isChecked = e.target.checked;
                if (isChecked) {
                  setMode("transit"); // 체크됨 → 대중교통
                } else {
                  setMode("car"); // 체크 해제됨 → 자가용
                }
              }}
            />
            <label htmlFor="switch">
              <span className={step3Styles["switch-x-toggletext"]}>
                <span className={step3Styles["switch-x-unchecked"]}>
                  <span className={step3Styles["switch-x-hiddenlabel"]}>Unchecked: </span>
                  자가용
                </span>
                <span className={step3Styles["switch-x-checked"]}>
                  <span className={step3Styles["switch-x-hiddenlabel"]}>Checked: </span>
                  대중교통
                </span>
              </span>
            </label>
          </div>
        </div>
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
      <Box sx={{ mt: 2, height: "500px", border: "1px solid #ccc" }}>
        {mode === "car" && <DrivingPathMap locations={routeLocations} />}
        {mode === "transit" && <TransitMap locations={routeLocations} />} 
      </Box>
      <button className={step3Styles.btn} onClick={handleSave} disabled={saved}>
        <span className={step3Styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width={20} height={24} fill="currentColor" viewBox="0 0 16 16" style={{ marginLeft: 6 }}>
            <path d="M2 2v13.5l5.5-3.5L13 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
          </svg>
        </span>
        <span className={step3Styles.text}>{saved ? "저장 완료" : "일정 저장"}</span>
      </button>
    </Box>
  );
};

export default Step3Confirm;
