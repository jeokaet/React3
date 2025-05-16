import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import DrivingPathMap from "./DrivingPathMap";
import caxios from "../../api/caxios";
import useLocationStore from "../../store/useLocationStore";
import TransitMap from "./TransitMap";

const places = [
  {
    name: "코엑스몰",
    type: "쇼핑/문화시설",
    region: "서울특별시 강남구",
    description: "쇼핑과 전시, 영화관 등 다양한 문화 콘텐츠를 제공하는 복합 공간입니다.",
    reason: "실내에서 쾌적하게 하루 종일 즐길 수 있는 공간입니다.",
    latitude: 37.5125,
    longitude: 127.0589,
    imageUrl: null
  },
  {
    name: "경복궁",
    type: "역사유적",
    region: "서울특별시 종로구",
    description: "조선 시대의 대표 궁궐로, 한국 전통 건축의 아름다움을 보여줍니다.",
    reason: "역사와 전통문화를 체험할 수 있는 대표적인 관광 명소입니다.",
    latitude: 37.579617,
    longitude: 126.977041,
    imageUrl: null
  },
  {
    name: "뚝섬한강공원",
    type: "공원/자연",
    region: "서울특별시 광진구",
    description: "한강을 따라 산책과 자전거 타기, 피크닉을 즐길 수 있는 공원입니다.",
    reason: "도심 속 자연에서 여유로운 시간을 보낼 수 있습니다.",
    latitude: 37.5311,
    longitude: 127.0663,
    imageUrl: null
  },
  {
    name: "이태원 거리",
    type: "상권/문화",
    region: "서울특별시 용산구",
    description: "다양한 국적의 음식과 문화를 만날 수 있는 국제적인 거리입니다.",
    reason: "특색 있는 음식점과 상점들로 이국적인 분위기를 느낄 수 있습니다.",
    latitude: 37.5345,
    longitude: 126.9946,
    imageUrl: null
  },
  {
    name: "에버랜드",
    type: "테마파크",
    region: "경기도 용인시",
    description: "다양한 놀이기구와 사파리, 시즌별 축제가 있는 대형 테마파크입니다.",
    reason: "온 가족이 함께 즐길 수 있는 종합 엔터테인먼트 공간입니다.",
    latitude: 37.2946,
    longitude: 127.2023,
    imageUrl: null
  }
];

// 출발지 정해서 보내줘야 함. 그리고 도착지도 출발지에서 제일 먼 곳 찾아서 넣어줘야함. 



const Step3Confirm = ({ addLocation, locations, resetLocations }) => {
  const { longitude, latitude } = useLocationStore();
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


     useEffect(() => {
        caxios.post("/api/route/optimize", places)
          .then((resp) => {
            console.log("저장이 완료되었습니다.");
          })
          .catch((error) => {
            console.error("저장 실패 :", error);
            alert("저장에 실패했습니다.");
          });
      }, []);

  const handleSave = () => {
    
    
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>나의 나들이 동선</Typography>

      <Box sx={{ display: "flex", overflowX: "auto", paddingBottom: "16px" }}>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="center" sx={{ display: "flex", flexWrap: "nowrap", gap: "16px" }}>
          {places.map((place, index) => (
            <Grid key={index} item sx={{ width: "90px", flexShrink: 0 }}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <div style={{ width: 60, height: 60, backgroundColor: '#ddd', borderRadius: 4, marginBottom: 8 }} />
                <Typography>{place.name}</Typography>
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
