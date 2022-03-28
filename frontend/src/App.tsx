import React, { useState } from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ComponentTest from "./pages/ComponentTest";
import Signup from "./pages/Signup";
import { cp } from "fs";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<div><NavBar /><Home /></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
