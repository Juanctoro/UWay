// src/components/RequireAuth.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    // Si no está autorizado, redirige a la landing
    return <Navigate to="/" replace />;
  }

  return children;
}