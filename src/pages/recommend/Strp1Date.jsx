import React, { useState, useEffect } from 'react';
import {
  Box, Grid, TextField, Typography, Button,
  InputLabel
} from '@mui/material';
import useLocationStore from '../../store/useLocationStore'; 



const Step1Date = () => {
  const { latitude, setLatitude, setLongitude, longitude, setLocation, setTripDate, tripDate, setInputLocation, inputLocation, startingPoint, setStartingPoint, setStartingLocation } = useLocationStore();

  const handleFindMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("step1 내 위치:", lat, lng);

          // 상태 변경
          setLatitude(lat);
          setLongitude(lng);
          setLocation(lat, lng);

          // 강제로 장소 검색도 여기서 직접 호출
          fetchPlaceNameFromGoogle(lat, lng); // 👈 아래에 함수로 분리해서 만들자
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


  const fetchPlaceNameFromGoogle = (latitude, longitude) => {
    const google = window.google;
    if (!google || !google.maps || !google.maps.places) return;

    const location = new google.maps.LatLng(latitude, longitude);
    const dummyMap = new google.maps.Map(document.createElement("div"));
    const service = new google.maps.places.PlacesService(dummyMap);

    const request = {
      location: location,
      radius: 100,
      type: 'point_of_interest',
      rankBy: google.maps.places.RankBy.PROMINENCE,
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const poi = results.find(r => r.name) || results[0];
        if (poi && poi.name) {
          setStartingLocation(poi.name);
          setStartingPoint(poi.name);
          
        } else {
          setInputLocation("알 수 없는 장소");
        }
      } else {
        setInputLocation("장소를 찾을 수 없습니다");
      }
    });
  };





  return (
    <Box>
      <Typography variant="h6" gutterBottom>스탭1</Typography>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          label="날짜 선택"
          type="date"
          fullWidth
          value={tripDate}
          onFocus={() => {
            if (inputLocation === "장소를 찾을 수 없습니다" || inputLocation === "알 수 없는 장소") {
              setInputLocation("");
            }
          }}
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
          value={startingPoint ? startingPoint : inputLocation}
          onChange={(e) => {
            const value = e.target.value;
              console.log("✅ 현재 입력값 :", value);
              setInputLocation(value);
              setStartingPoint("");
              setStartingLocation(value);
              
              
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
