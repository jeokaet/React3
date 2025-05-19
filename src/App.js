import "./App.css";
import {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ 추가
import useAuthStore from "./store/useAuthStore";
import AppRoutes from "./pages/AppRoutes";


function App() {
  const initialize = useAuthStore((state) => state.initialize);
  

  useEffect(() => {
    initialize(); // ✅ 새로고침 시 sessionStorage에서 상태 복원
  }, []);

  return (
    <div className="app-wrapper">
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;
