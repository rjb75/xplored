import React, { useState } from "react";
import "./styles/main.scss";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ComponentTest from "./pages/ComponentTest";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { cp } from "fs";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<ComponentTest />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
