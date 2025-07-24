import React, { useState } from 'react';
import {
  FaBars,
  FaMapMarkerAlt,
  FaUser,
  FaCog,
  FaHistory,
  FaUniversity,
  FaCar,
  FaRoute,
  FaHeadset
} from 'react-icons/fa';
import Sidebar from './Sidebar';
import MapView from './MapView';
import './styles/UWayDashboard.css';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado para contar puntos y disparar recentrado
  const [selectedPointsCount, setSelectedPointsCount] = useState(0);
  const [centerUserFlag, setCenterUserFlag] = useState(false);

  // Menú secundario (solo con al menos 2 puntos aparece 'Programar viaje')
  const secondaryMenu = [];
  if (user?.roles?.includes('driver')) {
    if (selectedPointsCount >= 2) {
      secondaryMenu.push({
        label: 'Programar viaje',
        icon: FaCar,
        path: '/scheduleTrip'
      });
    }
    secondaryMenu.push({
      label: 'Mis viajes',
      icon: FaRoute,
      path: '/myTrips'
    });
  } else if (user?.roles?.includes('admin')) {
    secondaryMenu.push({
      label: 'Panel administrativo',
      icon: FaUniversity,
      path: '/adminPanel'
    });
  }

  const primaryMenu = [
    {
      label: 'Mi ubicación',
      icon: FaMapMarkerAlt,
      onClick: () => setCenterUserFlag(f => !f),
      className: 'locate-button-sidebar'
    },
    { label: 'Perfil', icon: FaUser, path: '/profile' },
    { label: 'Configuración', icon: FaCog, path: '/profile.settings' },
    { label: 'Historial', icon: FaHistory, path: '/profile.history' }
  ];

  const supportSection = {
    text: '¿Necesitas soporte o deseas reportar algún fallo?',
    button: { icon: FaHeadset, label: 'Contacto', onClick: () => {} }
  };

  return (
    <div className="dashboard-container">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sections={[
          { items: primaryMenu },
          ...(secondaryMenu.length ? [{ items: secondaryMenu }] : [])
        ]}
        support={supportSection}
      />

      <main className="map-view">
        {!sidebarOpen && (
          <button
            className="hamburger-button"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>
        )}

        <MapView
          role={user?.roles?.includes('driver') ? 'driver' : 'user'}
          existingRoutes={[]}
          onPointsChange={setSelectedPointsCount}
          centerToUser={centerUserFlag}
        />
      </main>
    </div>
  );
}
