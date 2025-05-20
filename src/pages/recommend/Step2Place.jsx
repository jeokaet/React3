import React, { useEffect, useState } from "react";
import caxios from "../../api/caxios";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import textFilter from "../../utils/textFilter";
import useLocationStore from "../../store/useLocationStore";
import usePlaceStore from "../../store/usePlaceStore";
import SearchIcon from "@mui/icons-material/Search";
import step2Styles from './Step2Place.module.css';

const Step2Place = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [placeList, setPlaceList] = useState([]);
    const [filter, setFilter] = useState(null);
    const [weather, setWeather] = useState(null);
    const { tripDate, startingPoint, startingLocation, latitude, longitude } = useLocationStore();
    const { selectedPlaces, addPlace, removePlace } = usePlaceStore();

    const getWeatherIcon = (desc) => {
        if (!desc) return "❓";
        const lower = desc.toLowerCase();
        if (lower.includes("맑음")) return "☀️";
        if (lower.includes("구름")) return "⛅";
        if (lower.includes("비")) return "🌧️";
        if (lower.includes("눈")) return "❄️";
        if (lower.includes("흐림")) return "🌥️";
        return "🌈";
    };

    useEffect(() => {
        console.log("📦 tripDate:", tripDate);
        console.log("📦 startingLocation:", startingLocation);
        console.log("latitude : ", latitude);
        console.log("longitude : ", longitude);

        if (!startingLocation || !latitude || !longitude) return;

        const fetchData = async () => {
            setLoading(true);

            try {
                const res = await caxios.post("/opti/getList", {
                    date: tripDate,
                    startingLocation,
                    latitude: latitude,
                    longitude: longitude
                });

                if (res.data.error) {
                    alert(res.data.error);
                    return;
                }

                const getList = res.data.results || [];
                const weatherFromServer = res.data.weather || null;
                setWeather(weatherFromServer);
                setPlaceList(getList);
                setFilteredResults(getList);
            } catch (err) {
                console.error("장소 추천 리스트 불러오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [tripDate, startingLocation, latitude, longitude]);

    const handleSearch = async () => {
        setFilteredResults("");
        if (textFilter.isAbusiveOnlyInput(query)) {
            alert("부적절한 단어만 입력되어 요청을 처리할 수 없습니다.");
            setQuery("");
            return;
        }

        setLoading(true);
        try {
            const res = await caxios.post("/llm/llm-recommend", {
                userInput: query,
                examplePlaces: placeList,
            });

            if (res.data.error) {
                alert(res.data.error);
                return;
            }

            const patchedResults = (res.data.results || []).map((place) => {
                const matched = placeList.find(p => p.name === place.name);
                return {
                    ...place,
                    imageUrl: matched?.imageUrl || "/images/NoImage.png",
                };
            });
            setFilteredResults(patchedResults);
            
            
            setQuery("");
        } catch (err) {
            console.error("LLM 요청 실패:", err);
            alert("추천 요청 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    const getRandomSubset = (arr, count) =>
        [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

    const keywordList = ["음식점", "관광지", "쇼핑","카페"];

    const typeToKorean = {
        restaurant: "음식점",
        cafe: "카페",
        bar: "음식점",
        bakery: "음식점",
        tourist_attraction: "관광지",
        museum: "박물관",
        zoo: "관광지",
        amusement_park: "관광지",
        aquarium: "관광지",
        shopping_mall: "쇼핑",
        clothing_store: "쇼핑",
        park: "관광지",
        natural_feature: "관광지",
    };


    return (
        <Box sx={{ height: "100vh" }}>
            <Box sx={{ width: "100%", mb: 1.5 }}>
                <Typography variant="h6">{startingPoint}</Typography>
                <Box>
                    <Typography variant="h8">{tripDate}</Typography>
                    {weather && (
                        <Typography
                            variant="body2"
                            sx={{
                                mb: 1,
                                color: "gray",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            {getWeatherIcon(weather)} {tripDate} 날씨는 "{weather}"입니다. 이에 기반한 추천 결과입니다.
                        </Typography>
                    )}
                </Box>

            </Box>

            <Typography variant="h6" gutterBottom>
                추천 장소 검색
            </Typography>


            {/* 🔘 필터 버튼 */}
            <Box sx={{ mb: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {keywordList.map((kw) => (
                    <Button
                        key={kw}
                        variant={filter === kw ? "contained" : "outlined"}
                        size="small"
                        onClick={() => {
                            if (filter === kw) {
                                setFilter(null);
                                setFilteredResults(placeList);
                            } else {
                                const filtered = placeList.filter(
                                    // (p) => p.type === kw || p.category === kw
                                    (p) => typeToKorean[p.type] === kw || typeToKorean[p.category] === kw
                                );
                                setFilter(kw);
                                setFilteredResults(filtered);
                            }
                        }}
                        sx={{
                            color: filter === kw ? "#fff" : "#19a1ad",
                            backgroundColor: filter === kw ? "#19a1ad" : "transparent",
                            borderColor: "#19a1ad",
                            "&:hover": {
                                backgroundColor: "#19a1ad",
                                color: "#fff",
                                borderColor: "#19a1ad",
                            },
                        }}
                    >
                        {kw}
                    </Button>
                ))}

                <Button
                    variant={filter === "오늘" ? "contained" : "outlined"}
                    size="small"
                    onClick={() => {
                        if (filter === "오늘") {
                            setFilter(null);
                            setFilteredResults(placeList);
                        } else {
                            const recommended = getRandomSubset(placeList, 7);
                            setFilter("오늘");
                            setFilteredResults(recommended);
                        }
                    }}
                    sx={{
                        color: filter === "오늘" ? "#fff" : "#f89f5e",
                        backgroundColor: filter === "오늘" ? "#f89f5e" : "transparent",
                        borderColor: "#f89f5e",
                        "&:hover": {
                            backgroundColor: "#f89f5e",
                            color: "#fff",
                            borderColor: "#f89f5e",
                        },
                    }}
                >
                    오늘의 추천
                </Button>
            </Box>


            {/* 🔍 검색창 */}
            <TextField
                fullWidth
                placeholder="원하는 테마를 입력해주세요 (예: 조용한 실내)"
                name="searchPlace"
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSearch();
                    }
                }}
                sx={{ mb: 2 }}
            />

            {/* 📋 리스트 출력s */}
            {loading ? (
                // <Box display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
                //   <CircularProgress />
                // </Box>
                <>
                    <div className={step2Styles.box}>
                        <div className={step2Styles.l1}>L</div>
                        <div className={step2Styles.l2}>O</div>
                        <div className={step2Styles.l3}>A</div>
                        <div className={step2Styles.l4}>D</div>
                        <div className={step2Styles.l5}>I</div>
                        <div className={step2Styles.l6}>N</div>
                        <div className={step2Styles.l7}>G</div>
                    </div>
                    <div className={step2Styles.centerBody}>
                        <div className={step2Styles.loaderShape} />
                    </div>
                </>
            ) : (
                <Box sx={{ height: 700 }}>
                    <Virtuoso
                        data={filteredResults}
                        style={{
                            height: "100%",
                            overflowY: "auto",
                            scrollbarWidth: "thin", // Firefox
                        }}
                        components={{
                            Scroller: React.forwardRef((props, ref) => (
                                <div
                                    {...props}
                                    ref={ref}
                                    style={{
                                        ...props.style,
                                        scrollbarWidth: "thin", // Firefox
                                    }}
                                    className="custom-scroll"
                                />
                            )),
                        }}
                        itemContent={(index, place) => {
                            const isAdded = selectedPlaces.some((p) => p.name === place.name);
                            const togglePlace = () => {
                                if (!isAdded && selectedPlaces.length >= 4) {
                                    alert("최대 4개까지만 선택할 수 있습니다.");
                                    return;
                                }

                                isAdded ? removePlace(place.name) : addPlace(place);
                            };

                            const combinedText = `${place.description} ${place.reason}`;
                            const imageSrc =
                                place.imageUrl && place.imageUrl !== "null"
                                    ? place.imageUrl
                                    : "/images/NoImage.png";

                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        borderBottom: "1px solid #eee",
                                        px: 2,
                                        py: 1.5,
                                    }}
                                >
                                    <Box mr={2}>
                                        <img
                                            src={imageSrc}
                                            alt={place.name}
                                            style={{
                                                width: 64,
                                                height: 64,
                                                objectFit: "cover",
                                                borderRadius: 6,
                                            }}
                                        />
                                    </Box>

                                    <Box flex="1">
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            {place.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {typeToKorean[place.type] || "기타"} {/*  · {place.region}  */}
                                        </Typography>
                                        <Typography variant="body2" mt={0.5}>
                                            {combinedText}
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant={isAdded ? "contained" : "outlined"}
                                        size="small"
                                        onClick={togglePlace}
                                        disabled={!isAdded && selectedPlaces.length >= 5}
                                        sx={{
                                            ml: 2,
                                            backgroundColor: isAdded ? "#19a1ad" : "transparent",
                                            color: isAdded ? "#fff" : "#19a1ad",
                                            borderColor: "#19a1ad",
                                            "&:hover": {
                                                backgroundColor: "#19a1ad",
                                                color: "#fff",
                                                borderColor: "#19a1ad",
                                            },
                                        }}
                                    >
                                        {isAdded ? "✓" : "+"}
                                    </Button>

                                </Box>
                            );
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default Step2Place;
