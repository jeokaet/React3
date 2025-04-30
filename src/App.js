import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 추가
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ 회원가입 페이지 import

function App() {
  return (
    <div className="app-wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
