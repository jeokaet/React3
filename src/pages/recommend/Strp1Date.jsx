import React, { useState, useEffect } from 'react';
import {
  Box, Grid, TextField, Typography, Button,
  InputLabel
} from '@mui/material';
import useLocationStore from '../../store/useLocationStore'; // 🆕 위치 Store



const Step1Date = () => {
  const { latitude, longitude, setLocation, setTripDate, tripDate, setInputLocation, inputLocation } = useLocationStore();
  const [ locaName, setLocaName ] = useState("");
  useEffect(() => {
        // 처음 위치 받아왔을 때만 초기 입력값 설정
        if (!inputLocation && locaName) {
          setInputLocation(locaName);
        }
      }, [locaName]);

  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
        console.log("Mapbox 기준 위치:", latitude, longitude);
          setLocation(latitude, longitude);
        },
        (error) => {
          console.error("위치 정보 가져오기 실패:", error);
          alert("위치 정보를 가져오는 데 실패했습니다.");
        },
        {
          enableHighAccuracy: true, 
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  };

  useEffect(() => {
    const google = window.google;
    if (!google || !google.maps || !google.maps.places || !latitude || !longitude) return;


    const location = new google.maps.LatLng(latitude, longitude);
    const dummyMap = new google.maps.Map(document.createElement("div"));
    const service = new google.maps.places.PlacesService(dummyMap);


    const request = {
      location: location,
      radius: 100,
      type: 'point_of_interest',
      rankBy: google.maps.places.RankBy.PROMINENCE,
    };

    service.nearbySearch(request, (results, status) =>{
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const poi = results.find(r => r.name) || results[0]; // 이름 있는 장소 d
        if (poi && poi.name) {
          setLocaName(poi.name); // 바로 이름 할당
        } else {
          console.warn("결과는 있으나 장소명이 없습니다.");
          setLocaName("알 수 없는 장소");
        }
      } else {
        console.warn("장소 검색 실패 또는 결과 없음:", status);
        setLocaName("장소를 찾을 수 없습니다");
      }
    });
  }, [latitude, longitude]);




  return (
    <Box>
      <Typography variant="h6" gutterBottom>스탭1</Typography>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          label="날짜 선택"
          type="date"
          fullWidth
          value={tripDate}
          onChange={(e) => setTripDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          
        />
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <InputLabel>출발지 선택</InputLabel>
        <TextField
          fullWidth
          placeholder="검색어를 입력해주세요."
          name="searchPlace"
          variant="outlined"
          value={inputLocation ? inputLocation : ""}
          onChange={(e) => {
            setInputLocation(e.target.value);
            console.log("✅ 현재 입력값:", e.target.value);
          }}

        />
        
        <Button sx={{ mt: 1, marginRight:1 }} variant="outlined" onClick={handleFindMyLocation}>
          현재 위치 사용
        </Button>
        <Button sx={{ mt: 1, mr: 2 }} variant="contained">장소 검색</Button>
      </Grid>
    </Box>
  );
};

export default Step1Date;
