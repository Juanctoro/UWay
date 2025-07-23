import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './styles/UWayLogin.css';

const UWayLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dni: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dni) {
      newErrors.dni = "Usuario es requerido";
    }
    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Contraseña debe tener al menos 6 caracteres";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await login({ dni: formData.dni, password: formData.password });
      console.log("Login submitted:", formData);
      alert("Login exitoso! (Este es solo un ejemplo)");
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      alert("Error en el login. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Icon components
  const TransportIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6v6h8V6M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6Z" />
      <path d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  );

  const TransportIconSmall = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 6v6h8V6M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6Z" />
      <path d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );

  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="left-side">
        <div className="campus-overlay" />
        <button
          className="back-button uway-button"
          onClick={() => navigate('/')} 
        >
          <ArrowLeftIcon />
          Volver
        </button>
        <div className="left-content">
          <h1 className="left-title">Transporte Seguro</h1>
          <p className="left-subtitle">
            Conectando comunidades educativas con soluciones de transporte verificadas y confiables
          </p>
          <div className="transport-icon">
            <TransportIcon />
          </div>
        </div>
        <div className="version-text">V 1.0.1</div>
      </div>

      {/* Right Side */}
      <div className="right-side">
        <div className="form-container">
          <div className="form-header">
            <div className="logo">
              <div className="logo-icon">U</div>
              <span className="logo-text">UWay</span>
            </div>
            <p className="welcome-text">
              Bienvenido a <span className="highlight">UWay</span>
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="form-label" htmlFor="dni">Usuario</label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                className={`uway-input ${errors.dni ? "uway-input-error" : ""}`}
                placeholder="123456789"
              />
              {errors.dni && <span className="input-error">{errors.dni}</span>}
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`uway-input ${errors.password ? "uway-input-error" : ""}`}
                placeholder="••••••••"
              />
              {errors.password && <span className="input-error">{errors.password}</span>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="uway-button"
            >
              {isLoading ? (
                <>
                  <div className="spinner"></div>
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          <div className="transport-icon-bottom">
            <TransportIconSmall />
          </div>

          <div className="login-footer">
            ¿No tienes una cuenta? <a href="/register" className="login-link">Registrarse</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UWayLogin;
