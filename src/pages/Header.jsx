import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Grid, AppBar, Typography, useMediaQuery, useTheme, Toolbar, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Header() {


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

    return(
    <AppBar>
      <Toolbar sx={{ width: "100%"}}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          <Link to="/"><Typography variant="h6">MyLogo</Typography></Link>
        </Grid>

        <Grid item xs={6} container justifyContent="flex-end">
          {isMobile ? (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              <Button color="inherit">여행지</Button>
              <Button color="inherit">이용방법</Button>
              <Link to="/login"><Button color="inherit">로그인</Button></Link>
              <IconButton onClick={handleSelectBox}><AccountCircleIcon/></IconButton>
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
                  <MenuItem onClick={handleClose} component={Link} to="/myPage">
                    마이페이지
                  </MenuItem>
                  <MenuItem onClick={handleClose} component={Link} to="/admin">
                    관리자페이지
                  </MenuItem>
                </Menu>
            </>
          )}
        </Grid>
      </Grid>



      </Toolbar>
    </AppBar>
    );
}

export default Header;