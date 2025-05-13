import React, { useState, useEffect } from 'react';
import {
  Box, Grid, TextField, Typography, Button,
  InputLabel
} from '@mui/material';
import useLocationStore from '../../store/useLocationStore'; // 🆕 위치 Store
import mapboxgl from 'mapbox-gl';
import { create } from 'zustand';

const Step1Date = () => {
  const [date, setDate] = useState("");
  const setLocation = useLocationStore((state) => state.setLocation);
  const { latitude, longitude, startingPoint } = useLocationStore();
  const [ inputLoca, setInputLoca ] = useState("");
  const [ locaName, setLocaName ] = useState("");

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

    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
        const poi = results.find(r => r.name) || results[0]; // 이름 있는 장소
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

  const handleLocation = (e) => {
    setInputLoca(e.target.value);
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>스탭1</Typography>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          label="날짜 선택"
          type="date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
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
          value={ inputLoca ? inputLoca : locaName || startingPoint }
          onChange={handleLocation}
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
