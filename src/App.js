import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 추가
import Header from './pages/Header';
import Register from "./pages/Register"; // ✅ 회원가입 페이지 import
import Login from './pages/Login';
import Mainpage from "./pages/mainpage/Mainpage";

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
