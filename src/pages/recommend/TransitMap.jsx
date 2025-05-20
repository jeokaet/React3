import React, { useEffect, useState, useRef } from "react";
import caxios from "../../api/caxios";

const TransitMap = ({ locations }) => {
  const [showBusStops, setShowBusStops] = useState(true);
  const [showSubwayStops, setShowSubwayStops] = useState(true);

  const mapRef = useRef(null);
  const busMarkersRef = useRef([]);
  const subwayMarkersRef = useRef([]);
  const infoWindowRef = useRef(null); // 단일 InfoWindow 참조

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || locations.length < 2) return;

    const kakao = window.kakao;
    const mapContainer = document.getElementById("transit-map");

    // 맵 초기화 (한 번만)
    if (!mapRef.current) {
      mapRef.current = new kakao.maps.Map(mapContainer, {
        center: locations[0].position,
        level: 5,
      });
    }
    const map = mapRef.current;

    // 단일 InfoWindow 객체 생성 (최초 1회)
    if (!infoWindowRef.current) {
      infoWindowRef.current = new kakao.maps.InfoWindow({ removable: true });
    }
    const infoWindow = infoWindowRef.current;

    // InfoWindow 스타일 함수
    const createInfoWindowContent = (text) => `
      <div style="
        all: unset;
        display: inline-block;
        padding: 10px 14px;
        background-color: white;
        border: 2px solid #4a90e2;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        font-size: 14px;
        font-weight: 500;
        color: #333;
        white-space: nowrap;
      ">
        ${text}
      </div>
    `;

    // 출발지, 도착지, 목적지 마커 표시
    locations.forEach((loc, index) => {
      const title =
        index === 0
          ? "출발지"
          : index === locations.length - 1
          ? "도착지"
          : `목적지 ${index}`;
      const locMarker = new kakao.maps.Marker({
        position: loc.position,
        map,
        title,
      });
       kakao.maps.event.addListener(locMarker, "click", () => {
        infoWindow.setContent(createInfoWindowContent(title));
        infoWindow.open(map, locMarker);
      });
      
    });

    const parseLinestringToLatLng = (linestring) => {
      return linestring.split(" ").map((pair) => {
        const [lon, lat] = pair.split(",").map(Number);
        return new kakao.maps.LatLng(lat, lon);
      });
    };

    const drawPolylineOnMap = (latLngs, color) => {
      new kakao.maps.Polyline({
        map,
        path: latLngs,
        strokeWeight: 5,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });
    };

    // 기존 마커 삭제 함수
    const clearMarkers = (markers) => {
      markers.forEach((marker) => marker.setMap(null));
      markers.length = 0;
    };

    // 대중교통 정류장 마커 그리기 (버스 or 지하철)
    const drawTransitStopMarkers = (passStopList, mode) => {
      if (!passStopList?.stationList) return [];

      return passStopList.stationList.map((station, index) => {
        const position = new kakao.maps.LatLng(Number(station.lat), Number(station.lon));
        const namePrefix = mode === "SUBWAY" ? "지하철역" : "버스정류장";
        const stationName = `${index + 1}. ${station.stationName} ${namePrefix}`;

        const iconPath = mode === "SUBWAY" ? "/images/transport.png" : "/images/bus.png";

        const marker = new kakao.maps.Marker({
          position,
          title: stationName,
          image: new kakao.maps.MarkerImage(iconPath, new kakao.maps.Size(16, 16)),
        });

        kakao.maps.event.addListener(marker, "click", () => {
          infoWindow.setContent(createInfoWindowContent(stationName));
          infoWindow.open(map, marker);
        });

        if (showBusStops && mode === "BUS") {
          marker.setMap(map);
        } else if (showSubwayStops && mode === "SUBWAY") {
          marker.setMap(map);
        } else {
          marker.setMap(null);
        }

        return marker;
      });
    };

    // 그리기 작업 시작 전에 기존 마커들 삭제
    clearMarkers(busMarkersRef.current);
    clearMarkers(subwayMarkersRef.current);
    busMarkersRef.current = [];
    subwayMarkersRef.current = [];

    const drawSegmentRoute = async (startPos, endPos) => {
      try {
        const res = await caxios.post("/api/tmapTransit", {
          startX: startPos.getLng().toString(),
          startY: startPos.getLat().toString(),
          endX: endPos.getLng().toString(),
          endY: endPos.getLat().toString(),
          lang: 0,
          format: "json",
          count: 1,
        });

        const result = res.data;
        const itinerary = result?.metaData?.plan?.itineraries?.[0];
        if (!itinerary?.legs?.length) return;

        itinerary.legs.forEach((leg) => {
          if (leg.mode === "WALK") {
            leg.steps?.forEach((step) => {
              if (step.linestring) {
                const latLngs = parseLinestringToLatLng(step.linestring);
                drawPolylineOnMap(latLngs, "#FF6347"); // 빨간 도보
              }
            });
          } else if (leg.mode === "BUS" && leg.passShape?.linestring) {
            const latLngs = parseLinestringToLatLng(leg.passShape.linestring);
            drawPolylineOnMap(latLngs, "#2ECC71"); // 초록 버스
            if (leg.passStopList) {
              const markers = drawTransitStopMarkers(leg.passStopList, "BUS");
              busMarkersRef.current.push(...markers);
            }
          } else if (leg.mode === "SUBWAY" && leg.passShape?.linestring) {
            const latLngs = parseLinestringToLatLng(leg.passShape.linestring);
            drawPolylineOnMap(latLngs, "#3498DB"); // 파란 지하철
            if (leg.passStopList) {
              const markers = drawTransitStopMarkers(leg.passStopList, "SUBWAY");
              subwayMarkersRef.current.push(...markers);
            }
          }
        });
      } catch (err) {
        console.error("Tmap 대중교통 경로 요청 실패", err);
      }
    };

    (async () => {
      for (let i = 0; i < locations.length - 1; i++) {
        await drawSegmentRoute(locations[i].position, locations[i + 1].position);
      }

      const bounds = new kakao.maps.LatLngBounds();
      locations.forEach((loc) => bounds.extend(loc.position));
      map.setBounds(bounds);
    })();
  }, [locations, showBusStops, showSubwayStops]);

  return (
    <>
      <style>{`
        .toggle-button {
          background-color: #4a90e2;
          border: none;
          color: white;
          padding: 8px 16px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 2px 5px rgba(0,0,0,0.15);
        }
        .toggle-button:hover {
          background-color: #357ABD;
        }
        .toggle-button + .toggle-button {
          margin-left: 12px;
        }
      `}</style>

      <div style={{ marginBottom: 10 }}>
        <button
          className="toggle-button"
          onClick={() => setShowBusStops(!showBusStops)}
        >
          {showBusStops ? "버스정류장 숨기기" : "버스정류장 보기"}
        </button>
        <button
          className="toggle-button"
          onClick={() => setShowSubwayStops(!showSubwayStops)}
        >
          {showSubwayStops ? "지하철역 숨기기" : "지하철역 보기"}
        </button>
      </div>
      <div id="transit-map" style={{ width: "100%", height: "480px" }} />
    </>
  );
};

export default TransitMap;
