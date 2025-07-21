import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axiosClient';

const UWayProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user, setUser,logout } = useAuth();
  const navigate = useNavigate();

  const translateRoles = (roles) => {
    const roleMap ={
      student: "Estudiante",
      teacher: "Docente",
      driver: "Conductor",
      admin: "Administrador"
    }

    return (Array.isArray(roles) ? roles : [roles])
    .map(role => roleMap[role])
    .filter(Boolean)
    .join(" / ");
  };

  const [userData, setUserData] = useState({
    name: `${user.names} ${user.lastnames}`, 
    email: user.email,
    phone: user.phone,
    role: user.roles,
    institution: user.institution,
    dni: user.dni,
    address: user.address,
    profileImage: null,
    pendingApplications: [],
    rejectedApplications: [],
  });

  useEffect(() => {
    //For driver user
    if (user &&  user.roles.includes("driver")){
        api.get(`/drivers/${user.dni}/driver_rating/`).then(res => {
        setUserData(prev => ({
          ...prev,
          rating: res.data.average_rating
        }));
      });
    }

    //For every user
    api.get(`/institutions/${user.institution}/`).then(res => {
      setUserData(prev => ({
        ...prev,
        institution: res.data.name
      }));
    });
    api.get(`/users/${user.dni}/user_reservations/`).then(res => {
      setUserData(prev => ({
        ...prev,
        totalTrips: res.data.total_reservations
      }));
    });
  }, [user]);

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
    navButtons: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
    },
    main: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "40px 32px",
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      gap: "40px",
    },
    sidebar: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(166, 85, 247, 0.05))",
      borderRadius: "20px",
      padding: "32px",
      border: "1px solid rgba(166, 85, 247, 0.3)",
      boxShadow: "0 8px 32px rgba(166, 85, 247, 0.15)",
      height: "fit-content",
      position: "sticky",
      top: "40px",
    },
    profileHeader: {
      textAlign: "center",
      marginBottom: "32px",
    },
    profileImage: {
      width: "80px",
      height: "80px",
      borderRadius: "50%",
      backgroundColor: "rgba(166, 85, 247, 0.2)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      fontSize: "32px",
      fontWeight: "bold",
      color: "#a855f7",
    },
    userName: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "4px",
    },
    userRole: {
      fontSize: "14px",
      color: "#6b7280",
      marginBottom: "16px",
    },
    userStats: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "24px",
    },
    stat: {
      textAlign: "center",
    },
    statNumber: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#a855f7",
    },
    statLabel: {
      fontSize: "12px",
      color: "#6b7280",
    },
    menuItem: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "12px 16px",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      marginBottom: "8px",
      fontSize: "14px",
      fontWeight: "500",
    },
    menuItemActive: {
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      color: "#a855f7",
    },
    menuItemInactive: {
      color: "#6b7280",
    },
    content: {
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(166, 85, 247, 0.02))",
      borderRadius: "20px",
      padding: "40px",
      border: "1px solid rgba(166, 85, 247, 0.25)",
      boxShadow: "0 8px 32px rgba(166, 85, 247, 0.12)",
    },
    pageTitle: {
      fontSize: "28px",
      fontWeight: "bold",
      marginBottom: "32px",
      color: "#1a1a1a",
      background: "linear-gradient(135deg, #a855f7, #9333ea)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    actionGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "24px",
      marginBottom: "40px",
    },
    actionCard: {
      backgroundColor: "white",
      border: "1px solid rgba(166, 85, 247, 0.2)",
      borderRadius: "16px",
      padding: "24px",
      cursor: "pointer",
      transition: "all 0.15s ease",
      textAlign: "center",
      background:
        "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(166, 85, 247, 0.02))",
    },
    actionCardHover: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(166, 85, 247, 0.15)",
      borderColor: "#a855f7",
    },
    actionIcon: {
      width: "48px",
      height: "48px",
      backgroundColor: "rgba(166, 85, 247, 0.1)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 16px",
      color: "#a855f7",
    },
    actionTitle: {
      fontSize: "18px",
      fontWeight: "600",
      marginBottom: "8px",
      color: "#1a1a1a",
    },
    actionDescription: {
      fontSize: "14px",
      color: "#6b7280",
      lineHeight: "1.5",
    },
    button: {
      padding: "8px 16px",
      borderRadius: "10px",
      border: "none",
      fontSize: "14px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.15s ease",
      boxSizing: "border-box",
    },
    buttonPrimary: {
      backgroundColor: "#a855f7",
      color: "white",
    },
    buttonOutline: {
      backgroundColor: "white",
      color: "#a855f7",
      border: "1px solid #a855f7",
    },
    buttonGhost: {
      backgroundColor: "transparent",
      color: "#6b7280",
    },
  };

  // Función para determinar qué opciones de verificación mostrar
  const getAvailableVerificationOptions = () => {
    const allOptions = [
      {
        id: "upload-student-docs",
        title: "Verificar como Estudiante",
        description: "Sube tu carné estudiantil y documentos académicos",
        icon: "🎓",
        roleType: "student",
      },
      {
        id: "upload-staff-docs",
        title: "Verificar como Funcionario",
        description: "Sube tu identificación de empleado institucional",
        icon: "👔",
        roleType: "staff",
      },
      {
        id: "upload-driver-docs",
        title: "Solicitar ser Conductor",
        description: "Sube licencia de conducir y documentos del vehículo",
        icon: "🚗",
        roleType: "driver",
      },
    ];

    // Filtrar opciones basado en roles actuales y solicitudes pendientes
    return allOptions.filter((option) => {
      const hasRole = userData.role.includes(option.roleType);
      const hasPendingApplication = userData.pendingApplications.includes(
        option.roleType,
      );

      // Solo mostrar si NO tiene el rol Y NO tiene solicitud pendiente
      return !hasRole && !hasPendingApplication;
    });
  };

  const availableVerificationOptions = getAvailableVerificationOptions();

  // Menú base para todos los usuarios
  const baseMenuItems = [
    { id: "profile", label: "Perfil", icon: "👤" },

    {
      id: "verify",
      label: "Verificar Cuenta",
      icon: "✅",
      badge: userData.role.length < 1,
    },
    { id: "security", label: "Seguridad", icon: "🛡️" },

    { id: "settings", label: "Configuración", icon: "⚙️" },
  ];

  const studentMenuItems = [
    { id: "trips", label: "Mis Viajes", icon: "🚗" },
    { id: "search", label: "Buscar Viajes", icon: "🔍" },
  ];

  // Opciones adicionales para conductores
  const driverMenuItems = [
    { id: "vehicles", label: "Mis Vehículos", icon: "🚙" },
    { id: "payments", label: "Pagos", icon: "💰" },
    { id: "analytics", label: "Estadísticas", icon: "📊" },
  ];

  // Combinar menús según el rol
  let baseMenu = [...baseMenuItems];

  if (user.roles.includes("student")) {
    baseMenu = [
      ...baseMenu.slice(0, 1), // Solo "Perfil"
      ...studentMenuItems,     // Opciones para Estudiante
      ...baseMenu.slice(1),    // Resto del baseMenuItems (desde "Verificar Cuenta")
    ];
  }

  if (user.roles.includes("driver")) {
    baseMenu = [
      ...baseMenu.slice(0, 1), // Solo "Perfil"
      ...driverMenuItems,      // Opciones para Conductor
      ...baseMenu.slice(1),    // Resto del baseMenuItems (desde "Verificar Cuenta")
    ];
  }

  // Evitar duplicados
  const seen = new Set();
  baseMenu = baseMenu.filter(item => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  const quickActions = [
    {
      id: "search-trip",
      title: "Buscar Viaje",
      description: "Encuentra viajes disponibles en tu institución",
      icon: "🔍",
      primary: true,
    },
    {
      id: "create-trip",
      title: "Crear Viaje",
      description: "Ofrece un viaje como conductor verificado",
      icon: "➕",
      primary: false,
    },
    {
      id: "track-trip",
      title: "Rastrear Viaje",
      description: "Sigue tu viaje actual en tiempo real",
      icon: "📍",
      primary: false,
    },
    {
      id: "scan-qr",
      title: "Escanear QR",
      description: "Valida tu entrada al vehículo",
      icon: "📱",
      primary: true,
    },
    {
      id: "rate-trip",
      title: "Calificar Viaje",
      description: "Evalúa tu experiencia reciente",
      icon: "⭐",
      primary: false,
    },
    {
      id: "emergency",
      title: "Emergencia",
      description: "Contacto de emergencia y ayuda",
      icon: "🚨",
      primary: false,
    },
  ];

  // Icons as simple emojis for simplicity
  const ActionCard = ({ action, onClick }) => (
    <div
      style={styles.actionCard}
      className="action-card"
      onClick={() => onClick(action.id)}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, styles.actionCardHover);
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = "translateY(0px)";
        e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        e.target.style.borderColor = "rgba(166, 85, 247, 0.1)";
      }}
    >
      <div style={styles.actionIcon}>
        <span style={{ fontSize: "24px" }}>{action.icon}</span>
      </div>
      <h3 style={styles.actionTitle}>{action.title}</h3>
      <p style={styles.actionDescription}>{action.description}</p>
    </div>
  );

  const handleActionClick = (actionId) => {
    switch (actionId) {
    case "upload-student-docs":
      // Acción específica para estudiante
      openModal("studentDocs");
      break;
    case "upload-staff-docs":
      // Acción específica para funcionario
      openModal("staffDocs");
      break;
    case "upload-driver-docs":
      // Acción específica para conductor
      navigate('/driver_form');
      break;
    default:
      console.warn("Acción no reconocida:", action.id);
  }
  };

  const allRoles = availableVerificationOptions.map((opt) => opt.role); // roles posibles
  const verifiedRoles = Array.isArray(userData.role) ? userData.role : [];
  const pendingRoles = Array.isArray(userData.pendingApplications) ? userData.pendingApplications : [];
  const hasAllRoles = allRoles.every(role => verifiedRoles.includes(role));

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .profile-main {
              grid-template-columns: 1fr !important;
              gap: 20px !important;
            }
            .action-grid {
              grid-template-columns: 1fr !important;
            }
            .sidebar {
              position: static !important;
            }
          }

          .action-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(166, 85, 247, 0.15);
            border-color: #a855f7;
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
            <div style={styles.navButtons}>
              <button
                style={{ ...styles.button, ...styles.buttonGhost }}
                onClick={() => window.location.reload()}
              >
                Volver al Inicio
              </button>
              <button style={{ ...styles.button, ...styles.buttonGhost }}>
                Notificaciones
              </button>
              <button style={{ ...styles.button, ...styles.buttonOutline }}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main style={styles.main} className="profile-main">
          {/* Sidebar */}
          <aside style={styles.sidebar} className="sidebar">
            <div style={styles.profileHeader}>
              <div style={styles.profileImage}>
                {userData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <h2 style={styles.userName}>{userData.name}</h2>
              <p style={styles.userRole}>
                {translateRoles(userData.role)} - {userData.institution}
              </p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "32px",
                  marginBottom: "24px",
                }}
              >
                <div style={styles.stat}>
                  <div style={styles.statNumber}>{userData.totalTrips}</div>
                  <div style={styles.statLabel}>Viajes Realizados</div>
                </div>
                {/* Solo mostrar rating si es conductor */}
                {user.roles.includes("driver") && (
                  <div style={styles.stat}>
                    <div style={styles.statNumber}>{userData.rating}</div>
                    <div style={styles.statLabel}>Rating Conductor</div>
                  </div>
                )}
              </div>
            </div>

            {/* Menu */}
            <nav>
              {baseMenu.map((item) => (
                <div
                  key={item.id}
                  style={{
                    ...styles.menuItem,
                    ...(activeTab === item.id
                      ? styles.menuItemActive
                      : styles.menuItemInactive),
                    position: "relative",
                  }}
                  onClick={() => setActiveTab(item.id)}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                  {/* Badge para verificación pendiente */}
                  {item.badge && (
                    <span
                      style={{
                        position: "absolute",
                        right: "12px",
                        backgroundColor: "#ef4444",
                        color: "white",
                        borderRadius: "50%",
                        width: "8px",
                        height: "8px",
                        fontSize: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    ></span>
                  )}
                </div>
              ))}
            </nav>
          </aside>

          {/* Content Area */}
          <div style={styles.content}>
            <h1 style={styles.pageTitle}>
              {activeTab === "profile" && "Mi Perfil"}
              {activeTab === "trips" && "Mis Viajes"}
              {activeTab === "search" && "Buscar Viajes"}
              {activeTab === "verify" && "Verificar Cuenta"}
              {activeTab === "security" && "Seguridad"}
              {activeTab === "vehicles" && "Mis Vehículos"}
              {activeTab === "payments" && "Pagos"}
              {activeTab === "analytics" && "Estadísticas"}
              {activeTab === "history" && "Historial"}
              {activeTab === "settings" && "Configuración"}
            </h1>

            {activeTab === "profile" && (
              <>
                {/* Información Personal - PRIMERO */}
                <div style={{ marginBottom: "40px" }}>
                  <h2
                    style={{
                      fontSize: "20px",
                      margin: "0 0 20px 0",
                      color: "#a855f7",
                      fontWeight: "600",
                    }}
                  >
                    Información Personal
                  </h2>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(280px, 1fr))",
                      gap: "20px",
                      backgroundColor:
                        "linear-gradient(135deg, rgba(166, 85, 247, 0.05), rgba(255, 255, 255, 0.95))",
                      background:
                        "linear-gradient(135deg, rgba(166, 85, 247, 0.05), rgba(255, 255, 255, 0.95))",
                      padding: "24px",
                      borderRadius: "16px",
                      border: "1px solid rgba(166, 85, 247, 0.2)",
                      boxShadow: "0 4px 12px rgba(166, 85, 247, 0.1)",
                    }}
                  >
                    {/* EMAIL - Editable */}
                    <div
                      style={{
                        backgroundColor: "rgba(166, 85, 247, 0.05)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(166, 85, 247, 0.1)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#a855f7",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        EMAIL
                      </div>
                      <div style={{ fontWeight: "500", paddingRight: "40px" }}>
                        {userData.email}
                      </div>
                      <button
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "#a855f7",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          fontSize: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.15s ease",
                        }}
                        onClick={() => alert("Editar email - En desarrollo")}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#9333ea";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#a855f7";
                        }}
                      >
                        ✏️
                      </button>
                    </div>

                    {/* TELÉFONO - Editable */}
                    <div
                      style={{
                        backgroundColor: "rgba(166, 85, 247, 0.05)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(166, 85, 247, 0.1)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#a855f7",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        TELÉFONO
                      </div>
                      <div style={{ fontWeight: "500", paddingRight: "40px" }}>
                        {userData.phone}
                      </div>
                      <button
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "#a855f7",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          fontSize: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.15s ease",
                        }}
                        onClick={() => alert("Editar teléfono - En desarrollo")}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#9333ea";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#a855f7";
                        }}
                      >
                        ✏️
                      </button>
                    </div>

                    {/* DNI - Editable */}
                    <div
                      style={{
                        backgroundColor: "rgba(166, 85, 247, 0.05)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(166, 85, 247, 0.1)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#a855f7",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        DNI
                      </div>
                      <div style={{ fontWeight: "500", paddingRight: "40px" }}>
                        {userData.dni}
                      </div>
                      <button
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "#a855f7",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          fontSize: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.15s ease",
                        }}
                        onClick={() => alert("Editar DNI - En desarrollo")}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#9333ea";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#a855f7";
                        }}
                      >
                        ✏️
                      </button>
                    </div>

                    {/* DIRECCIÓN - Editable */}
                    <div
                      style={{
                        backgroundColor: "rgba(166, 85, 247, 0.05)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(166, 85, 247, 0.1)",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#a855f7",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        DIRECCIÓN
                      </div>
                      <div style={{ fontWeight: "500", paddingRight: "40px" }}>
                        {userData.address}
                      </div>
                      <button
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          backgroundColor: "#a855f7",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          padding: "4px 8px",
                          fontSize: "10px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                          transition: "all 0.15s ease",
                        }}
                        onClick={() =>
                          alert("Editar dirección - En desarrollo")
                        }
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#9333ea";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#a855f7";
                        }}
                      >
                        ✏️
                      </button>
                    </div>

                    {/* INSTITUCIÓN - NO Editable */}
                    <div
                      style={{
                        backgroundColor: "rgba(166, 85, 247, 0.05)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(166, 85, 247, 0.1)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#a855f7",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        INSTITUCIÓN
                      </div>
                      <div style={{ fontWeight: "500" }}>
                        {userData.institution}
                      </div>
                    </div>

                    {/* ROL - NO Editable */}
                    <div
                      style={{
                        backgroundColor: "rgba(166, 85, 247, 0.05)",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid rgba(166, 85, 247, 0.1)",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#a855f7",
                          fontWeight: "600",
                          marginBottom: "4px",
                        }}
                      >
                        ROL
                      </div>
                      <div style={{ fontWeight: "500" }}>{translateRoles(userData.role)}</div>
                    </div>
                  </div>
                </div>

                {/* Acciones Rápidas - SEGUNDO */}
                <div>
                  <h2
                    style={{
                      fontSize: "20px",
                      marginBottom: "24px",
                      color: "#a855f7",
                      fontWeight: "600",
                    }}
                  >
                    Acciones Rápidas
                  </h2>
                  <div style={styles.actionGrid} className="action-grid">
                    {quickActions.map((action) => (
                      <ActionCard
                        key={action.id}
                        action={action}
                        onClick={handleActionClick}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "trips" && (
              <div>
                <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                  Aquí podrás ver todos tus viajes activos y programados.
                </p>
                <div style={styles.actionGrid}>
                  <ActionCard
                    action={{
                      id: "current-trip",
                      title: "Viaje Actual",
                      description: "No tienes viajes activos en este momento",
                      icon: "🚗",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "upcoming-trips",
                      title: "Próximos Viajes",
                      description: "Viajes programados para los próximos días",
                      icon: "📅",
                    }}
                    onClick={handleActionClick}
                  />
                </div>
              </div>
            )}

            {activeTab === "search" && (
              <div>
                <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                  Busca y reserva viajes disponibles en tu institución.
                </p>
                <div style={styles.actionGrid}>
                  <ActionCard
                    action={{
                      id: "search-routes",
                      title: "Buscar Rutas",
                      description: "Encuentra rutas disponibles por destino",
                      icon: "🗺️",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "filter-trips",
                      title: "Filtrar Viajes",
                      description:
                        "Aplica filtros por horario, precio, conductor",
                      icon: "🔍",
                    }}
                    onClick={handleActionClick}
                  />
                </div>
              </div>
            )}

            {activeTab === "verify" && (
              <div>
                {hasAllRoles ? (
                  <div
                    style={{
                      backgroundColor: "rgba(34, 197, 94, 0.1)",
                      border: "1px solid rgba(34, 197, 94, 0.2)",
                      borderRadius: "12px",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                    <h3 style={{ color: "#059669", fontSize: "18px", marginBottom: "8px" }}>
                      Todas las verificaciones completadas
                    </h3>
                    <p style={{ color: "#6b7280" }}>
                      Ya has aplicado a todos los roles disponibles. Si necesitas un rol adicional, contacta al administrador.
                    </p>
                  </div>
                ) : verifiedRoles.length > 0 ? (
                  <>
                    {/* Cuenta Verificada */}
                    <div
                      style={{
                        backgroundColor: "rgba(34, 197, 94, 0.1)",
                        border: "1px solid rgba(34, 197, 94, 0.2)",
                        borderRadius: "12px",
                        padding: "24px",
                        textAlign: "center",
                        marginBottom: "24px",
                      }}
                    >
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
                      <h3 style={{ color: "#059669", fontSize: "18px", marginBottom: "8px" }}>
                        Cuenta Verificada
                      </h3>
                      <p style={{ color: "#6b7280" }}>
                        Tu cuenta ha sido verificada por {userData.institution}
                      </p>
                    </div>

                    {/* Mostrar opciones disponibles */}
                    {availableVerificationOptions.length > 0 && (
                      <div style={styles.actionGrid}>
                        {availableVerificationOptions.map((option) => (
                          <ActionCard key={option.id} action={option} onClick={handleActionClick} />
                        ))}
                      </div>
                    )}

                    {/* Mostrar roles verificados */}
                    <div style={{ marginTop: "24px", backgroundColor: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.1)", borderRadius: "12px", padding: "20px" }}>
                      <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#059669" }}>🎉 Roles Verificados:</h4>
                      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        {verifiedRoles.map((role) => (
                          <span key={role} style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", color: "#059669", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "500", textTransform: "capitalize" }}>
                            ✓ {translateRoles(role)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Mostrar solicitudes pendientes */}
                    {pendingRoles.length > 0 && (
                      <div style={{ marginTop: "24px", backgroundColor: "rgba(251, 191, 36, 0.05)", border: "1px solid rgba(251, 191, 36, 0.1)", borderRadius: "12px", padding: "20px" }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "#d97706" }}>
                          ⏳ Solicitudes en Proceso:
                        </h4>
                        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                          {pendingRoles.map((role) => (
                            <span key={role} style={{ backgroundColor: "rgba(251, 191, 36, 0.1)", color: "#d97706", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "500", textTransform: "capitalize" }}>
                              ⏳ {translateRoles(role)}
                            </span>
                          ))}
                        </div>
                        <p style={{ fontSize: "12px", color: "#92400e", marginTop: "8px", marginBottom: "0" }}>
                          Tu solicitud está siendo revisada por la administración.
                        </p>
                      </div>
                    )}
                  </>
                ) : pendingRoles.length > 0 ? (
                  // Solo solicitudes pendientes
                  <>
                    <div style={{ backgroundColor: "rgba(251, 191, 36, 0.1)", border: "1px solid rgba(251, 191, 36, 0.2)", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "24px" }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
                      <h3 style={{ color: "#d97706", fontSize: "18px", marginBottom: "8px" }}>
                        Solicitudes en Proceso
                      </h3>
                      <p style={{ color: "#6b7280" }}>
                        Estamos revisando tu solicitud. Te notificaremos cuando se apruebe.
                      </p>
                    </div>
                  </>
                ) : (
                  // Sin roles ni solicitudes pendientes
                  <>
                    <div style={{ backgroundColor: "rgba(251, 191, 36, 0.1)", border: "1px solid rgba(251, 191, 36, 0.2)", borderRadius: "12px", padding: "24px", textAlign: "center", marginBottom: "24px" }}>
                      <div style={{ fontSize: "48px", marginBottom: "16px" }}>⏳</div>
                      <h3 style={{ color: "#d97706", fontSize: "18px", marginBottom: "8px" }}>
                        Verificación Pendiente
                      </h3>
                      <p style={{ color: "#6b7280" }}>
                        Sube tus documentos para verificar tu cuenta institucional
                      </p>
                    </div>
                    <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                      Para usar UWay, necesitas verificar tu cuenta con tu institución educativa.
                    </p>
                    {/* Mostrar opciones disponibles */}
                    {availableVerificationOptions.length > 0 && (
                      <div style={styles.actionGrid}>
                        {availableVerificationOptions.map((option) => (
                          <ActionCard key={option.id} action={option} onClick={handleActionClick} />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {activeTab === "security" && (
              <div>
                <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                  Gestiona la seguridad de tu cuenta y contactos de emergencia.
                </p>
                <div style={styles.actionGrid}>
                  <ActionCard
                    action={{
                      id: "emergency-contacts",
                      title: "Contactos de Emergencia",
                      description:
                        "Añade contactos para situaciones de emergencia",
                      icon: "���",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "change-password",
                      title: "Cambiar Contraseña",
                      description: "Actualiza tu contraseña de acceso",
                      icon: "🔐",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "two-factor",
                      title: "Autenticación 2FA",
                      description: "Configura verificación en dos pasos",
                      icon: "📱",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "privacy-settings",
                      title: "Configuración de Privacidad",
                      description: "Controla quién puede ver tu información",
                      icon: "👁️",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "trip-safety",
                      title: "Seguridad en Viajes",
                      description: "Configuraciones de seguridad para viajes",
                      icon: "🛡️",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "report-issue",
                      title: "Reportar Problema",
                      description: "Reporta problemas de seguridad o abuso",
                      icon: "⚠️",
                    }}
                    onClick={handleActionClick}
                  />
                </div>
              </div>
            )}

            {activeTab === "vehicles" && (
              <div>
                <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                  Gestiona tus vehículos registrados y documentación.
                </p>
                <div style={styles.actionGrid}>
                  <ActionCard
                    action={{
                      id: "add-vehicle",
                      title: "Registrar Vehículo",
                      description: "Añade un nuevo vehículo a tu cuenta",
                      icon: "➕",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "vehicle-docs",
                      title: "Documentos del Vehículo",
                      description:
                        "SOAT, revisión tecnomecánica, tarjeta de propiedad",
                      icon: "📄",
                    }}
                    onClick={handleActionClick}
                  />
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div>
                <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                  Administra tus métodos de pago y ganancias como conductor.
                </p>
                <div style={styles.actionGrid}>
                  <ActionCard
                    action={{
                      id: "payment-methods",
                      title: "Métodos de Pago",
                      description: "Gestiona tarjetas y cuentas bancarias",
                      icon: "💳",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "earnings",
                      title: "Mis Ganancias",
                      description: "Historial de ingresos y retiros",
                      icon: "💰",
                    }}
                    onClick={handleActionClick}
                  />
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <p style={{ color: "#6b7280", marginBottom: "24px" }}>
                  Analiza tus estadísticas como conductor.
                </p>
                <div style={styles.actionGrid}>
                  <ActionCard
                    action={{
                      id: "trip-stats",
                      title: "Estadísticas de Viajes",
                      description: "Viajes completados, distancia, tiempo",
                      icon: "📈",
                    }}
                    onClick={handleActionClick}
                  />
                  <ActionCard
                    action={{
                      id: "rating-analysis",
                      title: "Análisis de Calificaciones",
                      description: "Evolución de tu rating y comentarios",
                      icon: "⭐",
                    }}
                    onClick={handleActionClick}
                  />
                </div>
              </div>
            )}

            {/* Other tabs would have similar content structure */}
            {activeTab !== "profile" &&
              activeTab !== "trips" &&
              activeTab !== "search" &&
              activeTab !== "verify" &&
              activeTab !== "security" &&
              activeTab !== "vehicles" &&
              activeTab !== "payments" &&
              activeTab !== "analytics" && (
                <div>
                  <p style={{ color: "#6b7280" }}>
                    Contenido de "{activeTab}" en desarrollo...
                  </p>
                </div>
              )}
          </div>
        </main>
      </div>
    </>
  );
};

export default UWayProfile;