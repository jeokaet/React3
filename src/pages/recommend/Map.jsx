import React, { useEffect, useRef } from "react";
import styles from "./Map.module.css";
import useLocationStore from "../../store/useLocationStore";
import { Box } from "@mui/material";


const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  const { latitude, longitude, setStartingPoint, location, setStartingLocation, setLongitude, setLatitude } = useLocationStore();


  useEffect(() => {
    const kakao = window.kakao;
    const google = window.google;

    if (!kakao || !kakao.maps || !google || !mapRef.current) {
      console.warn("Kakao or Google Maps not ready");
      return;
    }
    console.log("내위치:", latitude, longitude)
    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(latitude||37.5665,longitude||126.9780);

      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      });
      mapInstance.current = map;

      const marker = new kakao.maps.Marker({
        map: map,
        position: center,
      });
      markerInstance.current = marker;

      window.addEventListener("resize", () => {
        map.relayout();
      });

      // ✅ 지도 클릭 시 마커 이동 및 구글 장소 요청
      kakao.maps.event.addListener(map, "click", function (mouseEvent) {
        const latlng = mouseEvent.latLng;
        const lat = latlng.getLat();
        const lng = latlng.getLng();
        console.log("클릭 위치:", lat, lng);
        setLongitude(lng);
        setLatitude(lat);

        if (markerInstance.current) {
          markerInstance.current.setPosition(latlng);
        }

        // ✅ 구글 Places API 요청
        const location = new google.maps.LatLng(lat, lng);
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        const request = {
          location: location,
          type: 'point_of_interest',
          rankBy: google.maps.places.RankBy.DISTANCE
        };

        service.nearbySearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const poi = results.find(r => r.types.includes('point_of_interest') || r.types.includes('establishment')) || results[0];

            const name = poi.name;
            const address = poi.vicinity; // 상세 주소는 아님
            const lat = poi.geometry.location.lat();
            const lng = poi.geometry.location.lng();
            

            // 상태 저장
            setStartingPoint(name);
            setStartingLocation(address);
          } else {
            console.log("Google 장소 없음 또는 오류:", status);
          }
        });
      });
    });


  }, [location, latitude, longitude]);

  useEffect(() => {
    if (
      latitude !== null &&
      longitude !== null &&
      window.kakao &&
      mapInstance.current &&
      window.kakao.maps
    ) {
      const center = new window.kakao.maps.LatLng(latitude, longitude);
      console.log("📍 지도 중심 이동:", latitude, longitude);

      mapInstance.current.setCenter(center); // 지도 중심 이동
      if (markerInstance.current) {
        markerInstance.current.setPosition(center); // 마커도 이동
      }
    }
  }, [latitude, longitude]);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        ref={mapRef}
        sx={{
          flex: 1,
          width: "100%",
          minHeight: "300px",
        }}
      />
    </Box>

  );
};

export default Map;
