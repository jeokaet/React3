import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Grid, AppBar, Typography, useMediaQuery, useTheme, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useAuthStore from '../store/useAuthStore';


function Header() {

const { token, logout, loginId } = useAuthStore();
const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSelectBox = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

    return(
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent', boxShadow: 'none', height: '80px', padding: '10px', width:'85vw' }}>
      <Toolbar sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          {/* 왼쪽 로고 */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <img src="/images/Logo.png" alt="로고" style={{ height: 60 }} />
          </Link>

          {/* 오른쪽 메뉴 영역 */}
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", ml: "auto", mr: "30px" }}>
            {isMobile ? (
              <IconButton sx={{ color: "black" }}>
                <MenuIcon />
              </IconButton>
            ) : (
              <>
                <Link to="/recommendPage" style={{ textDecoration: "none" }}>
                  <Button sx={{ color: "black" }}>여행지</Button>
                </Link>

                <Button sx={{ color: "black" }}>이용방법</Button>

                {token ? (
                  <IconButton onClick={handleSelectBox} sx={{ color: "black" }}>
                    <AccountCircleIcon />
                  </IconButton>
                ) : (
                  <Button component={Link} to="/login" sx={{ color: "black" }}>로그인</Button>
                )}
              </>
            )}
          </Box>
        </Box>

        {/* 메뉴 (공통) */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleLogout} component={Link} to="/">로그아웃</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/myPage">마이페이지</MenuItem>
          {loginId === "Admin" && (
            <MenuItem onClick={handleClose} component={Link} to="/admin">관리자페이지</MenuItem>
          )}
        </Menu>
      </Toolbar>

    </AppBar>
    );
}

export default Header;