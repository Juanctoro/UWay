import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosClient';

export default function Register() {
  const [formData, setFormData] = useState({
    dni: '',
    names: '',
    lastnames: '',
    phone: '',
    address: '',
    email: '',
    institutional_email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await api.post('/users/', formData);
      setMsg('Usuario registrado exitosamente');
      navigate('/login');
    } catch (error) {
      if (error.response?.data) setErrors(error.response.data);
      setMsg('Error al registrar usuario');
    }
  };

  return (
    <div>
      <h3>Registro de Usuario</h3>
      <form onSubmit={handleSubmit}>
        {[
          { name: 'dni', label: 'DNI' },
          { name: 'names', label: 'Nombres' },
          { name: 'lastnames', label: 'Apellidos' },
          { name: 'phone', label: 'Teléfono' },
          { name: 'address', label: 'Dirección' },
          { name: 'email', label: 'Email' },
          { name: 'institutional_email', label: 'Email institucional', required: false },
          { name: 'password', label: 'Contraseña', type: 'password' },
        ].map(({ name, label, type = 'text', required = true }) => (
          <div key={name}>
            <label>{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required={required}
            />
            {errors[name] && (
              <div style={{ color: 'red' }}>
                {errors[name].map((err, idx) => (
                  <div key={idx}>{err}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button type="submit">Registrarse</button>
      </form>
      {msg && <div>{msg}</div>}
    </div>
  );
}
