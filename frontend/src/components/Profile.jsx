import React, {useState} from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosClient';

export default function Profile() {
  const { user, setUser,logout } = useAuth();
  const [editField, setEditField] = useState(null);
  const [editedValue, setEditedValue] = useState('');

  const handleSave = async e => {
  e.preventDefault();
  try {
    const originalDni = user.dni;
    const updatedUser = {
      ...user,
      [editField]: editedValue,
    };

    const response = await api.patch(`/users/${originalDni}/`, {[editField]:editedValue});
    setUser(response.data)
    localStorage.setItem('user', JSON.stringify(response.data));

    setEditField(null);
  } catch (error) {
      console.error('Error completo:', error);
      console.error("Respuesta del backend:", error.response?.data);
    if (error.response?.data) {
      setErrors(error.response.data);
      console.error('Error del backend:', error.response.data);
    } else {
      console.error('Error inesperado:', error.message);
    }
  }
};

  const startEditing = (fieldName, currentValue) => {
    setEditField(fieldName);
    setEditedValue(currentValue);
  }

  const cancelEditing = () => {
    setEditField(null);
    setEditedValue('');
  }

  const fields = [
    { name: 'dni', label: 'DNI' },
    { name: 'names', label: 'Nombres' },
    { name: 'lastnames', label: 'Apellidos' },
    { name: 'phone', label: 'Teléfono' },
    { name: 'address', label: 'Dirección' },
    { name: 'email', label: 'Email' },
    { name: 'institutional_email', label: 'Email institucional' },
  ];

  return (
    <div>
      <h2>Perfil del Usuario</h2>
      <ul>
          {fields.map(({ name, label }) => (
              <li key={name}>
                  <strong>{label}:</strong>{' '}
                  {editField === name ? (
                      <>
                          <input
                              type="text"
                              value={editedValue}
                              onChange={e => setEditedValue(e.target.value)}
                          />
                          <button onClick={handleSave}>Guardar</button>
                          <button onClick={cancelEditing}>Cancelar</button>
                      </>
                  ) : (
                      <>
                          {user[name]}
                          <button onClick={() => startEditing(name, user[name])}>
                              Editar
                          </button>
                      </>
                  )}
              </li>
          ))}
      </ul>
      <div>
        <button onClick={logout}>Cerrar Sesión</button>
    </div>
  </div>
  );
}
