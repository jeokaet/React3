import React from 'react';
import styles from "./MyPage.module.css";
import { Link, Outlet } from 'react-router-dom';
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




  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: "80vw" }}>
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
      <Grid>
        <Box sx={{ ml: 5, mr: 5 }}>
          <Typography variant="h4" sx={{ mt: 2 }}>
            내 정보
          </Typography>
          <Divider sx={{ mt: 1, mb: 3 }} />
          <Box sx={{ p: 2}}>
            <Outlet />
          </Box>
        </Box>
      </Grid>
    </Box>

    // <Box sx={{ display: 'flex', mt: '64px' }}>
    //   <Drawer variant={isMobile ? "temporary" : "permanent"}
    //     open
    //     sx={{
    //       width: 240,
    //       flexShrink: 0,
    //       "& .MuiDrawer-paper": {
    //         width: 240,
    //         boxSizing: "border-box",
    //         bgcolor: "#f5f5f5",
    //         color: "#333",
    //         top: 64, // AppBar 높이에 맞춤
    //       },
    //     }}
    //   >
    //     <Typography variant="h6" sx={{ p: 2 }}>
    //       마이페이지
    //     </Typography>
    //     <List>
    //       <Link to="/myPage" style={{ textDecoration: "none", color: "inherit" }}>
    //         <ListItem button>
    //           <ListItemText primary="내 정보" />
    //         </ListItem>
    //       </Link>
    //       <Link to="/myPage/records" style={{ textDecoration: "none", color: "inherit" }}>
    //         <ListItem button>
    //           <ListItemText primary="나의 여행기록" />
    //         </ListItem>
    //       </Link>
    //     </List>
    //   </Drawer>
    //   <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    //     <Outlet />
    //   </Box>

    // </Box>

  )
}

export default MyPage;