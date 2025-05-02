import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import { Box, Drawer, List, ListItem, ListItemText, Typography, useMediaQuery, useTheme } from "@mui/material";
import PlaceManagement from "./PlaceManagement";

const drawerWidth = 240;

function AdminPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" , paddingTop : 10}}>
      {/* 사이드바 */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open
        sx={{
          width: drawerWidth,
          marginTop : 10,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "#1976d2",
            color: "white",
            top: 64,
          },
        }}
      >
        <Typography variant="h6" sx={{ p: 2 }}>
          관리자 메뉴
        </Typography>
        <List>
          <ListItem button>
            <ListItemText primary="대시보드" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="여행지 관리" />
          </ListItem>
        </List>
      </Drawer>

      {/* 메인 영역 */}
      <Routes>
      {/* <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f5f5f5", p: 3,  marginLeft: 0 }} >
        <Typography variant="h4" gutterBottom>
          관리자 메인
        </Typography>
        <Typography>
          여기는 메인 콘텐츠 영역입니다. 여기에 통계, 테이블, 폼 등을 배치할 수 있습니다.
        </Typography>
      </Box>*/}
    
    <Route path="/placeManagement" element={<PlaceManagement />}></Route>
    </Routes>
</Box> 
  );
}

export default AdminPage;
