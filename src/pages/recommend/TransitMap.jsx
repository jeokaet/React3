import React, { useEffect } from "react";
import caxios from "../../api/caxios";

const TransitMap = ({ locations }) => {
  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || locations.length < 2) return;

    const kakao = window.kakao;
    const mapContainer = document.getElementById("transit-map");
    const map = new kakao.maps.Map(mapContainer, {
      center: locations[0].position,
      level: 5,
    });

    // 출발지, 도착지, 경유지 마커 찍기
    locations.forEach((loc, index) => {
      new kakao.maps.Marker({
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

    // linestring 문자열 → kakao.maps.LatLng 배열 변환 함수
    const parseLinestringToLatLng = (linestring) => {
      return linestring.split(" ").map((pair) => {
        const [lon, lat] = pair.split(",").map(Number);
        return new kakao.maps.LatLng(lat, lon);
      });
    };

    // 지도에 폴리라인 그리기
    const drawPolylineOnMap = (map, latLngs, color) => {
      new kakao.maps.Polyline({
        map,
        path: latLngs,
        strokeWeight: 5,
        strokeColor: color,
        strokeOpacity: 0.8,
        strokeStyle: "solid",
      });
    };

    // 지하철역 마커 그리기 함수
    const drawSubwayStopMarkers = (map, passStopList) => {
      if (!passStopList?.stationList) return;

      passStopList.stationList.forEach((station, index) => {
        const position = new kakao.maps.LatLng(
          Number(station.lat),
          Number(station.lon)
        );
        const title = `${index + 1}. ${station.stationName}`;

        const marker = new kakao.maps.Marker({
          position,
          map,
          title,
          image: new kakao.maps.MarkerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            new kakao.maps.Size(24, 35)
          ),
        });

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${station.stationName}</div>`,
        });
        kakao.maps.event.addListener(marker, "click", () => {
          infowindow.open(map, marker);
        });
      });
    };

    // 각 구간별 API 호출 및 경로 그리기
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
        console.log("API 응답 전체:", result);

        const itinerary = result?.metaData?.plan?.itineraries?.[0];
        if (!itinerary) {
          console.warn("경로 정보(itinerary)가 없습니다.");
          return;
        }
        if (!Array.isArray(itinerary.legs) || itinerary.legs.length === 0) {
          console.warn("경로 구간 정보(legs)가 없거나 비어있습니다.");
          return;
        }

        itinerary.legs.forEach((leg) => {
          if (leg.mode === "WALK") {
            leg.steps?.forEach((step) => {
              if (step.linestring) {
                const latLngs = parseLinestringToLatLng(step.linestring);
                drawPolylineOnMap(map, latLngs, "#FF6347"); // 빨간색: 도보
              }
            });
          } else if (leg.mode === "BUS" && leg.passShape?.linestring) {
            const latLngs = parseLinestringToLatLng(leg.passShape.linestring);
            drawPolylineOnMap(
              map,
              latLngs,
              `#${leg.routeColor}` || "#0000FF"
            ); // 파란색계열: 버스
            // 버스 정류장 마커는 삭제 요청하셨으므로 주석 처리합니다.
            // if (leg.passStopList) drawBusStopMarkers(map, leg.passStopList);
          } else if (leg.mode === "SUBWAY" && leg.passShape?.linestring) {
            const latLngs = parseLinestringToLatLng(leg.passShape.linestring);
            drawPolylineOnMap(
              map,
              latLngs,
              `#${leg.routeColor}` || "#008000"
            ); // 초록색계열: 지하철
            if (leg.passStopList) drawSubwayStopMarkers(map, leg.passStopList);
          }
        });
      } catch (err) {
        console.error("Tmap 대중교통 경로 요청 실패", err);
      }
    };

    // 모든 구간에 대해 순차적으로 API 호출하고 경로 그리기
    (async () => {
      for (let i = 0; i < locations.length - 1; i++) {
        const startPos = locations[i].position;
        const endPos = locations[i + 1].position;
        await drawSegmentRoute(startPos, endPos);
      }

      // 지도 영역 자동 조절
      const bounds = new kakao.maps.LatLngBounds();
      locations.forEach((loc) => bounds.extend(loc.position));
      map.setBounds(bounds);
    })();
  }, [locations]);

  return <div id="transit-map" style={{ width: "100%", height: "500px" }} />;
};

export default TransitMap;
