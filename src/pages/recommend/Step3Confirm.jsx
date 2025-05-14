import styles from "./Step3.module.css";
import {Grid, Typography, Box, Button} from "@mui/material";
import React,{useState,useEffect} from "react";
import RouteMap from "./RouteMap.jsx";
import axios from 'axios';


const places = ["장소1", "장소2", "장소3", "장소4", "장소5"];

const Step3Confirm = ()=>{
    const [map, setMap] = useState(null);
    const [locations, setLocations] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [routePath,setRoutePath] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
    if (!window.kakao || !keyword) return;


    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      console.log("검색 결과:",data);
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0];
        const lat = parseFloat(place.y);
        const lng = parseFloat(place.x);
        const position = new window.kakao.maps.LatLng(lat, lng);
        console.log("검색된 위치 추가: " , position)

        if(position instanceof window.kakao.maps.LatLng) {
        setLocations((prev) =>{
          const updated = [...prev, position];
          console.log("🧭 Updated locations:", updated);
          return updated;
        }); 
        } else{
          console.error("잘못된 위치 데이터:", position);
        }
        if(map){
        new window.kakao.maps.Marker({
          map, // 전역 접근 또는 Map 컴포넌트 내에서 제공
          position,
          title: place.place_name,
        });
       map.setCenter(position);
      } else{
        console.error("지도 객체가 없습니다.");
      }
      
      }
    });
  };


   const handleGetRoute = async() => {
    if (locations.length < 2) {
      alert("출발지와 목적지를 최소 2개 이상 선택하세요.");
      return;
    }


    try {

      let fullPath = [];

      for (let i = 0; i < locations.length - 1; i++) {
        const start = locations[i];
        const end = locations[i + 1];

        const response = await axios.get("http://localhost/api/getNaverRoute", {
          params: {
            startX: start.getLng(),
            startY: start.getLat(),
            goals: encodeURIComponent(JSON.stringify([
              { x: end.getLng(), y: end.getLat() }
            ])),
          }
        });

        console.log("데이터: ", response.data)
        const duration =  Math.floor(response.data.route.traoptimal[0].summary.duration / 1000 / 60);
        console.log("자동차 소요시간: ",duration,"분 소요");
        const segmentPath = response.data.route.traoptimal[0].path;
        const segmentCoords = segmentPath.map(
          (point) => new window.kakao.maps.LatLng(point[1], point[0])
        );

        fullPath = [...fullPath, ...segmentCoords];
        console.log("최종 경로:", segmentCoords);
        
      } 
      setRoutePath(fullPath);
      setErrorMessage('');
    } catch (error) {
      console.error('경로 계산 오류:', error);
      setErrorMessage('경로를 가져오는데 실패했습니다.');
    }
  };

  useEffect(() => {
  if (map) {
    setIsLoading(true);
    console.log("지도 객체가 세팅됨:", map);
  }
}, [map]);
    
    
    return(
        <Box sx={{p:2}}>
            <Typography variant="h6" gutterBottom
             sx={{fontSize:{
                xs:"1rem",
                sm:"1rem",
                md:"1.3rem",
                lg:"1.5rem",
            }}}>나의 나들이 동선</Typography>
             <Box
        sx={{
          display: "flex", // flexbox로 설정
          overflowX: "auto", // 가로 스크롤 허용
          paddingBottom: "16px",
        }}
      >
            <Grid
            container
            spacing={2}
            justifyContent="flex-start"
            alignItems="center"
            sx={{ display:"flex", flexWrap:"nowrap", gap:"16px",}}
            >
                {places.map((place, index) => (
          <React.Fragment key={index}>
            <Grid item sx={{width:"90px",flexShrink:0,}} >
              <Box display="flex" flexDirection="column" alignItems="center">
                <div className={styles.pic1}></div>
                <Typography>{place}</Typography>
              </Box>
            </Grid>
        
          </React.Fragment>
        ))}
            </Grid>
        </Box>

        <Box sx={{p:2}}>
            <Typography variant="h6" gutterBottom
             sx={{fontSize:{
                xs:"1rem",
                sm:"1rem",
                md:"1.3rem",
                lg:"1.5rem",
            }}}>추천 동선</Typography>
            <Grid 
            container
            spacing={2}>
                <Grid item xs={6} sm={3}>
                    <Button fullWidth variant="contained">자가용</Button>
                </Grid>
                 <Grid item xs={6} sm={3}>
                    <Button fullWidth variant="outlined">대중교통</Button>
                </Grid>
            </Grid>
        </Box>
        <Box sx={{p:2}}>
            {/* <RouteMap/> */}

             <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="장소를 입력하세요"
      />
      <button onClick={handleSearch} disabled={!map|| !keyword}>장소 추가</button>
      <button onClick={handleGetRoute} disabled={!map || locations.length<2}>경로 찾기</button>
      {locations.length >=0 && (
        <RouteMap locations={locations} setMap={setMap} routePath={routePath}/>
      )}  
      {errorMessage && <p>{errorMessage}</p>}
    </div>


        </Box>    

        </Box>

        
       
    );

}

export default Step3Confirm;