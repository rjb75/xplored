import React from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ComponentTest from "./pages/ComponentTest";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/component-test" element={<ComponentTest />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
