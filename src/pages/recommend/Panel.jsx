import React from "react";
import { Box, IconButton, Badge, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete"; // 🗑 휴지통 아이콘
import usePlaceStore from "../../store/usePlaceStore";

const Panel = () => {
  const isSlideOpen = usePlaceStore((s) => s.isSlideOpen);
  const toggleSlide = usePlaceStore((s) => s.toggleSlide);
  const { selectedPlaces, removePlace } = usePlaceStore();

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
      {/* 패널 토글 버튼 */}
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

      {/* 패널 내용 */}
      {isSlideOpen && (
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            선택된 장소
          </Typography>
          {selectedPlaces.length === 0 ? (
            <Typography sx={{ color: "#999" }}>
              아직 선택한 장소가 없습니다.
            </Typography>
          ) : (
            <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
              {selectedPlaces.map((place, i) => (
                <li
                  key={i}
                  style={{
                    marginBottom: "8px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography fontWeight="bold">
                      {i + 1}. {place.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {place.type} · {place.region}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => removePlace(place.name)}
                    size="small"
                    sx={{ ml: 1 }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
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
