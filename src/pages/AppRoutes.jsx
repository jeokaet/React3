import { Routes, Route, useLocation } from "react-router-dom";
import Header from './Header';
import Register from "./Register";
import Login from './Login';
import Mainpage from './mainpage/Mainpage';
import RecommendPage from "./recommend/RecommendPage";
import MyPage from "./myPage/MyPage";
import AdminPage from "./admin/Adminpage";
import Agreement from "./Agreement";
import MyInfo from "./myPage/MyInfo";
import MyRecords from "./myPage/MyRecords";

function AppRoutes() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      {path === "/recommendPage" ? null : <Header />}
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recommendPage" element={<RecommendPage />} />
        <Route path="/myPage" element={<MyPage />}>
          <Route index element={<MyInfo />} />
          <Route path="records" element={<MyRecords />} />
        </Route>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/agreement" element={<Agreement />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
