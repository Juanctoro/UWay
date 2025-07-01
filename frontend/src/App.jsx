// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import RequireAuth from './components/RequireAuth';

import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

import './App.css';

function NavLinks() {
  const { user } = useAuth();

  return (
    <nav>
      <Link to="/">Inicio</Link>
      {' | '}
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/register">Registro</Link>
        </>
      ) : (
        <Link to="/profile">Perfil</Link>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavLinks />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/"
            element={
              <RequireAuth>
                <h2>Bienvenido a UWay</h2>
              </RequireAuth>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
