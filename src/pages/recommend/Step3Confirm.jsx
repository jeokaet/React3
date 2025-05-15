import styles from "./Step3.module.css";
import {Grid, Typography, Box, Button} from "@mui/material";
import React,{useState} from "react";
import RouteMap from "./RouteMap.jsx";
import axios from 'axios';


const places = ["장소1", "장소2", "장소3", "장소4", "장소5"];

const Step3Confirm = ({addLocation, locations, resetLocations})=>{
    const [keyword, setKeyword] = useState("");

   const handleSearch = () => {
    if (!keyword || !window.kakao) return;

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const place = data[0];
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const name = place.place_name;
        console.log("검색된 장소:" ,place);
        console.log("새로운장소추가",{position,name});

        if(addLocation){
          addLocation({position,name});
          console.log("새로운장소추가",{position,name});
        }
        setKeyword('');
      } else {
        alert('장소를 찾을 수 없습니다.');
      }
    });
  };

   const handleReset = () => {
    if(resetLocations){
      resetLocations([]);
    }
  };



  //  const handleGetRoute = async() => {
  //   if (locations.length < 2) {
  //     alert("출발지와 목적지를 최소 2개 이상 선택하세요.");
  //     return;
  //   }

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
  //       const pathCoordinates = response.data.routes[0].sections[0].path.map((point) =>
  //     new window.kakao.maps.LatLng(point[1], point[0])
  //   );
  //     setRoutePath(pathCoordinates);
    
  // };
   
  




    
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
      <button onClick={handleSearch} >장소 추가</button>
      <button onClick={handleReset} >초기화</button>
      {/* <button onClick={handleGetRoute} disabled={!map || locations.length<2}>경로 찾기</button> */}
      <div style={{ width: '100%', height: '500px' }}>
        <RouteMap locations={locations} />
      </div>
 
    </div>


        </Box>    

        </Box>

        
       
    );

};

export default Step3Confirm;