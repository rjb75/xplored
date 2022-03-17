import React from "react";
import "./styles/main.scss"
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ComponentTest from "./pages/ComponentTest";

function App() {
    return (
        <div className="App">
            <h1>Xplored</h1>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/component-test" element={<ComponentTest />} />
            </Routes>
        </div>
    );
}

export default App;
