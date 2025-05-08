import React, { useLayoutEffect, useRef } from "react";
import styles from "./PlaceList.module.css";

const PlaceList = () => {
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
      const center = new kakao.maps.LatLng(37.5665, 126.9780);

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
          radius: 50,
          rankBy: google.maps.places.RankBy.PROMINENCE,
        };

        service.nearbySearch(request, function (results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
            const placeName = results[0].name;
            console.log("Google 장소명:", placeName);
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

export default PlaceList;
