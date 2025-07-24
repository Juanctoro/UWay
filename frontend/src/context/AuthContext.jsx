import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axiosClient';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => Promise.resolve(),
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  // Función para obtener el usuario actual del backend
  const fetchUser = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { data } = await api.get('/users/me/', {
        headers: { Authorization: `Token ${token}` }
      });
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      // Si da 401 o falla, limpiamos todo
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Cada vez que cambie la ruta o se recarga, volvemos a chequear el usuario
  useEffect(() => {
    fetchUser();
  }, [location]);

  // Interceptor global para detectar 401 y hacer logout
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      resp => resp,
      err => {
        if (err.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  // Función de login
  const login = async ({ dni, password }) => {
    setLoading(true);
    const { data } = await api.post('/users/login/', { dni, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    setLoading(false);
    return data.user;
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
