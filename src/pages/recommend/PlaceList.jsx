import React, { useEffect, useRef } from "react";
import styles from "./PlaceList.module.css";

const PlaceList = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    // ✅ 지도 API가 로드된 후 실행
    window.kakao.maps.load(() => {
      const center = new window.kakao.maps.LatLng(37.5665, 126.9780);

      const map = new window.kakao.maps.Map(mapRef.current, {
        center,
        level: 5,
      });

      new window.kakao.maps.Marker({
        map,
        position: center,
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
