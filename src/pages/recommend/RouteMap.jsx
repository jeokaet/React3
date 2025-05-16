import React, { useState, useEffect, useRef } from "react";

const RouteMap = ({ locations }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const markersRef = useRef([]);
  const polylineRef = useRef(null);

  console.log("RouteMap locations:", locations);
locations.forEach(loc => {
  console.log(loc.name, loc.position?.getLat(), loc.position?.getLng());
});


  // 지도 초기화
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: 3,
    };
    const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(kakaoMap);
  }, []);

  // 마커 및 폴리라인 업데이트
  useEffect(() => {
    if (!map) return;

    // 기존 마커 모두 제거
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (!locations || locations.length === 0) return;

    // 새 마커 생성
    locations.forEach(({ position, name }) => {
      const marker = new window.kakao.maps.Marker({ map, position, title: name });
      markersRef.current.push(marker);
    });

    // 기존 폴리라인 제거
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    // polyline 그리기 (2개 이상 위치일 때)
    if (locations.length >= 2) {
      const path = locations.map((loc) => loc.position);
      const polyline = new window.kakao.maps.Polyline({
        map,
        path,
        strokeWeight: 4,
        strokeColor: "#007bff",
        strokeOpacity: 0.8,
        strokeStyle: "shortdash",
      });
      polylineRef.current = polyline;

      // 지도 범위 조정
      const bounds = new window.kakao.maps.LatLngBounds();
      path.forEach((latlng) => bounds.extend(latlng));
      map.setBounds(bounds);
    } else {
      // 위치가 1개면 센터만 이동
      map.setCenter(locations[0].position);
    }
  }, [locations, map]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
};

export default RouteMap;
