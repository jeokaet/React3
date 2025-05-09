import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "#1976d2",
          color: "white",
          top: 64, // AppBar 높이에 맞춤
        },
      }}
    >
      <Typography variant="h6" sx={{ p: 2 }}>
        관리자 메뉴
      </Typography>
      <List>

        {/* 대시보드 */}
        <Link to="/admin/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemText primary="📊 대시보드" />
          </ListItem>
        </Link>

        {/* 회원 통계 */}
        <Link to="/admin/user-stats" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemText primary="👤 회원 통계" />
          </ListItem>
        </Link>

        {/* 장소 관리 */}
        <Link to="/admin/placeManagement" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button>
            <ListItemText primary="🏠 여행지 관리" />
          </ListItem>
        </Link>

      </List>
    </Drawer>
  );
}

export default AdminSidebar;
