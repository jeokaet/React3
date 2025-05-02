import React from "react";
import { Link } from "react-router-dom";
import { Button, Grid, AppBar, Typography, useMediaQuery, useTheme, Toolbar, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";


function Header() {

const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            </>
          )}
        </Grid>
      </Grid>



      </Toolbar>
    </AppBar>
    );
}

export default Header;