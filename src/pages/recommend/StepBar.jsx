import React from "react";
import { Box, Typography, Divider, Button } from "@mui/material";
import usePlaceStore from "../../store/usePlaceStore";
import useLocationStore from "../../store/useLocationStore";
import caxios from "../../api/caxios";
import MainContent from "./MainContent";

const StepBar = () => {
  const { step, setStep, startLocation, selectedPlaces, region, category } = usePlaceStore();
  const { tripLocation, tripDate} = useLocationStore();

  const handleNext = async () => {
    if (step === 1) {
      if( tripLocation != null){ 
          try {
            const res = await caxios.get("/api/getList", {
              params: {
                date: tripDate,
                startingLocation: tripLocation
              }
            });

            if (res.data.error) {
              alert(res.data.error);
              return;
            }

            // ✅ 결과 데이터 활용
            const getList = res.data.results;
            console.log("추천 결과:", getList);
          
        } catch (err) {
          console.error("LLM 요청 실패:", err);
        }
      }
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      if (!startLocation?.name) {
        return alert("출발지를 선택해주세요.");
      }
      if (!selectedPlaces.length) {
        return alert("장소를 선택해주세요.");
      }

      const dateToSave = tripDate || new Date().toISOString().slice(0, 10);

      try {
        await caxios.post("/api/trip/save", {
          tripDate: dateToSave,
          startLocation,
          selectedPlaces,
          category,
          region,
        });

        alert("저장 완료!");
      } catch (err) {
        alert("저장 실패");
        console.error(err);
      }
    }
  };

  const handleBefore = async () => {
    if (step <= 3) {
      setStep(step - 1);
    } 
  };

  // STEP 설명문
  const stepLabels = {
    1: "날짜 및 위치 확인",
    2: "장소 선택",
    3: "최종 확인",
  };

  return (
    <Box sx={{ p: 2 , height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        {[1, 2, 3].map((n) => (
          <Box
            key={n}
            sx={{ mb: 1, cursor: "pointer" }}
            onClick={() => setStep(n)}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: step === n ? "bold" : "normal",
                color: step === n ? "#1976d2" : "#999",
              }}
            >
              STEP {n}
            </Typography>

            <Typography
              variant="caption"
              sx={{ color: "#777", ml: 1 }}
            >
              {stepLabels[n]}
            </Typography>
          </Box>
        ))}
        <Divider sx={{ mt: 1 }} />
      </Box>

      {/* 하단 버튼 */}
      {step === 1 ? <></> : <Button onClick={handleBefore} fullWidth variant="contained" sx={{ mt: 2 }}>이전</Button>
}
      <Button
        onClick={handleNext}
        fullWidth
        variant="contained"
        sx={{ mt: 2 }}
      >
        {step === 3 ? "저장" : "다음"}
      </Button>
    </Box>
  );
};

export default StepBar;
