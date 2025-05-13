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
    <AppBar>
      <Toolbar sx={{ width: "100%"}}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Typography component={Link} to="/" color="inherit" variant="h6">MyLogo</Typography>
        </Grid>

        <Grid item xs={6} container  justifyContent="flex-end" alignItems="center" sx={{ textAlign: "right" }}>
          {isMobile ? (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Link to="/recommendPage"><Button color="inherit">여행지</Button></Link>
              <Button color="inherit">이용방법</Button>
              {
                token ? <IconButton onClick={handleSelectBox}><AccountCircleIcon/></IconButton> : <Button component={Link} to="/login" color="inherit">로그인</Button> 
              }
  
              <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={handleLogout} component={Link} to="/">
                    로그아웃
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/myPage">
                    마이페이지
                  </MenuItem>
                  {
                    loginId=="Admin" ? <MenuItem onClick={handleClose} component={Link} to="/admin">관리자페이지</MenuItem> : <></>
                  }
                  
                </Menu>
            </Box>
          )}
        </Grid>
      </Grid>



      </Toolbar>
    </AppBar>
    );
}

export default Header;