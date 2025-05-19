import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Divider
} from "@mui/material";
import { Link } from "react-router-dom";

function AdminSidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) return null;

  return (
    <Box
      sx={{
        width: 240,
        bgcolor: "#ffffff",
        color: "black",
        height: "100vh",
        flexShrink: 0,
        boxSizing: "border-box",
        p: 2,
      }}
    >
      <Typography variant="h6" sx={{ color: "black", mb: 2 }}>
        관리자 메뉴
      </Typography>
      <Divider sx={{ mt: 1 }} />
      <List>
        <Link to="/admin/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#19a1ad", color:"#fff" } }}>
            <ListItemText primary="대시보드" />
          </ListItem>
        </Link>

        <Link to="/admin/user-stats" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#19a1ad" , color:"#fff" } }}>
            <ListItemText primary="회원 통계" />
          </ListItem>
        </Link>

        <Link to="/admin/placeManagement" style={{ textDecoration: "none", color: "inherit" }}>
          <ListItem button sx={{ "&:hover": { backgroundColor: "#19a1ad", color:"#fff"  } }}>
            <ListItemText primary="여행지 관리" />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}

export default AdminSidebar;
