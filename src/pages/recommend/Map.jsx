import React, { useLayoutEffect, useRef } from "react";
import styles from "./Map.module.css";

const Map = () => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  useLayoutEffect(() => {
    const kakao = window.kakao;
    const google = window.google;

    if (!kakao || !kakao.maps || !google || !mapRef.current) {
      console.warn("Kakao or Google Maps not ready");
      return;
    }

    kakao.maps.load(() => {
      const center = new kakao.maps.LatLng(37.5665, 126.9780); // 나중에 여기 lating 을 선택한 지역 경도위도로 넣도록 수정 필요.

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

        if (markerInstance.current) {
          markerInstance.current.setPosition(latlng);
        }

        // ✅ 구글 Places API 요청
        const location = new google.maps.LatLng(lat, lng);
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        const request = {
          location: location,
          radius: 30,
          type: 'point_of_interest',
          rankBy: google.maps.places.RankBy.PROMINENCE,
        };

        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
               
                const poi = results.find(r => r.types.includes('point_of_interest') || r.types.includes('establishment')) || results[0];
                console.log("Google 장소명:", poi.name);

                service.getDetails({ placeId: poi.place_id }, (detailResult, detailStatus) => {
                if (detailStatus === google.maps.places.PlacesServiceStatus.OK) {
                  console.log("상호명:", detailResult.name);
                  console.log("주소:", detailResult.formatted_address);
                  console.log("전화번호:", detailResult.formatted_phone_number);
                  console.log("웹사이트:", detailResult.website);
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
  }, []);

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapRef} className={styles.map}></div>
    </div>
  );
};

export default Map;
