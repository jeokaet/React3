import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // App.js 맞게 경로 주의
import "./index.css"; // 스타일 있으면

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
