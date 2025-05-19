import "./App.css";
import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 추가
import Header from './pages/Header';
import Register from "./pages/Register"; // ✅ 회원가입 페이지 import
import Login from './pages/Login';
import Mainpage from "./pages/mainpage/Mainpage";
import RecommendPage from "./pages/recommend/RecommendPage";
import MyPage from "./pages/myPage/MyPage";
import AdminPage from "./pages/admin/Adminpage";
import Agreement from "./pages/Agreement";
import MyInfo from "./pages/myPage/MyInfo";
import MyRecords from "./pages/myPage/MyRecords";
import useAuthStore from "./store/useAuthStore";


function App() {
  const initialize = useAuthStore((state) => state.initialize);
  

  useEffect(() => {
    initialize(); // ✅ 새로고침 시 sessionStorage에서 상태 복원
  }, []);

  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/recommendPage" element={<RecommendPage/>}/>

          <Route path="/myPage" element={<MyPage/>}>
          <Route index element={<MyInfo/>}/>
          <Route path="records" element={<MyRecords/>}/>
          </Route>

          <Route path="/admin/*" element={<AdminPage />}/>
          <Route path="/agreement" element={<Agreement/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
