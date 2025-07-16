import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";
import "./styles/UWayRegister.css";

const UWayRegister = () => {
  const [formData, setFormData] = useState({
    dni: "",
    names: "",
    lastnames: "",
    phone: "",
    address: "",
    email: "",
    institutionalEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.dni.trim()) newErrors.dni = "DNI es requerido";
    if (!formData.names.trim()) newErrors.names = "Nombres son requeridos";
    if (!formData.lastnames.trim()) newErrors.lastnames = "Apellidos son requeridos";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono es requerido";
    if (!formData.address.trim()) newErrors.address = "Dirección es requerida";
    if (!formData.email.trim()) newErrors.email = "Email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email no es válido";
    if (!formData.password) newErrors.password = "Contraseña es requerida";
    else if (formData.password.length < 6) newErrors.password = "Contraseña debe tener al menos 6 caracteres";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    if (formData.institutionalEmail && !/\S+@\S+\.\S+/.test(formData.institutionalEmail))
      newErrors.institutionalEmail = "Email institucional no es válido";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await api.post("/users/", formData);
      alert("Registro exitoso! (Este es solo un ejemplo)");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Error en el registro. Por favor intenta de nuevo.");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <div className="uway-register-container">
      <nav className="uway-nav">
        <div className="nav-container">
          <div className="logo">
            <div className="logo-icon">U</div>
            <span className="logo-text">UWay</span>
          </div>
          <div className="nav-buttons">
            <button onClick={() => navigate("/")} className="btn-ghost">Volver al Inicio</button>
            <button className="btn-outline">Iniciar Sesión</button>
          </div>
        </div>
      </nav>

      <main className="uway-main">
        <div className="form-container">
          <div className="header">
            <div className="badge">
              <UserIcon /><span style={{ marginLeft: "4px" }}>Nuevo Usuario</span>
            </div>
            <h1 className="title">Crear Cuenta</h1>
            <p className="subtitle">Únete a la comunidad UWay y comienza tu viaje seguro</p>
          </div>

          <form className="uway-form" onSubmit={handleSubmit}>
            {/* DNI */}
            <div className="field">
              <label htmlFor="dni">DNI</label>
              <input
                type="text"
                id="dni"
                name="dni"
                value={formData.dni}
                onChange={handleInputChange}
                className={errors.dni ? "error" : ""}
                placeholder="12345678"
                maxLength="20"
              />
              {errors.dni && <span className="error-text">{errors.dni}</span>}
            </div>

            {/* Nombres / Apellidos */}
            <div className="field-group">
              {["names", "lastnames"].map((fld, i) => (
                <div className="field" key={fld}>
                  <label htmlFor={fld}>{fld === "names" ? "Nombres" : "Apellidos"}</label>
                  <input
                    type="text"
                    id={fld}
                    name={fld}
                    value={formData[fld]}
                    onChange={handleInputChange}
                    className={errors[fld] ? "error" : ""}
                    placeholder={fld === "names" ? "Juan Carlos" : "García López"}
                  />
                  {errors[fld] && <span className="error-text">{errors[fld]}</span>}
                </div>
              ))}
            </div>

            {/* Teléfono */}
            <div className="field">
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? "error" : ""}
                placeholder="+57 300 123 4567"
              />
              {errors.phone && <span className="error-text">{errors.phone}</span>}
            </div>

            {/* Dirección */}
            <div className="field">
              <label htmlFor="address">Dirección</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={errors.address ? "error" : ""}
                placeholder="Calle 123 #45-67, Ciudad"
              />
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            {/* Email */}
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? "error" : ""}
                placeholder="tu@email.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* Email Institucional */}
            <div className="field">
              <label htmlFor="institutionalEmail">
                Email Institucional <span className="optional">(opcional)</span>
              </label>
              <input
                type="email"
                id="institutionalEmail"
                name="institutionalEmail"
                value={formData.institutionalEmail}
                onChange={handleInputChange}
                className={errors.institutionalEmail ? "error" : ""}
                placeholder="estudiante@universidad.edu.co"
              />
              {errors.institutionalEmail && (
                <span className="error-text">{errors.institutionalEmail}</span>
              )}
            </div>

            {/* Contraseña */}
            {["password", "confirmPassword"].map((fld) => (
              <div className="field" key={fld}>
                <label htmlFor={fld}>
                  {fld === "password" ? "Contraseña" : "Confirmar Contraseña"}
                </label>
                <input
                  type="password"
                  id={fld}
                  name={fld}
                  value={formData[fld]}
                  onChange={handleInputChange}
                  className={errors[fld] ? "error" : ""}
                  placeholder="••••••••"
                />
                {errors[fld] && <span className="error-text">{errors[fld]}</span>}
              </div>
            ))}

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? (
                <>
                  <div className="spinner" /> Creando cuenta...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </button>
          </form>

          <div className="footer">
            ¿Ya tienes una cuenta? <a onClick={() => navigate("/login")}>Iniciar sesión</a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UWayRegister;
