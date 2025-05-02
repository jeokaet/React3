import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Link } from "react-router-dom"; 

function AdminSidebar (){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return(
        
      <Drawer
      variant={isMobile ? "temporary" : "permanent"}
      open
      sx={{
        width: 240,
        marginTop : 10,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
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
        <Link to="/admin/dashBoard">
        <ListItem button>
        <ListItemText primary="대시보드" />
        </ListItem>
        </Link>
        <Link to="/admin/placeManagement">
        <ListItem button>
          <ListItemText primary="여행지 관리" />
        </ListItem>
        </Link>
      </List>
    </Drawer>
    )
}

export default AdminSidebar;