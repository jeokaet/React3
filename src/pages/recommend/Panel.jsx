import React from "react";
import { Box, IconButton, Badge, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DeleteIcon from "@mui/icons-material/Delete"; // 🗑 휴지통 아이콘
import usePlaceStore from "../../store/usePlaceStore";
import { motion } from "framer-motion";

const Panel = () => {
  const isSlideOpen = usePlaceStore((s) => s.isSlideOpen);
  const toggleSlide = usePlaceStore((s) => s.toggleSlide);
  const { selectedPlaces, removePlace } = usePlaceStore();
  const typeToKorean = {
    restaurant: "음식점",
    cafe: "카페",
    bar: "바",
    bakery: "빵집",
    tourist_attraction: "관광명소",
    museum: "박물관",
    zoo: "동물원",
    amusement_park: "놀이공원",
    aquarium: "아쿠아리움",
    shopping_mall: "쇼핑몰",
    clothing_store: "의류매장",
    park: "공원",
    natural_feature: "자연경관",
  };

  return (
    <Box
      sx={{
        width: isSlideOpen ? 320 : 35,
        height: "100%",
        backgroundColor: isSlideOpen ? "#fff" : "#f0f0f0",
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
          <Badge badgeContent={selectedPlaces.length} sx={{"& .MuiBadge-badge": { backgroundColor: "#f89f5e",color: "#fff",},}}>
            <ChevronRightIcon />
          </Badge>
        )}
      </IconButton>

      {/* 패널 내용 */}
      {isSlideOpen && (
        <Box sx={{ p: 2 }}>
          <Box sx={{ display:"flex", mb: 4, mt:1, gap:18 }}>
            <Typography variant="h6">
              선택 장소
            </Typography>
            <Typography variant="h6" >
              {selectedPlaces.length} / 4
            </Typography>
          </Box>
          {selectedPlaces.length === 0 ? (
            <Typography sx={{ color: "#999" }}>
              추가한 장소가 없습니다.
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
                  <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
                  >
                  <Box sx={{ width:"100%", display:"flex", alignItems: "center", justifyContent: "center", mb:1}}>
                    <Box sx={{ width:"20px", height:"20px", backgroundColor: "#19a1ad", borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.7rem", mr:1 }}>
                      {i + 1}
                    </Box>
                    <Box sx={{ width:"90%", display:"flex", borderRadius:2, boxShadow: 2, p:1 }}>
                      <Box sx={{ width:"100%"}}>
                      <Typography fontWeight="bold">
                        {place.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {typeToKorean[place.type] || "기타"} · {place.reason.slice(0, 10)} ...
                      </Typography>
                      </Box>
                      <IconButton
                        onClick={() => removePlace(place.name)}
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  </motion.div>
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
