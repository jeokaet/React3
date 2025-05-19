import React, { useEffect, useRef } from "react";
import styles from "./Map.module.css";
import useLocationStore from "../../store/useLocationStore";
import { Box } from "@mui/material";
import usePlaceStore from "../../store/usePlaceStore";

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  const { latitude, longitude, setStartingPoint, location, setStartingLocation, setLongitude, setLatitude } = useLocationStore();
  const step = usePlaceStore((state) => state.step);


  useEffect(() => {
    const kakao = window.kakao;
    const google = window.google;
  
    if (!kakao || !kakao.maps || !google || !mapRef.current) return;
  
    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(latitude || 37.5665, longitude || 126.9780);
  
      const map = new kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      });
  
      mapInstance.current = map;
  
      const marker = new kakao.maps.Marker({
        map,
        position: center,
      });
  
      markerInstance.current = marker;
  
      // resize 대응
      window.addEventListener("resize", () => {
        map.relayout();
      });
  
      // ✅ step이 1일 때만 클릭 리스너 등록
      if (step === 1) {
        const clickHandler = function (mouseEvent) {
          const latlng = mouseEvent.latLng;
          const lat = latlng.getLat();
          const lng = latlng.getLng();
          console.log("클릭 위치:", lat, lng);
  
          setLongitude(lng);
          setLatitude(lat);
  
          if (markerInstance.current) {
            markerInstance.current.setPosition(latlng);
          }
  
          const location = new google.maps.LatLng(lat, lng);
          const service = new google.maps.places.PlacesService(document.createElement("div"));
  
          const request = {
            location,
            type: "point_of_interest",
            rankBy: google.maps.places.RankBy.DISTANCE,
          };
  
          service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
              const poi = results.find(r => r.name) || results[0];
              setStartingPoint(poi.name);
              setStartingLocation(poi.vicinity);
            } else {
              console.log("Google 장소 없음 또는 오류:", status);
            }
          });
        };
  
        kakao.maps.event.addListener(map, "click", clickHandler);
  
        // ✅ step이 바뀌거나 unmount될 때 리스너 제거
        return () => kakao.maps.event.removeListener(map, "click", clickHandler);
      }
    });
  }, [location, latitude, longitude, step]);
  

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
