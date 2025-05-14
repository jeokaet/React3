import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styles from './Map.module.css';


const RouteMap = ({locations,setMap, routePath}) => {
  // const [map, setMap] = useState(null);
  // const [locations, setLocations] = useState([]); // 장소의 좌표들
  const mapRef = useRef(null);
   const kakaoMapRef = useRef(null);


  useEffect(() => {
    console.log('locations',locations);
    console.log('routePath:', routePath);

    if (!window.kakao || !mapRef.current) {
      console.error("Kakao 지도 API가 로드되지 않았습니다.");
      return;
    }

      if(!kakaoMapRef.current){
      kakaoMapRef.current = new window.kakao.maps.Map(mapRef.current, {
        center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본 서울 위치
        level: 5,
      });
      setMap && setMap(kakaoMapRef.current);
    }
    
      }, [mapRef,setMap]);

     
    useEffect(()=>{
     if (!kakaoMapRef.current || !window.kakao || locations?.length === 0 || !locations) {
      console.log("마커 못그림",kakaoMapRef.current, locations);
      return;
     }
      console.log("마커찍음")
      locations.forEach((position) => {
        // if (position instanceof window.kakao.maps.LatLng) {
          const marker = new window.kakao.maps.Marker({
            map: kakaoMapRef.current,
            position,
          });
          console.log("📍 마커 좌표:", position.getLat(), position.getLng());
console.log("✅ 마커 생성됨", marker);
          marker.setMap(kakaoMapRef.current);
        // } else {
        //   console.error("잘못된 위치 데이터:", position);
        // }
      });
      const last = locations[locations.length -1];
      kakaoMapRef.current.setCenter(last);
    },[locations]);
  
     
    
   
      
    //  const linePath = locations.map(
    //     (pos) => new window.kakao.maps.LatLng(pos.getLat(), pos.getLng())
    //   );

    useEffect(()=>{
       if (!kakaoMapRef.current || !window.kakao || routePath?.length===0 || !routePath) {
            console.log("polyline 못그림", routePath);
            return
       };
       console.log("경로생성",routePath);
      const polyline = new window.kakao.maps.Polyline({
        path: routePath,
        strokeWeight: 3,
        strokeColor: "#FF0000",
        strokeOpacity: 0.6,
        strokeStyle: "shortdash",
      });

      polyline.setMap(kakaoMapRef.current);

      const bounds = new window.kakao.maps.LatLngBounds();
      routePath.forEach((coord) => bounds.extend(coord));
      kakaoMapRef.current.setBounds(bounds);

    },[routePath])
     



  // // 장소 검색
  // const handleSearch = () => {
  //   if (!map || !keyword) return;

  //   const ps = new window.kakao.maps.services.Places();
  //   ps.keywordSearch(keyword, (data, status) => {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       const place = data[0]; //검색결과 장소
  //       const position = new window.kakao.maps.LatLng(place.y, place.x);
  //       setLocations((prev) => {
  //       const updatedLocations = [...prev, position];
  //       console.log("Updated locations:", updatedLocations);
  //       return updatedLocations;
  //     });

  //       new window.kakao.maps.Marker({
  //         map,
  //         position,
  //         title: place.place_name,
  //       });
       
  //       map.setCenter(position); // 지도 중심 위치 변경
  //     }
  //   });
  // };


    
   


  // const handleGetRoute = async() => {
  //   if (locations.length < 2) {
  //     alert("출발지와 목적지를 최소 2개 이상 선택하세요.");
  //     return;
  //   }


  //   try {

  //       const linePath = locations.map(
  //   (pos) => new window.kakao.maps.LatLng(pos.getLat(),pos.getLng()));

  //     let fullPath = [];

  //     for (let i = 0; i < locations.length - 1; i++) {
  //       const start = locations[i];
  //       const end = locations[i + 1];

  //       const response = await axios.get("http://localhost/api/getNaverRoute", {
  //         params: {
  //           startX: start.getLng(),
  //           startY: start.getLat(),
  //           goals: encodeURIComponent(JSON.stringify([
  //             { x: end.getLng(), y: end.getLat() }
  //           ])),
  //         }
  //       });

  //       console.log("데이터: ", response.data)
  //       const duration =  Math.floor(response.data.route.traoptimal[0].summary.duration / 1000 / 60);
  //       console.log("자동차 소요시간: ",duration,"분 소요");
  //       const segmentPath = response.data.route.traoptimal[0].path;
  //       const segmentCoords = segmentPath.map(
  //         (point) => new window.kakao.maps.LatLng(point[1], point[0])
  //       );

  //       fullPath = [...fullPath, ...segmentCoords];
      

  //     const polyline = new window.kakao.maps.Polyline({
  //       path: linePath,
  //       strokeWeight: 3,
  //       strokeColor: '#FF0000',
  //       strokeOpacity: 0.6,
  //       strokeStyle: 'shortdash',
  //     });
  //     polyline.setMap(map);

  //     const bounds = new window.kakao.maps.LatLngBounds();
  //     fullPath.forEach((coord) => bounds.extend(coord));
  //     map.setBounds(bounds);


  //     //대중교통 경로계산
  //      const transportResponse = await axios.post("http://localhost/api/getTmapTransitRoute", {
  //       startX: start.getLng(),
  //       startY: start.getLat(),
  //       endX: end.getLng(),
  //       endY: end.getLat(),
      
  //   });
    
  //   console.log("대중교통 경로 데이터: ", transportResponse.data)
    
  //   const allRoutes = transportResponse.plan.itineraries;
  //       if (Array.isArray(allRoutes) && allRoutes.length > 0) {
  //         const fastestRoute = allRoutes.reduce((min, route) =>
  //           route.totalTime < min.totalTime ? route : min
  //         );

  //         const fastestMinutes = Math.floor(fastestRoute.totalTime / 60);
  //         console.log(`🚇 대중교통 최단경로: ${fastestMinutes}분 소요`);
    
  //       }
  // }

  //     setErrorMessage('');
  //   } catch (error) {
  //     console.error('경로 계산 오류:', error);
  //     setErrorMessage('경로를 가져오는데 실패했습니다.');
  //   }
  // };
  

  return (
    <div className={styles.mapWrapper}>
      <div ref={mapRef}  style={{width:"100%",height:'100%'}}></div>
      </div>
  );
};

export default RouteMap;
