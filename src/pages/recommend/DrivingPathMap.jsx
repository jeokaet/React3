import React, { useEffect } from "react";
import caxios from "../../api/caxios";

const DrivingPathMap = ({ locations }) => {

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps || locations.length < 2) return;

    
    if (locations.length > 5) {
      alert("카카오 길찾기는 경유지를 최대 3개까지 지원합니다.\n추가된 경유지는 제외됩니다.");
    }

    const mapContainer = document.getElementById("car-map");
    const map = new window.kakao.maps.Map(mapContainer, {
      center: locations[0].position,
      level: 5,
    });

    // 마커 찍기 (출발지, 경유지, 도착지 모두)
locations.forEach((loc, index) => {
  const marker = new window.kakao.maps.Marker({
    position: loc.position,
    map: map,
    title:
      index === 0
        ? "출발지"
        : index === locations.length - 1
        ? "도착지"
        : `경유지 ${index}`,
  });
  //클릭시 정보창 띄우기
  const infoWindow = new window.kakao.maps.InfoWindow({
    content: `<div style="padding:5px;font-size:14px;">
      ${
        index === 0
          ? "출발지"
          : index === locations.length - 1
          ? "도착지"
          : `경유지 ${index}`
      }
    </div>`,
  });

  let isOpen = false;

  window.kakao.maps.event.addListener(marker, "click", () => {
    if (isOpen) {
      infoWindow.close();
      isOpen = false;
    } else {
      infoWindow.open(map, marker);
      isOpen = true;
    }
  });
});



    // 출발지 
    const origin = `${locations[0].position.getLng()},${locations[0].position.getLat()}`;

    // 도착지
    const destination = `${locations[locations.length - 1].position.getLng()},${locations[locations.length - 1].position.getLat()}`;

    // 출발지, 도착지 제외한 중간 위치들
     let waypointLocations = locations.slice(1, locations.length - 1);
     if (waypointLocations.length > 3) {
         waypointLocations = waypointLocations.slice(0, 3);
        }

    //경유지
    const waypoints = waypointLocations
      .map((loc) => `${loc.position.getLng()},${loc.position.getLat()}`)
      .join("|"); // waypoints 구분자는 '|'


    // GET 요청 쿼리 파라미터 구성
    const params = {
      origin,
      destination,
      priority: "DISTANCE",
      alternatives: true,
      summary: false,
    };
    if (waypoints) params.waypoints = waypoints;
    console.log("보내는 경로 정보:", params);
    caxios
      .get("/api/kakaoRoute", { params })
      .then((response) => {
        const data = response.data;
        console.log("응답 데이터", data);

        if (!data.routes || data.routes.length === 0) {
          console.error("경로 데이터가 없습니다.");
          return;
        }

        const bestRoute = data.routes.reduce((prev, curr) => {
            return curr.distance < prev.distance ? curr : prev;
        });

        const linePath = [];

        bestRoute.sections.forEach((section) => {
          section.roads.forEach((road) => {
            for (let i = 0; i < road.vertexes.length; i += 2) {
              const lng = road.vertexes[i];
              const lat = road.vertexes[i + 1];
              linePath.push(new window.kakao.maps.LatLng(lat, lng));
            }
          });
        });

        const polyline = new window.kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 3,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeStyle: "solid",
        });
        polyline.setMap(map);

        const bounds = new window.kakao.maps.LatLngBounds();
        linePath.forEach((latlng) => bounds.extend(latlng));

        // 계산된 영역에 맞게 지도 화면 조정
        map.setBounds(bounds);

      })
      .catch((err) => {
        console.error("자동차 경로 불러오기 실패:", err);
      });
  }, [locations]);

  return <div id="car-map" style={{ width: "100%", height: "100%" }} />;
};

export default DrivingPathMap;
