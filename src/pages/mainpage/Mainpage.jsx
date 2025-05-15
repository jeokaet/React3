
import React, {useEffect, useState} from "react";
import { Box, Button, Grid, Typography, TextField, IconButton, InputAdornment, } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import caxios from "../../api/caxios";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import usePlaceStore from "../../store/usePlaceStore";
import styles from './Mainpage.module.css';
import SearchIcon from '@mui/icons-material/Search';


function Mainpage() {
    const [regionList, setRegionList] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [ searchWord, setSearchWord ] = useState("");
    const navigate = useNavigate();
    const { setStep, setRegion } = usePlaceStore();
    // const [ searchResult, setSearchResult ] = useState("true");
    // const [ isSearching, setIsSearching ] = useState(false);

    useEffect(() => {
//        if (!isSearching) {
            caxios.get("/region")
                .then((resp) => {
                    setRegionList(resp.data);
                    setOriginalList(resp.data);
                    setStep(1);
                })
                .catch((error) => {
                    console.error("에러 발생:", error);
                    alert("지역 목록을 불러오는데 실패했습니다.");
                });
//        }
    }, [])

    const handleRegionClick = (regionName) => {
        setRegion(regionName); // Zustand에 지역 저장
        navigate("/recommendPage"); // 추천 페이지로 이동
    };

    const handleSearch = () => {
        if(!searchWord || searchWord.trim() === ""){
            alert("검색어를 입력해주세요.");
            return;
        }
        caxios.get("/region/searchByRegionName", { params : { searchWord }})
        .then((resp) => {
            console.log("검색 결과 : " + resp.data);

            let data = resp.data;

            // resp.data가 배열이 아니면 배열로 변환
            if (data && !Array.isArray(data)) {
                data = [data];
            }
            setRegionList(data);
        })
        .catch((error) => {
            console.log("검색 중 에러 : " + error);
            return;
        })
    }

    const handleSerchWord = (e) => {
        const value = e.target.value;
        setSearchWord(value);

        if (value.trim() === "") {
            setRegionList(originalList); // 전체 리스트 복원
        }
    }

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", bgcolor: "#f5f5f5" }}>

            {/* 첫 번째 상단 섹션 */}
            <Grid
                container
                direction="column"
                sx={{ width: "100%", minHeight: "100vh" }}>

                {/* 첫번째 영역 */}
                <Grid
                // container  // ✅ 이게 꼭 필요해요!
                // spacing={20}
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        display: "flex",
                        height: "100vh",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor: "#f5f5f5",
                        py: 8,
                        px: 2,
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        lg={6}
                        sx={{
                            display: "flex",
                            width: "50%",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "#f5f5f5",
                            py: 8,
                            px: 2,
                        }}
                    >
                        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                            나의 맞춤 여행 플래너
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            여행계획을 세우는 가장 간단한 방법
                        </Typography>
                        <Link to="/recommendPage"><Button variant="contained">놀러가기</Button></Link>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ display: { xs: "none", lg: "flex" }, width: "50%", justifyContent: "center", alignItems: "center", bgcolor: "#ffffff", py: 8, px: 2, }}>
                        <Box sx={{ width: 400, height: 300, bgcolor: "grey.300" }} />
                    </Grid>
                </Grid>
                {/* 두번째 영역 */}
                <Grid item xs={12} sx={{ textAlign: "center", mb: 3 }}>
                    <Typography variant="h5">어디로 여행을 떠나시나요?</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField label="여행지를 입력해주세요" name="searchWord" value={searchWord} onChange={handleSerchWord} variant="outlined" sx={{ width: 400 }} InputProps={{ endAdornment: (
                        <InputAdornment position="end">
                        <IconButton onClick={handleSearch}>
                            <SearchIcon />
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSearch();
                    }}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", padding: 15, gap: 10 }}>
                    <Grid container spacing={8} sx={{ display: "flex", justifyContent: "center" }}>
                        {
                            regionList.length > 0 ? ( 
                            regionList.map((region, i) => (
                                <Grid key={i} onClick={() => handleRegionClick(region.regionName)} sx={{ cursor: "pointer" }}>
                                    <div className={styles.regionItem}>
                                        <div className={styles.regionCard}><img src={region.filePath} alt="지역이미지" width="100"></img></div>
                                        <Typography sx={{ mt: 1 }}>{region.regionName}</Typography>
                                    </div>
                                </Grid>
                            )) )
                            :  (
                                    <Typography sx={{ mt: 2 }}>지역을 찾을 수 없습니다.</Typography>
                                )
                        
                        }
                    </Grid>
                </Grid>



                {/* 풋터 */}
                <Grid item xs={12} md={12} sx={{ width: "100%", height: 500, display: "flex", gap: 100, backgroundColor: grey[400], p: 15, }}>
                    <Grid item xs={12} md={6}>
                        <Typography>
                            (주) CodeBreaker<br></br>
                            서울특별시 관악구 봉천로 227<br></br>
                            CodeBreaker@gmail.com<br></br>

                            이용약관 | 개인정보처리방침 | 고객지원 | 문의<br></br>
                            CopyRight CodeBreaker.ALL RIGHTS RESERVED.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: "flex", gap: 2, justifyItems: "flex-end" }}>
                        <InstagramIcon sx={{ fontSize: 50, color: "#E1306C" }} />
                        <YouTubeIcon sx={{ fontSize: 50, color: "red" }} />
                    </Grid>
                </Grid>
            </Grid>

        </Grid>
    );
}

export default Mainpage;
