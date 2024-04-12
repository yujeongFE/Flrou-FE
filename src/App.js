import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash/index";
import Chatting from "./pages/Chatting/index";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Splash />} />
          <Route exact path="/chatting" element={<Chatting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
