import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
import api from '../api/axiosClient';

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
  });

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      margin: "0",
      padding: "0",
      background:
        "linear-gradient(to bottom right, rgba(166, 85, 247, 0.05), #ffffff, rgba(166, 85, 247, 0.1))",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#1a1a1a",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
      overflowY: "auto",
      boxSizing: "border-box",
    },
    nav: {
      padding: "24px 32px",
      width: "100%",
      boxSizing: "border-box",
    },
    navContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      maxWidth: "1280px",
      margin: "0 auto",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      backgroundColor: "#a855f7",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontWeight: "bold",
      fontSize: "20px",
    },
    logoText: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#1a1a1a",
    },
    navButtons: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "10px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.15s ease",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      boxSizing: "border-box",
    },
    buttonGhost: {
      backgroundColor: "transparent",
      color: "#1a1a1a",
    },
    buttonOutline: {
      backgroundColor: "white",
      color: "#1a1a1a",
      border: "1px solid #e5e7eb",
    },
    buttonPrimary: {
      backgroundColor: "#a855f7",
      color: "white",
    },
    main: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 32px",
      boxSizing: "border-box",
    },
    formContainer: {
      width: "100%",
      maxWidth: "500px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderRadius: "20px",
      padding: "40px",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "8px",
      color: "#1a1a1a",
      margin: "0 0 8px 0",
    },
    subtitle: {
      fontSize: "16px",
      color: "#6b7280",
      marginBottom: "24px",
      margin: "0 0 24px 0",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      color: "#a855f7",
      fontSize: "12px",
      fontWeight: "600",
      padding: "2px 10px",
      borderRadius: "9999px",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      marginBottom: "16px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    fieldGroup: {
      display: "flex",
      gap: "16px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "6px",
      color: "#1a1a1a",
    },
    labelOptional: {
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "6px",
      color: "#1a1a1a",
    },
    optionalText: {
      fontSize: "12px",
      color: "#6b7280",
      fontWeight: "400",
    },
    input: {
      color: "#000",
      padding: "12px 16px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      fontSize: "14px",
      transition: "all 0.15s ease",
      backgroundColor: "white",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#a855f7",
      boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.1)",
    },
    inputError: {
      borderColor: "#ef4444",
      boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
    },
    error: {
      fontSize: "12px",
      color: "#ef4444",
      marginTop: "4px",
    },
    submitButton: {
      padding: "16px",
      backgroundColor: "#a855f7",
      color: "white",
      border: "none",
      borderRadius: "10px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.15s ease",
      marginTop: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      boxSizing: "border-box",
    },
    submitButtonHover: {
      backgroundColor: "#9333ea",
      transform: "translateY(-1px)",
    },
    submitButtonDisabled: {
      backgroundColor: "#d1d5db",
      cursor: "not-allowed",
      transform: "none",
    },
    footer: {
      textAlign: "center",
      marginTop: "24px",
      fontSize: "14px",
      color: "#6b7280",
    },
    link: {
      color: "#a855f7",
      textDecoration: "none",
      fontWeight: "500",
    },
    spinner: {
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTop: "2px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.dni.trim()) newErrors.dni = "DNI es requerido";
    if (!formData.names.trim()) newErrors.names = "Nombres son requeridos";
    if (!formData.lastnames.trim())
      newErrors.lastnames = "Apellidos son requeridos";
    if (!formData.phone.trim()) newErrors.phone = "Teléfono es requerido";
    if (!formData.address.trim()) newErrors.address = "Dirección es requerida";
    if (!formData.email.trim()) {
      newErrors.email = "Email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email no es válido";
    }
    if (!formData.password) {
      newErrors.password = "Contraseña es requerida";
    } else if (formData.password.length < 6) {
      newErrors.password = "Contraseña debe tener al menos 6 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }

    // Validate institutional email if provided
    if (
      formData.institutionalEmail &&
      !/\S+@\S+\.\S+/.test(formData.institutionalEmail)
    ) {
      newErrors.institutionalEmail = "Email institucional no es válido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {     
      await api.post('/users/', formData);
      console.log("Form submitted:", formData);
      alert("Registro exitoso! (Este es solo un ejemplo)");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert("Error en el registro. Por favor intenta de nuevo.");
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const UserIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  return (
    <>
    
      <div style={styles.container}>
        {/* Navigation */}
        <nav style={styles.nav} className="uway-nav">
          <div style={styles.navContainer}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>U</div>
              <span style={styles.logoText}>UWay</span>
            </div>
            <div style={styles.navButtons} className="nav-buttons">
              <button
                style={{ ...styles.button, ...styles.buttonGhost }}
                onClick={() => navigate("/")}
                className="uway-button"
              >
                Volver al Inicio
              </button>
              <button
                style={{ ...styles.button, ...styles.buttonOutline }}
                className="uway-button"
              >
                Iniciar Sesión
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={styles.main} className="uway-main">
          <div style={styles.formContainer} className="form-container">
            <div style={styles.header}>
              <div style={styles.badge}>
                <UserIcon />
                <span style={{ marginLeft: "4px" }}>Nuevo Usuario</span>
              </div>
              <h1 style={styles.title}>Crear Cuenta</h1>
              <p style={styles.subtitle}>
                Únete a la comunidad UWay y comienza tu viaje seguro
              </p>
            </div>

            <form style={styles.form} onSubmit={handleSubmit}>
              {/* DNI */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="dni">
                  DNI
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.dni ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.dni ? "uway-input-error" : ""}`}
                  placeholder="12345678"
                  maxLength="20"
                />
                {errors.dni && <span style={styles.error}>{errors.dni}</span>}
              </div>

              {/* Names and Surnames */}
              <div style={styles.fieldGroup} className="field-group">
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="names">
                    Nombres
                  </label>
                  <input
                    type="text"
                    id="names"
                    name="names"
                    value={formData.names}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.names ? styles.inputError : {}),
                    }}
                    className={`uway-input ${errors.names ? "uway-input-error" : ""}`}
                    placeholder="Juan Carlos"
                  />
                  {errors.names && (
                    <span style={styles.error}>{errors.names}</span>
                  )}
                </div>
                <div style={styles.field}>
                  <label style={styles.label} htmlFor="lastnames">
                    Apellidos
                  </label>
                  <input
                    type="text"
                    id="lastnames"
                    name="lastnames"
                    value={formData.lastnames}
                    onChange={handleInputChange}
                    style={{
                      ...styles.input,
                      ...(errors.lastnames ? styles.inputError : {}),
                    }}
                    className={`uway-input ${errors.lastnames ? "uway-input-error" : ""}`}
                    placeholder="García López"
                  />
                  {errors.lastnames && (
                    <span style={styles.error}>{errors.lastnames}</span>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="phone">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.phone ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.phone ? "uway-input-error" : ""}`}
                  placeholder="+57 300 123 4567"
                />
                {errors.phone && (
                  <span style={styles.error}>{errors.phone}</span>
                )}
              </div>

              {/* Address */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="address">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.address ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.address ? "uway-input-error" : ""}`}
                  placeholder="Calle 123 #45-67, Ciudad"
                />
                {errors.address && (
                  <span style={styles.error}>{errors.address}</span>
                )}
              </div>

              {/* Email */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.email ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.email ? "uway-input-error" : ""}`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <span style={styles.error}>{errors.email}</span>
                )}
              </div>

              {/* Institutional Email */}
              <div style={styles.field}>
                <label
                  style={styles.labelOptional}
                  htmlFor="institutionalEmail"
                >
                  Email Institucional{" "}
                  <span style={styles.optionalText}>(opcional)</span>
                </label>
                <input
                  type="email"
                  id="institutionalEmail"
                  name="institutionalEmail"
                  value={formData.institutionalEmail}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.institutionalEmail ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.institutionalEmail ? "uway-input-error" : ""}`}
                  placeholder="estudiante@universidad.edu.co"
                />
                {errors.institutionalEmail && (
                  <span style={styles.error}>{errors.institutionalEmail}</span>
                )}
              </div>

              {/* Password */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.password ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.password ? "uway-input-error" : ""}`}
                  placeholder="••••••••"
                  minLength="6"
                />
                {errors.password && (
                  <span style={styles.error}>{errors.password}</span>
                )}
              </div>

              {/* Confirm Password */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="confirmPassword">
                  Confirmar Contraseña
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.confirmPassword ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.confirmPassword ? "uway-input-error" : ""}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <span style={styles.error}>{errors.confirmPassword}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  ...styles.submitButton,
                  ...(isLoading ? styles.submitButtonDisabled : {}),
                }}
                className="uway-button"
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    Object.assign(e.target.style, styles.submitButtonHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = "#a855f7";
                    e.target.style.transform = "none";
                  }
                }}
              >
                {isLoading ? (
                  <>
                    <div style={styles.spinner}></div>
                    Creando cuenta...
                  </>
                ) : (
                  "Crear Cuenta"
                )}
              </button>
            </form>

            <div style={styles.footer}>
              ¿Ya tienes una cuenta?{" "}
              <a href="#" style={styles.link}>
                Iniciar sesión
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default UWayRegister;
