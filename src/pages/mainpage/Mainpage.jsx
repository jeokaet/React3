
import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography, TextField, IconButton, InputAdornment, } from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from "react-router-dom";
import caxios from "../../api/caxios";
import { useNavigate } from "react-router-dom";
import usePlaceStore from "../../store/usePlaceStore";
import styles from './Mainpage.module.css';
import SearchIcon from '@mui/icons-material/Search';
import useLocationStore from "../../store/useLocationStore";


function Mainpage() {
    const [regionList, setRegionList] = useState([]);
    const [originalList, setOriginalList] = useState([]);
    const [searchWord, setSearchWord] = useState("");
    const navigate = useNavigate();
    const { setStep, setRegion, setSelectedPlaces } = usePlaceStore();
    const { setLatitude, setLongitude, setStartingPoint } = useLocationStore();

    // const [ searchResult, setSearchResult ] = useState("true");
    // const [ isSearching, setIsSearching ] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        setStep(1);
        setStartingPoint("");
        setSelectedPlaces([]);

        caxios.get("/region")
            .then((resp) => {
                setRegionList(resp.data);
                setOriginalList(resp.data);
            })
            .catch((error) => {
                console.error("에러 발생:", error);
                alert("지역 목록을 불러오는데 실패했습니다.");
            });

        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
 

    const handleRegionClick = (regionName) => {
        setRegion(regionName);
    };

    const handleSearch = () => {
        if (!searchWord || searchWord.trim() === "") {
            alert("검색어를 입력해주세요.");
            return;
        }
        caxios.get("/region/searchByRegionName", { params: { searchWord } })
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

    const handleSelectRegion = (region) => {
        setLatitude(region.latitude);
        setLongitude(region.longitude);
        navigate("/recommendPage");
    }

    return (
        <Grid sx={{ display: "flex", flexDirection: "column", width: "80vw" }}>

            {/* 첫 번째 상단 섹션 */}
            <Grid
                container
                direction="column"
                sx={{ width: "100%", minHeight: "80vh" }}>

                {/* 첫번째 영역 */}
                <Grid
                    item
                    xs={12}
                    lg={6}
                    sx={{
                        display: "flex",
                        height: "90vh",
                        justifyContent: "center",
                        alignItems: "center",
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
                            alignItems: "left",
                            py: 8,
                            px: 8,
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
                        <Link to="/recommendPage" style={{ textDecoration: 'none' }}>
                            <button className={styles.btn}>
                                <span className={styles.icon}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={20} height={24} fill="currentColor" className="bi bi-airplane-fill" viewBox="0 0 16 16">
                                        <path d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Z" />
                                    </svg>
                                </span>
                                <span className={styles.text}>놀러가기</span>
                            </button>
                        </Link>
                    </Grid>

                    <Grid item xs={12} lg={6} sx={{ display: { xs: "none", lg: "flex" }, width: "50%", justifyContent: "center", alignItems: "center", bgcolor: "#ffffff", py: 8, px: 2, }}>
                        <Box sx={{ width: "100%", height: 500, p:2, boxShadow: 3, borderRadius: 2, }}>
                            <img src="/images/main.png" alt="제휴사2" width="100%" height="100%" />
                        </Box>
                    </Grid>
                </Grid>

                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mb:30, backgroundColor: "#fafafa", pt:20, pb:20 }}>
                    <Grid container spacing={8} justifyContent="center">
                        {/* 카드 1 */}
                        <Grid item>
                            <Link to="https://www.agoda.com/ko-kr/country/south-korea.html?site_id=1922868&tag=e92fb2b1-df73-4a44-9314-2315b441c824&gad_source=1&gad_campaignid=21045083938&gbraid=0AAAAAD-GdVkn7suVjP7yrrXnA-TwwmZj7&device=c&network=g&adid=693591965741&rand=17143394756646251319&expid=&adpos=&aud=kwd-415216391968&gclid=Cj0KCQjwiqbBBhCAARIsAJSfZkbaicobC8A7X4xjDPEuh0UPBXIFtdd3NlWCS7s25dmnCIIQX5vrYHAaAhg4EALw_wcB&pslc=1&ds=x2z1UFnDZGeXJoYg">
                                <div className={styles.partnerCard}>
                                    <img src="/images/image1.jpg" alt="제휴사1" width="100%" />
                                </div>
                            </Link>
                        </Grid>

                        {/* 카드 2 */}
                        <Grid item>
                            <Link to="https://www.airport.co.kr/booking/cms/frCon/index.do?MENU_ID=80">
                                <div className={styles.partnerCard}>
                                    <img src="/images/image2.jpg" alt="제휴사2" width="100%" />
                                </div>
                            </Link>
                        </Grid>

                        {/* 카드 3 */}
                        <Grid item>
                            <Link to="https://www.korail.com/ticket/search/general">
                                <div className={styles.partnerCard}>
                                    <img src="/images/image3.jpg" alt="제휴사3" width="100%" />
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>

                {/* 두번째 영역 */}
                <Grid item xs={12} sx={{ textAlign: "center", mb: 8 }}>
                    <Typography variant="h4">어디로 여행을 떠나시나요?</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <TextField label="여행지를 입력해주세요" name="searchWord" value={searchWord} onChange={handleSerchWord} variant="outlined" sx={{ width: "50%", minWidth: 400 }} InputProps={{
                        endAdornment: (
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
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", pt: 10, gap: 10 }}>
                    <Grid container spacing={8} sx={{ display: "flex", justifyContent: "center" }}>
                        {
                            regionList.length > 0 ? (
                                regionList.map((region, i) => (
                                    <Grid key={i} onClick={() => handleRegionClick(region.regionName)} sx={{ cursor: "pointer" }}>

                                        <div className={styles.card}>
                                            <img src={region.filePath} alt="지역이미지" width="100%" height="100%"></img>
                                            <div className={styles.card__content}>
                                                <div className={styles.textArea}>
                                                    <p className={styles.card__title}>{region.regionName}</p>
                                                    <p className={styles.card__description}>
                                                        {region.regionDetail}
                                                    </p>
                                                </div>
                                                <Link to="/recommendPage" style={{ textDecoration: 'none' }}>
                                                    <div className={styles.btnArea}>
                                                        <button className={styles.makeRoute} onClick={() => handleSelectRegion(region)}>
                                                            <span>일정 만들기</span>
                                                        </button>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <Typography
                                            className={styles.regionName}
                                            sx={{ pl:2, mt: 1, fontSize: '1.5rem', fontFamily: '"Noto Sans KR", sans-serif' }}
                                        >
                                            {region.regionName}
                                        </Typography>
                                    </Grid>
                                )))
                                : (
                                    <Typography sx={{ mt: 2 }}>지역을 찾을 수 없습니다.</Typography>
                                )

                        }
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", padding: 15, gap: 10, mt:20, mb:5 }}>
                    <Grid container spacing={8} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h4">
                            PARTNERS
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", width: "100%", gap:5 }}>
                            <img src="/images/HJM.png" alt="HJM" style={{ height: 60, width:200 }} />
                            <img src="/images/keduit.png" alt="kedit" style={{ height: 60,  width:200 }} />
                        </Box>
                    </Grid>
                </Grid>


                {/* 풋터 */}
                <Grid container sx={{ width: "100%", height: "auto", flexDirection: { xs: "column", md: "row" }, alignItems: "center", justifyContent: "space-between", gap: { xs: 4, md: 0 }, px: 5, py: 8 }}>
                    <Grid item xs={12} md={6}>
                        <img src="/images/Logo.png" alt="로고" style={{ height: 50 }} />
                        <Typography sx={{ whiteSpace: "pre-line", wordBreak: "keep-all", fontSize: 14 }}>
                            {"\n"}(주) CodeBreaker{"\n"}
                            서울특별시 관악구 봉천로 227{"\n"}
                            CodeBreaker@gmail.com{"\n\n"}
                            이용약관 | 개인정보처리방침 | 고객지원 | 문의{"\n\n"}
                            CopyRight CodeBreaker.ALL RIGHTS RESERVED.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ display: "flex", gap: 2, justifyContent: { xs: "flex-start", md: "flex-end" }, alignItems: "center" }}>
                        <InstagramIcon sx={{ fontSize: 40, color: "#19a1ad" }} />
                        <YouTubeIcon sx={{ fontSize: 40, color: "#19a1ad" }} />
                    </Grid>
                </Grid>
            </Grid>
            {/* 🔝 Scroll to Top 버튼 */}
            {showScrollTop && (
                <button
                    className={styles.scrollTop}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="맨 위로 이동"
                >
                    ↑
                </button>
            )}
        </Grid>
    );
}

export default Mainpage;
