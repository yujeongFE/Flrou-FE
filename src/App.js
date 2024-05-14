import React from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash/index";
import Login from "./pages/Login/index";
import Chatting from "./pages/Chatting/index";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/chatting" element={<Chatting />} />
          <Route exact path="/calendar" element={<Calendar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
