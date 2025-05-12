import React, { useState } from "react";
import caxios from "../../api/caxios";
import { Box, Typography, TextField, TableHead, TableBody, TableRow, TableCell, Grid, Table, Button } from "@mui/material";
import textFilter from "../../utils/textFilter";

// 🔸 더미 장소 데이터 (LLM이 필터링 대상으로 사용할 리스트)
const mockPlaces = [
    {
        name: "국립중앙박물관",
        type: "박물관",
        region: "서울 용산구",
        description: "다양한 유물을 전시하는 대표 박물관입니다.",
        reason: "아이 교육에 적합하고 쾌적한 실내 환경입니다."
    },
    {
        name: "카페 드림",
        type: "카페",
        region: "서울 강남구",
        description: "조용하고 감성적인 분위기의 카페입니다.",
        reason: "혼자 책 읽기 좋은 장소입니다."
    },
    {
        name: "디뮤지엄",
        type: "전시관",
        region: "서울 성동구",
        description: "현대 예술 전시가 열리는 감각적인 공간입니다.",
        reason: "아이와 함께 예술을 감상하기 좋습니다."
    },
    {
        name: "한성백제박물관",
        type: "박물관",
        region: "서울 송파구",
        description: "백제 역사 중심의 체험형 박물관입니다.",
        reason: "역사적 교육과 실내 활동으로 적합합니다."
    },
    {
        name: "북서울 꿈의숲",
        type: "공원",
        region: "서울 강북구",
        description: "자연과 예술이 어우러진 대형 공원입니다.",
        reason: "산책과 여유로운 시간 보내기에 좋습니다."
    }
];

const Step2Place = () => {
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    // ✅ 사용자 입력 기반 서버 요청 (LLM 호출 포함)
    const handleSearch = async () => {
        if (textFilter.isAbusiveOnlyInput(query)) {
            alert("부적절한 단어만 입력되어 요청을 처리할 수 없습니다.");
            setQuery("");
            return;
        }
        try {
            const res = await caxios.post("/api/llm-recommend", {
                userInput: query,
                examplePlaces: mockPlaces
            });

            if (res.data.error) {
                alert(res.data.error); 
                return; 
            }

            // ✅ 정상 결과만 있을 경우 리스트 업데이트
            setFilteredResults(res.data.results);
            setQuery("");
        } catch (err) {
            console.error("LLM 요청 실패:", err);
            alert("추천 요청 중 오류가 발생했습니다.");
        }
    };


    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                추천 장소 검색
            </Typography>

            {/* 사용자 입력 필드 */}
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

            <Button variant="contained" onClick={handleSearch} sx={{ mb: 3 }}>
                장소 추천 받기
            </Button>

            {/* 추천 리스트 */}
            <Grid sx={{ height: "100%", overflow: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>장소명</TableCell>
                            <TableCell>유형</TableCell>
                            <TableCell>지역</TableCell>
                            <TableCell>설명</TableCell>
                            <TableCell>추천 이유</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredResults.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    추천 결과가 없습니다.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredResults.map((place, idx) => (
                                <TableRow key={idx}>
                                    <TableCell>{place.name}</TableCell>
                                    <TableCell>{place.type}</TableCell>
                                    <TableCell>{place.region}</TableCell>
                                    <TableCell>{place.description}</TableCell>
                                    <TableCell>{place.reason}</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </Grid>
        </Box>
    );
};

export default Step2Place;
