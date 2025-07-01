// src/components/Register.jsx

import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000/';

export default function Register(){
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

    const [errors, setErrors] = useState ({});
    const [message,setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        const {name, value} = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));

        setErrors(prev => ({
            ...prev,
            [name]: undefined,
        }));    
    };

    const handleRegister = async e => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await axios.post(`${API_BASE}users/`, formData);
            setMessage('Usuario registrado exitosamente');
            navigate('/login');
            console.log(response.data);
        } catch (error) {
            console.error(error.reponse?.data || error.message);

            if (error.response && error.response.data){
                setErrors(error.response.data);
            }

            setMessage('Error al registrar usuario');
        }
    }

    return (
    <div>
      <h3>Registro de Usuario</h3>
      <form onSubmit={handleRegister}>
        {[
          { name: 'dni', label: 'DNI' },
          { name: 'names', label: 'Nombres' },
          { name: 'lastnames', label: 'Apellidos' },
          { name: 'phone', label: 'Teléfono' },
          { name: 'address', label: 'Dirección' },
          { name: 'email', label: 'Email' },
          { name: 'institutional_email', label: 'Email institucional' },
          { name: 'password', label: 'Contraseña', type: 'password' },
        ].map(({ name, label, type = 'text' }) => (
          <div key={name}>
            <label>{label}:</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              required
            />
            {errors[name] && (
                <div style={{ color: 'red '}}>
                    {errors[name].map((err,idx) => (
                        <div key={idx}> {err} </div>
                    ))}
                </div>
            )}
          </div>
        ))}
        <button type="submit">Registrarse</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}