import React, { useEffect } from "react";
import caxios from "../../api/caxios";

const TransitMap = ({ locations }) => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || locations.length < 2) return;

    const mapContainer = document.getElementById("transit-map");
    const map = new window.kakao.maps.Map(mapContainer, {
      center: locations[0].position,
      level: 5,
    });

    // 마커 찍기
    locations.forEach((loc, index) => {
      new window.kakao.maps.Marker({
        position: loc.position,
        map,
        title:
          index === 0
            ? "출발지"
            : index === locations.length - 1
            ? "도착지"
            : `경유지 ${index}`,
      });
    });

    const start = locations[0].position;
    const end = locations[locations.length - 1].position;

    // Tmap 대중교통 API 호출
    caxios
      .post("/api/tmapTransit", {
        startX: start.getLng().toString(),
        startY: start.getLat().toString(),
        endX: end.getLng().toString(),
        endY: end.getLat().toString(),
        lang: 0,
        format: "json",
        count: 10,
      })
      .then((res) => {
        const result = res.data;
        console.log("Tmap 대중교통 경로 응답:", result);

        const bounds = new window.kakao.maps.LatLngBounds();
        const path = [];

        result.features.forEach((feature) => {
          if (feature.geometry.type === "LineString") {
            feature.geometry.coordinates.forEach(([lng, lat]) => {
              const latlng = new window.kakao.maps.LatLng(lat, lng);
              path.push(latlng);
              bounds.extend(latlng);
            });
          }
        });

        new window.kakao.maps.Polyline({
          path,
          strokeWeight: 4,
          strokeColor: "#0000FF",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
          map,
        });

        map.setBounds(bounds);
      })
      .catch((err) => {
        console.error("Tmap 대중교통 경로 요청 실패", err);
      });
  }, [locations]);

  return <div id="transit-map" style={{ width: "100%", height: "100%" }} />;
};

export default TransitMap;
