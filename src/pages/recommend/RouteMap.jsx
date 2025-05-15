import React, { useState, useEffect, useRef } from 'react';
import styles from './Map.module.css';


const RouteMap = ({locations}) => {
 const mapRef = useRef(null);
  const [map, setMap] = useState(null)


  useEffect(() => {
    const loadKakaoMapScript = () => {
      if (window.kakao && !window.kakao.maps) {
        initializeMap();
      } else {
        // Kakao Maps API 로드 대기
        const script = document.createElement('script');
        script.src = 'https://dapi.kakao.com/v2/maps/sdk.js?appkey=37885c5d1e4edc0bd7f3a41a8c23872b&autoload=false';
        script.onload = () => {
          window.kakao.maps.load(()=>{
            initializeMap();
            console.log('Kakao SDK loaded:', !!window.kakao?.maps?.LatLng);

          });
        };
        document.body.appendChild(script);
      }
    };

    const initializeMap = () => {
      if (window.kakao && mapRef.current && window.kakao.maps) {
        const container = mapRef.current;
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(container, options);
        setMap(kakaoMap);
      }
    };

    loadKakaoMapScript();
  }, []);

     // 장소 마커 표시
  useEffect(() => {
    if (!locations || !map || locations.length === 0 ) return;

    locations.forEach((loc) => {
      new window.kakao.maps.Marker({
        map,
        position:loc.position,
      });
    });
  }, [locations, map]);
  
     
  //polyline
useEffect(() => {
  if (!locations || !map || locations.length < 2 || !window.kakao || !window.kakao.maps) return;

  // Polyline 생성
  const linePath = locations.map(
    (loc) => new window.kakao.maps.LatLng(loc.position.lat, loc.position.lng)
  );

  const polyline = new window.kakao.maps.Polyline({
    path: linePath,
    strokeWeight: 4,
    strokeColor: '#007bff',
    strokeOpacity: 0.8,
    strokeStyle: 'solid',
  });

  polyline.setMap(map);

  // 지도 중심 자동 조정
  const bounds = new window.kakao.maps.LatLngBounds();
  linePath.forEach((latlng) => bounds.extend(latlng));
  map.setBounds(bounds);


  // 컴포넌트 unmount 시 제거
  return () => polyline.setMap(null);
}, [locations, map]);
    
  

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapRef}  style={{width:"100%",height:'100%'}}></div>
      </div>
  );
};

export default RouteMap;
