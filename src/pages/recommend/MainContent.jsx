import React from "react";
import usePlaceStore from "../../store/usePlaceStore";
import Step2Place from "./Step2Place";
import Step3Confirm from "./Step3Confirm";
import { Box, IconButton, Badge } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const MainContent = () => {
  const step = usePlaceStore((s) => s.step);
  const isPanelOpen = usePlaceStore((s) => s.isPanelOpen);
  const togglePanel = usePlaceStore((s) => s.togglePanel);
  const selectedCount = usePlaceStore((s) => s.selectedPlaces.length);

  if (step === 1) return null;

  return (
    <Box
      sx={{
        width: isPanelOpen ? "100%" : "0",
        transition: "width 0.3s ease",
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#fff",
      }}
    >
      {/* 화살표 버튼 */}
      <IconButton
        onClick={togglePanel}
        sx={{
          position: "absolute",
          top: 10,
          right: -16,
          zIndex: 10,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          width: 32,
          height: 32,
        }}
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* 선택된 장소 수 뱃지 */}
      <Box sx={{ position: "absolute", top: 10, right: 25 }}>
        <Badge badgeContent={selectedCount} color="primary" />
      </Box>

      {/* 본문 */}
      <Box sx={{ padding: 2 }}>
        {step === 2 && <Step2Place />}
        {step === 3 && <Step3Confirm />}
      </Box>
    </Box>
  );
};

export default MainContent;
