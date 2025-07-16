// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';

import Login from './components/UWayLogin';
import Profile from './components/UWayProfile';
import Landing from './components/UWayLanding';
import Register from './components/UWayRegister';

export default function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element = {<Profile />} />
        </Routes>/
      </Router>
  );
}
