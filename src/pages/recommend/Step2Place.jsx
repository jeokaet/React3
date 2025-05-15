import React, { useEffect, useState } from "react";
import caxios from "../../api/caxios";
import {
    Box,
    Typography,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import { Virtuoso } from "react-virtuoso";
import textFilter from "../../utils/textFilter";
import useLocationStore from "../../store/useLocationStore";
import usePlaceStore from "../../store/usePlaceStore";


const Step2Place = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const { tripDate, startingLocation } = useLocationStore();
    const [ placeList, setPlaceList ] = useState([]);


    useEffect(() => {
        if (!tripDate || !startingLocation) return;
        const fetchData = async () => {
            console.log("step2 값 확인 : 날짜 - " + tripDate + " / 지역 - " + startingLocation);
            try {
            const res = await caxios.post("/api/getList", {
                date: tripDate,
                startingLocation: startingLocation
            });

            if (res.data.error) {
                alert(res.data.error);
                return;
            }

            const getList = res.data.results;
            console.log("추천 결과 :", getList);
            setPlaceList(getList); // ⬅️ 상태에 저장해야 map 돌릴 수 있음
            setFilteredResults(getList);

            } catch (err) {
            console.error("LLM 요청 실패:", err);
            }
        };

        fetchData(); // ⬅️ useEffect 안에서 async 함수 실행
        }, [tripDate, startingLocation]); // ⬅️ 의존성 배열 추가 필요

    const { selectedPlaces, addPlace, removePlace } = usePlaceStore();

    const handleSearch = async () => {
        setFilteredResults("");
        if (textFilter.isAbusiveOnlyInput(query)) {
            alert("부적절한 단어만 입력되어 요청을 처리할 수 없습니다.");
            setQuery("");
            return;
        }

        setLoading(true);
        try {
            const res = await caxios.post("/api/llm-recommend", {
                userInput: query,
                examplePlaces: placeList,
            });

            if (res.data.error) {
                alert(res.data.error);
                return;
            }

            setFilteredResults(res.data.results);
            setQuery("");
        } catch (err) {
            console.error("LLM 요청 실패:", err);
            alert("추천 요청 중 오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                추천 장소 검색
            </Typography>

            <TextField
                fullWidth
                placeholder="자연어로 장소를 입력해보세요 (예: 조용한 실내 박물관)"
                name="searchPlace"
                multiline
                rows={3}
                variant="outlined"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault(); // 줄바꿈 막음
                        handleSearch();     // 검색 실행
                    }
                }}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                onClick={handleSearch}
                sx={{ mb: 3 }}
                disabled={loading}
            >
                {loading ? "로딩 중..." : "장소 추천 받기"}
            </Button>

            {loading && (
                <Box display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            <Box sx={{ height: 500 }}>
                <Virtuoso
                    data={filteredResults ? filteredResults : placeList}
                    itemContent={(index, place) => {
                        const isAdded = selectedPlaces.some((p) => p.name === place.name);
                        const togglePlace = () =>
                            isAdded ? removePlace(place.name) : addPlace(place);

                        const combinedText = `${place.description}  ${place.reason}`;
                        const imageSrc = place.imageUrl || "/default-image.jpg";

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
                                {/* 이미지 영역 */}
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

                                {/* 텍스트 영역 */}
                                <Box flex="1">
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {place.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {place.type} · {place.region}
                                    </Typography>
                                    <Typography variant="body2" mt={0.5}>
                                        {combinedText}
                                    </Typography>
                                </Box>

                                {/* 버튼 */}
                                <Button
                                    variant={isAdded ? "contained" : "outlined"}
                                    size="small"
                                    onClick={togglePlace}
                                >
                                    {isAdded ? "✓ 선택됨" : "+"}
                                </Button>
                            </Box>
                        );
                    }}
                />

            </Box>
        </Box>
    );
};

export default Step2Place;
