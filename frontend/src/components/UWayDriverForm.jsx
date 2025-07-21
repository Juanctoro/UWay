import React, { useState } from "react";

const UWayDriverVerification = () => {
  const [driverFormData, setDriverFormData] = useState({
    license_number: "",
    soat_file: null,
    driver_license_file: null,
    transit_license_file: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

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
      boxSizing: "border-box",
    },
    nav: {
      padding: "24px 32px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(8px)",
      borderBottom: "1px solid rgba(166, 85, 247, 0.1)",
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
    backButton: {
      padding: "8px 16px",
      backgroundColor: "transparent",
      color: "#6b7280",
      border: "none",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.15s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    main: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "40px 32px",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      color: "#a855f7",
      fontSize: "12px",
      fontWeight: "600",
      padding: "4px 12px",
      borderRadius: "9999px",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      marginBottom: "16px",
    },
    title: {
      fontSize: "clamp(2rem, 4vw, 2.5rem)",
      fontWeight: "bold",
      marginBottom: "16px",
      color: "#1a1a1a",
      background: "linear-gradient(135deg, #a855f7, #9333ea)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    subtitle: {
      fontSize: "18px",
      color: "#6b7280",
      lineHeight: "1.6",
      maxWidth: "600px",
      margin: "0 auto",
    },
    formContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 8px 32px rgba(166, 85, 247, 0.15)",
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(166, 85, 247, 0.02))",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "24px",
    },
    fieldGroup: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
    },
    field: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#1a1a1a",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    required: {
      color: "#ef4444",
      fontSize: "12px",
    },
    input: {
      padding: "14px 16px",
      borderRadius: "12px",
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
    fileInput: {
      padding: "14px 16px",
      borderRadius: "12px",
      border: "2px dashed #d1d5db",
      fontSize: "14px",
      transition: "all 0.15s ease",
      backgroundColor: "rgba(249, 250, 251, 1)",
      outline: "none",
      boxSizing: "border-box",
      cursor: "pointer",
    },
    fileInputActive: {
      borderColor: "#a855f7",
      backgroundColor: "rgba(166, 85, 247, 0.05)",
    },
    helpText: {
      fontSize: "12px",
      color: "#6b7280",
      marginTop: "6px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    error: {
      fontSize: "12px",
      color: "#ef4444",
      marginTop: "4px",
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    infoBox: {
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.2)",
      borderRadius: "12px",
      padding: "20px",
      fontSize: "14px",
      color: "#1e40af",
    },
    submitSection: {
      display: "flex",
      gap: "16px",
      justifyContent: "center",
      marginTop: "32px",
      flexWrap: "wrap",
    },
    button: {
      padding: "16px 32px",
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.15s ease",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      border: "none",
      minWidth: "140px",
      justifyContent: "center",
    },
    buttonPrimary: {
      backgroundColor: "#a855f7",
      color: "white",
    },
    buttonSecondary: {
      backgroundColor: "white",
      color: "#6b7280",
      border: "1px solid #e5e7eb",
    },
    buttonDisabled: {
      backgroundColor: "#d1d5db",
      cursor: "not-allowed",
      transform: "none",
    },
    spinner: {
      width: "20px",
      height: "20px",
      border: "2px solid rgba(255, 255, 255, 0.3)",
      borderTop: "2px solid white",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    progressBar: {
      width: "100%",
      height: "6px",
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      borderRadius: "3px",
      overflow: "hidden",
      marginBottom: "32px",
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#a855f7",
      borderRadius: "3px",
      transition: "width 0.3s ease",
    },
  };

  const calculateProgress = () => {
    let filled = 0;
    let total = 4;

    if (driverFormData.license_number.trim()) filled++;
    if (driverFormData.soat_file) filled++;
    if (driverFormData.driver_license_file) filled++;
    if (driverFormData.transit_license_file) filled++;

    return (filled / total) * 100;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setDriverFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));

    // Clear error when user starts typing/selecting
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!driverFormData.license_number.trim()) {
      newErrors.license_number = "El número de licencia es requerido";
    }

    if (!driverFormData.soat_file) {
      newErrors.soat_file = "El documento SOAT es requerido";
    }

    if (!driverFormData.driver_license_file) {
      newErrors.driver_license_file = "La licencia de conducir es requerida";
    }

    if (!driverFormData.transit_license_file) {
      newErrors.transit_license_file = "La licencia de tránsito es requerida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file uploads
      const formData = new FormData();
      formData.append("license_number", driverFormData.license_number);
      formData.append("soat_file", driverFormData.soat_file);
      formData.append(
        "driver_license_file",
        driverFormData.driver_license_file,
      );
      formData.append(
        "transit_license_file",
        driverFormData.transit_license_file,
      );

      // Here you would send to your Django endpoint
      // const response = await axios.post('/api/driver-verification/', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 3000));

      alert(
        "¡Solicitud enviada exitosamente! Un administrador revisará tus documentos en 2-3 días hábiles.",
      );

      // Reset form
      setDriverFormData({
        license_number: "",
        soat_file: null,
        driver_license_file: null,
        transit_license_file: null,
      });
    } catch (error) {
      console.error("Error submitting driver form:", error);
      alert("Error al enviar la solicitud. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const CheckIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  const AlertIcon = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
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
            .verification-main {
              padding: 20px 16px !important;
            }
            .form-container {
              padding: 24px !important;
            }
            .field-group {
              grid-template-columns: 1fr !important;
            }
            .submit-section {
              flex-direction: column !important;
            }
          }
          
          .file-input:focus {
            border-color: #a855f7 !important;
            background-color: rgba(166, 85, 247, 0.05) !important;
          }
          
          .text-input:focus {
            border-color: #a855f7 !important;
            box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.1) !important;
          }
        `}
      </style>

      <div style={styles.container}>
        {/* Navigation */}
        <nav style={styles.nav}>
          <div style={styles.navContainer}>
            <div style={styles.logo}>
              <div style={styles.logoIcon}>U</div>
              <span style={styles.logoText}>UWay</span>
            </div>
            <button
              style={styles.backButton}
              onClick={() => window.location.reload()}
            >
              <ArrowLeftIcon />
              Volver al Perfil
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main style={styles.main} className="verification-main">
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.badge}>🚗 Verificación de Conductor</div>
            <h1 style={styles.title}>Solicitud para ser Conductor</h1>
            <p style={styles.subtitle}>
              Para ofrecer viajes en UWay, necesitas verificar tu identidad como
              conductor. Sube los documentos requeridos y nuestro equipo los
              revisará en 2-3 días hábiles.
            </p>
          </div>

          {/* Progress Bar */}
          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${calculateProgress()}%`,
              }}
            ></div>
          </div>

          {/* Form Container */}
          <div style={styles.formContainer} className="form-container">
            <form onSubmit={handleSubmit} style={styles.form}>
              {/* License Number */}
              <div style={styles.field}>
                <label style={styles.label}>
                  <span>Número de Licencia de Conducir</span>
                  <span style={styles.required}>*</span>
                </label>
                <input
                  type="text"
                  name="license_number"
                  value={driverFormData.license_number}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.license_number ? styles.inputError : {}),
                  }}
                  className="text-input"
                  placeholder="Ej: 123456789"
                  maxLength="20"
                />
                {errors.license_number && (
                  <div style={styles.error}>
                    <AlertIcon />
                    {errors.license_number}
                  </div>
                )}
                <div style={styles.helpText}>
                  <CheckIcon />
                  Ingresa el número completo de tu licencia de conducir
                </div>
              </div>

              {/* File Uploads Grid */}
              <div style={styles.fieldGroup} className="field-group">
                {/* SOAT File */}
                <div style={styles.field}>
                  <label style={styles.label}>
                    <span>Documento SOAT</span>
                    <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="file"
                    name="soat_file"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{
                      ...styles.fileInput,
                      ...(errors.soat_file ? styles.inputError : {}),
                    }}
                    className="file-input"
                  />
                  {errors.soat_file && (
                    <div style={styles.error}>
                      <AlertIcon />
                      {errors.soat_file}
                    </div>
                  )}
                  <div style={styles.helpText}>📄 PDF, JPG, PNG - Máx. 5MB</div>
                </div>

                {/* Driver License File */}
                <div style={styles.field}>
                  <label style={styles.label}>
                    <span>Licencia de Conducir</span>
                    <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="file"
                    name="driver_license_file"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{
                      ...styles.fileInput,
                      ...(errors.driver_license_file ? styles.inputError : {}),
                    }}
                    className="file-input"
                  />
                  {errors.driver_license_file && (
                    <div style={styles.error}>
                      <AlertIcon />
                      {errors.driver_license_file}
                    </div>
                  )}
                  <div style={styles.helpText}>
                    🪪 Foto clara de ambos lados de tu licencia
                  </div>
                </div>

                {/* Transit License File */}
                <div style={styles.field}>
                  <label style={styles.label}>
                    <span>Licencia de Tránsito</span>
                    <span style={styles.required}>*</span>
                  </label>
                  <input
                    type="file"
                    name="transit_license_file"
                    onChange={handleInputChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{
                      ...styles.fileInput,
                      ...(errors.transit_license_file ? styles.inputError : {}),
                    }}
                    className="file-input"
                  />
                  {errors.transit_license_file && (
                    <div style={styles.error}>
                      <AlertIcon />
                      {errors.transit_license_file}
                    </div>
                  )}
                  <div style={styles.helpText}>
                    🚙 Tarjeta de propiedad del vehículo
                  </div>
                </div>
              </div>

              {/* Information Box */}
              <div style={styles.infoBox}>
                <strong>📋 Información importante del proceso:</strong>
                <ul
                  style={{
                    marginTop: "12px",
                    paddingLeft: "20px",
                    lineHeight: "1.6",
                  }}
                >
                  <li>
                    Todos los documentos deben estar vigentes y ser legibles
                  </li>
                  <li>
                    El proceso de verificación toma entre 2-3 días hábiles
                  </li>
                  <li>
                    Recibirás una notificación por email sobre el estado de tu
                    solicitud
                  </li>
                  <li>
                    Una vez aprobado, podrás comenzar a ofrecer viajes
                    inmediatamente
                  </li>
                  <li>
                    Puedes subir archivos en formato PDF, JPG o PNG (máximo 5MB
                    cada uno)
                  </li>
                </ul>
              </div>

              {/* Submit Section */}
              <div style={styles.submitSection} className="submit-section">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  style={{
                    ...styles.button,
                    ...styles.buttonSecondary,
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    ...styles.button,
                    ...styles.buttonPrimary,
                    ...(isSubmitting ? styles.buttonDisabled : {}),
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div style={styles.spinner}></div>
                      Enviando solicitud...
                    </>
                  ) : (
                    <>
                      <CheckIcon />
                      Enviar Solicitud
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default UWayDriverVerification;
