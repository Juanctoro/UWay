// src/components/RequireAuth.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>¿Qué es UWay?</h2>
        <p>
          UWay es la plataforma universitaria de transporte que permite a estudiantes y conductores
          coordinar viajes, ver rutas y gestionar reservas de manera segura y eficiente.
        </p>
        <Link to="/register">
          <button>Regístrate aquí</button>
        </Link>
      </div>
    );
  }

  return children;
}
