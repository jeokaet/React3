import React, { useLayoutEffect, useRef } from "react";
import styles from "./PlaceList.module.css";

const PlaceList = () => {
  const mapRef = useRef(null);

  useLayoutEffect(() => {
    if (!window.kakao || !window.kakao.maps || !mapRef.current) {
      console.warn("Kakao or mapRef not ready");
      return;
    }

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

      window.addEventListener("resize", () => {
        map.relayout();
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
