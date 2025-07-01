import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <ul>
        <li><strong>DNI:</strong> {user.dni}</li>
        <li><strong>Nombres:</strong> {user.names}</li>
        <li><strong>Apellidos:</strong> {user.lastnames}</li>
        <li><strong>Teléfono:</strong> {user.phone}</li>
        <li><strong>Dirección:</strong> {user.address}</li>
        <li><strong>Email:</strong> {user.email}</li>
        <li><strong>Email institucional:</strong> {user.institutional_email}</li>
      </ul>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
