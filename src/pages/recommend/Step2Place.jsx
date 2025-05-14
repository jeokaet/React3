import React, { useState } from "react";
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
import usePlaceStore from "../../store/usePlaceStore";

// 🔸 더미 장소 데이터
const mockPlaces = [
    {
        name: "국립중앙박물관",
        type: "박물관",
        region: "서울 용산구",
        description: "다양한 유물을 전시하는 대표 박물관입니다.",
        reason: "아이 교육에 적합하고 쾌적한 실내 환경입니다.",
    },
    {
        name: "카페 드림",
        type: "카페",
        region: "서울 강남구",
        description: "조용하고 감성적인 분위기의 카페입니다.",
        reason: "혼자 책 읽기 좋은 장소입니다.",
    },
    {
        name: "디뮤지엄",
        type: "전시관",
        region: "서울 성동구",
        description: "현대 예술 전시가 열리는 감각적인 공간입니다.",
        reason: "아이와 함께 예술을 감상하기 좋습니다.",
    },
    {
        name: "한성백제박물관",
        type: "박물관",
        region: "서울 송파구",
        description: "백제 역사 중심의 체험형 박물관입니다.",
        reason: "역사적 교육과 실내 활동으로 적합합니다.",
    },
    {
        name: "북서울 꿈의숲",
        type: "공원",
        region: "서울 강북구",
        description: "자연과 예술이 어우러진 대형 공원입니다.",
        reason: "산책과 여유로운 시간 보내기에 좋습니다.",
    },
];

const Step2Place = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState(mockPlaces);
    const [loading, setLoading] = useState(false);

    const { selectedPlaces, addPlace, removePlace } = usePlaceStore();

    const handleSearch = async () => {
        if (textFilter.isAbusiveOnlyInput(query)) {
            alert("부적절한 단어만 입력되어 요청을 처리할 수 없습니다.");
            setQuery("");
            return;
        }

        setLoading(true);
        try {
            const res = await caxios.post("/api/llm-recommend", {
                userInput: query,
                examplePlaces: mockPlaces,
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
                        e.preventDefault();
                        handleSearch();
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
                    data={filteredResults}
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
