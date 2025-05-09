import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"; 
import { Box } from "@mui/material";
import PlaceManagement from "./PlaceManagement";
import AdminSidebar from './AdminSIdebar';
import DashBoard from "./DashBoard";
import UserStats from "./UserStats";


function AdminPage() {

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" , paddingTop : 10}}>
        <AdminSidebar/>
        <Routes>
            <Route path="/" element={<DashBoard/>}></Route>
            <Route path="/dashBoard" element={<DashBoard/>}></Route>
            <Route path="/placeManagement" element={<PlaceManagement />}></Route>
            <Route path="/user-stats" element={<UserStats/>} />
        </Routes>
</Box> 
  );
}

export default AdminPage;
