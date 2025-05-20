import React from 'react';
import styles from "./MyPage.module.css";
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  Divider
} from "@mui/material";

function MyPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();
  const getPageTitle = () => {
    if (location.pathname === "/myPage") return "내 정보";
    if (location.pathname === "/myPage/records") return "나의 여행기록";
    return ""; // 그 외의 경우
  };


  return (
    <Box sx={{ display: "flex", minHeight: "90vh", width: "80vw" }}>
      <Grid>
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
            마이페이지
          </Typography>
          <Divider sx={{ mt: 1 }} />
          <List>
            <Link to="/myPage" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItem button sx={{ "&:hover": { backgroundColor: "#19a1ad", color: "#fff" } }}>
                <ListItemText primary="내 정보" />
              </ListItem>
            </Link>
            <Link to="/myPage/records" style={{ textDecoration: "none", color: "inherit" }}>
              <ListItem button sx={{ "&:hover": { backgroundColor: "#19a1ad", color: "#fff" } }}>
                <ListItemText primary="나의 여행기록" />
              </ListItem>
            </Link>
          </List>
        </Box>
      </Grid>
      <Grid sx={{ width: "100%" }}>
        <Box sx={{ ml: 5, mr: 5, width: "100%" }}>
          <Typography variant="h4" sx={{ mt: 2, ml: 2 }}>
            {getPageTitle()}
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
          <Box sx={{ p: 2, width: "100%" }}>
            <Outlet />
          </Box>
        </Box>
      </Grid>
    </Box>
  )
}

export default MyPage;