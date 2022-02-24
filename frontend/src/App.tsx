import React from 'react';import './App.css';
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <h1>Xplored</h1>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
