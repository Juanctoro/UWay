import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const UWayLogin = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      margin: "0",
      padding: "0",
      fontFamily: "system-ui, -apple-system, sans-serif",
      color: "#1a1a1a",
      display: "flex",
      boxSizing: "border-box",
      overflow: "hidden",
    },
    leftSide: {
      flex: "1",
      background:
        "linear-gradient(135deg, rgba(166, 85, 247, 0.9), rgba(147, 51, 234, 0.8)), linear-gradient(to bottom right, #a855f7, #9333ea)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      position: "relative",
      boxSizing: "border-box",
    },
    campusOverlay: {
      position: "absolute",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      background:
        'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23dots)"/></svg>\')',
      opacity: "0.3",
    },
    leftContent: {
      textAlign: "center",
      zIndex: "2",
      color: "white",
    },
    leftTitle: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: "700",
      marginBottom: "16px",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
    },
    leftSubtitle: {
      fontSize: "18px",
      opacity: "0.9",
      marginBottom: "32px",
      maxWidth: "400px",
      lineHeight: "1.6",
    },
    transportIcon: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto",
      backdropFilter: "blur(10px)",
    },
    rightSide: {
      flex: "1",
      backgroundColor: "#f8fafc",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px",
      boxSizing: "border-box",
    },
    formContainer: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "white",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(166, 85, 247, 0.1)",
      boxSizing: "border-box",
    },
    header: {
      textAlign: "center",
      marginBottom: "32px",
    },
    logo: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      marginBottom: "16px",
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
      fontSize: "28px",
      fontWeight: "bold",
      color: "#1a1a1a",
    },
    welcomeText: {
      fontSize: "18px",
      color: "#6b7280",
      marginBottom: "24px",
    },
    highlight: {
      color: "#a855f7",
      fontWeight: "600",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "500",
      marginBottom: "6px",
      color: "#1a1a1a",
    },
    input: {
      color: "#000",
      padding: "14px 16px",
      borderRadius: "10px",
      border: "1px solid #e5e7eb",
      fontSize: "14px",
      transition: "all 0.15s ease",
      backgroundColor: "#f9fafb",
      outline: "none",
      boxSizing: "border-box",
    },
    inputFocus: {
      borderColor: "#a855f7",
      boxShadow: "0 0 0 3px rgba(168, 85, 247, 0.1)",
      backgroundColor: "white",
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
    backButton: {
      position: "absolute",
      top: "20px",
      left: "20px",
      padding: "8px 16px",
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      backdropFilter: "blur(10px)",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.15s ease",
    },
    versionText: {
      position: "absolute",
      bottom: "20px",
      right: "20px",
      color: "rgba(255, 255, 255, 0.7)",
      fontSize: "12px",
      fontWeight: "500",
    },
    transportIconBottom: {
      width: "60px",
      height: "60px",
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "24px auto 0",
      color: "#a855f7",
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
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    dni: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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
      await login({dni: formData.dni, password: formData.password });
      console.log("Login submitted:", formData);
      alert("Login exitoso! (Este es solo un ejemplo)");
      navigate('/profile');
    } catch (error) {
      console.error("Login error:", error);
      alert("Error en el login. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Icon components
  const TransportIcon = () => (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 6v6h8V6M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6Z" />
      <path d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  );

  const TransportIconSmall = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M8 6v6h8V6M6 6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6Z" />
      <path d="M6 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
      <path d="M22 16a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );

  return (
    <>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @media (max-width: 768px) {
            .login-container {
              flex-direction: column !important;
            }
            .left-side {
              min-height: 40vh !important;
              flex: 0 0 auto !important;
            }
            .right-side {
              flex: 1 !important;
            }
            .form-container {
              padding: 24px !important;
              margin: 16px !important;
            }
            .back-button {
              position: fixed !important;
              top: 16px !important;
              left: 16px !important;
              z-index: 10 !important;
            }
          }
          
          @media (max-width: 480px) {
            .left-title {
              font-size: 1.5rem !important;
            }
            .left-subtitle {
              font-size: 14px !important;
            }
          }
          
          .uway-input:focus {
            border-color: #a855f7 !important;
            box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1) !important;
            background-color: white !important;
          }
          
          .uway-input-error {
            border-color: #ef4444 !important;
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
          }
          
          .uway-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>

      <div style={styles.container} className="login-container">
        {/* Left Side - Campus Theme */}
        <div style={styles.leftSide} className="left-side">
          <div style={styles.campusOverlay}></div>

          {/* Back Button */}
          <button
            style={styles.backButton}
            className="back-button uway-button"
            onClick={() => window.location.reload()}
          >
            <ArrowLeftIcon />
            Volver
          </button>

          <div style={styles.leftContent}>
            <h1 style={styles.leftTitle} className="left-title">
              Transporte Seguro
            </h1>
            <p style={styles.leftSubtitle} className="left-subtitle">
              Conectando comunidades educativas con soluciones de transporte
              verificadas y confiables
            </p>
            <div style={styles.transportIcon}>
              <TransportIcon />
            </div>
          </div>

          {/* Version */}
          <div style={styles.versionText}>V 1.0.1</div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.rightSide} className="right-side">
          <div style={styles.formContainer} className="form-container">
            <div style={styles.header}>
              {/* Logo */}
              <div style={styles.logo}>
                <div style={styles.logoIcon}>U</div>
                <span style={styles.logoText}>UWay</span>
              </div>

              {/* Welcome Text */}
              <p style={styles.welcomeText}>
                Bienvenido a <span style={styles.highlight}>UWay</span>
              </p>
            </div>

            <form style={styles.form} onSubmit={handleSubmit}>
              {/* DNI */}
              <div style={styles.field}>
                <label style={styles.label} htmlFor="dni">
                  Usuario
                </label>
                <input
                  type="dni"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.dni ? styles.inputError : {}),
                  }}
                  className={`uway-input ${errors.dni ? "uway-input-error" : ""}`}
                  placeholder="123456789"
                />
                {errors.dni && (
                  <span style={styles.error}>{errors.dni}</span>
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
                />
                {errors.password && (
                  <span style={styles.error}>{errors.password}</span>
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
                    Iniciando sesión...
                  </>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>

            {/* Transport Icon */}
            <div style={styles.transportIconBottom}>
              <TransportIconSmall />
            </div>

            <div style={styles.footer}>
              ¿No tienes una cuenta?{" "}
              <a href="#" style={styles.link}>
                Registrarse
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UWayLogin;
