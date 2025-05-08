import React from "react";
import { Box, IconButton, Badge, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import usePlaceStore from "../../store/usePlaceStore";

const Panel = () => {
  const isSlideOpen = usePlaceStore((s) => s.isSlideOpen);
  const toggleSlide = usePlaceStore((s) => s.toggleSlide);
  const selectedPlaces = usePlaceStore((s) => s.selectedPlaces || []);

  return (
    <Box
      sx={{
        width: isSlideOpen ? 320 : 48,
        height: "100%",
        backgroundColor: "#fafafa",
        borderLeft: "1px solid #ccc",
        transition: "width 0.3s ease",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* 토글 버튼 */}
      <IconButton
        onClick={toggleSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: isSlideOpen ? -16 : -16,
          transform: "translateY(-50%)",
          backgroundColor: "#fff",
          boxShadow: 1,
          zIndex: 2,
        }}
      >
        {isSlideOpen ? (
          <ChevronLeftIcon />
        ) : (
          <Badge badgeContent={selectedPlaces.length} color="primary">
            <ChevronRightIcon />
          </Badge>
        )}
      </IconButton>

      {/* 본문 */}
      {isSlideOpen && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            선택된 장소
          </Typography>
          {selectedPlaces.length === 0 ? (
            <Typography sx={{ color: "#999" }}>아직 선택한 장소가 없습니다.</Typography>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {selectedPlaces.map((place, i) => (
                <li key={i} style={{ marginBottom: "8px" }}>
                  <Typography>{i + 1}. {place.name}</Typography>
                </li>
              ))}
            </ul>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Panel;
