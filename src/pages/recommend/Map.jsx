import React, { useEffect, useRef } from "react";
import styles from "./Map.module.css";
import useLocationStore from "../../store/useLocationStore";
    import { Box } from "@mui/material";


const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  const { latitude , longitude, setStartingPoint, location, setStartingLocation, setLongitude, setLatitude } = useLocationStore();


  useEffect(() => {
    const kakao = window.kakao;
    const google = window.google;

    if (!kakao || !kakao.maps || !google || !mapRef.current) {
      console.warn("Kakao or Google Maps not ready");
      return;
    }
    console.log("내위치:",latitude,longitude)
    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(latitude, longitude);

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
          radius: 50,
          type: 'point_of_interest',
          rankBy: google.maps.places.RankBy.PROMINENCE,
        };

        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
               
                const poi = results.find(r => r.types.includes('point_of_interest') || r.types.includes('establishment')) || results[0];
                console.log("Google 장소명:", poi.name);

                service.getDetails({ placeId: poi.place_id }, (detailResult, detailStatus) => {
                if (detailStatus === google.maps.places.PlacesServiceStatus.OK) {
                  const name = detailResult.name;
                  const address = detailResult.formatted_address;
                  const phone = detailResult.formatted_phone_number;
                  const website = detailResult.website;
                  const lat = detailResult.geometry?.location?.lat();
                  const lng = detailResult.geometry?.location?.lng();

                  // 첫 번째 사진이 있을 경우 URL 추출
                  const photoUrl = detailResult.photos?.[0]?.getUrl({ maxWidth: 400 });
                   console.log("📍 상호명:", name);
                   console.log("📬 주소:", address);
                   console.log("📞 전화번호:", phone);
                   console.log("🌐 웹사이트:", website);
                   console.log("🧭 위도:", lat);
                   console.log("🧭 경도:", lng);
                   console.log("📷 대표 사진:", photoUrl);

                  setStartingPoint(name);
                  setStartingLocation(address);
                } else {
                  console.log("상세정보 실패:", detailStatus);
                }
              });
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
