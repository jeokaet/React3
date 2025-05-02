import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 추가
import Header from './pages/Header';
import Register from "./pages/Register"; // ✅ 회원가입 페이지 import
import Login from './pages/Login';
import Mainpage from "./pages/mainpage/Mainpage";
import RecommendPage from "./pages/recommend/RecommendPage";
import MyPage from "./pages/myPage/MyPage";
import AdminPage from "./pages/admin/Adminpage";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          <Route path="/recommendPage" element={<RecommendPage/>}/>
          <Route Path="/myPage" element={<MyPage/>}/>
          <Route path="admin" element={<AdminPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
