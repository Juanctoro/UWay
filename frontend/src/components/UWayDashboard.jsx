import React, { useState, useEffect} from 'react';
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
import ScheduleModal from './ScheduleModal'; 
import TripsModal from './TripsModal'; 
import api from '../api/axiosClient';
const token = localStorage.getItem('token');

export default function Dashboard() {
  const [showTripsModal, setShowTripsModal] = useState(false);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');

  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Estado para contar puntos y disparar recentrado
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [centerUserFlag, setCenterUserFlag] = useState(false);

  const [trips, setTrips] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  useEffect(() => {
    if (showTripsModal) {
      api.get('/trips/my-scheduled/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        setTrips(res.data);
      })
      .catch(err => {
        console.error('Error al obtener viajes programados', err);
      });
    }
  }, [showTripsModal]);

  const handleStartTrip = (trip) => {
    // Aquí podrías marcarlo como "en curso", enviar a backend, etc.
    setShowTripsModal(false);
  };

  const handleCreateTrip = async () => {
    if (selectedPoints.length < 2 || !scheduledTime) {
      alert('Selecciona al menos 2 puntos y una hora válida');
      return;
    }

    const now = new Date();
    const [hour, minute] = scheduledTime.split(':');
    const startDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      parseInt(hour),
      parseInt(minute)
    );

    const start_time = startDate.toISOString();

    const payload = {
      waypoints: selectedPoints.map(p => [p.lng, p.lat]),
      start_time: start_time,
      vehicle: selectedVehicle
    };

    try {
      await api.post('/trips/', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Viaje programado correctamente');
      setShowScheduleModal(false);
      setSelectedPoints([]);
    } catch (err) {
        console.error('Error al programar el viaje', err);
        console.log('Respuesta del backend:', err.response?.data);
        alert('No se pudo programar el viaje.');
      };
  };

  // Menú secundario (solo con al menos 2 puntos aparece 'Programar viaje')
  const secondaryMenu = [];
  if (user?.roles?.includes('driver')) {
    if (selectedPoints.length >= 2) {
      secondaryMenu.push({
        label: 'Programar viaje',
        icon: FaCar,
        onClick: () => setShowScheduleModal(true)
      });
    }
    secondaryMenu.push({
      label: 'Mis viajes',
      icon: FaRoute,
      onClick: () => setShowTripsModal(true)
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
          onPointsChange={setSelectedPoints}
          centerToUser={centerUserFlag}
        />
      </main>
      <ScheduleModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        scheduledTime={scheduledTime}
        setScheduledTime={setScheduledTime}
        onConfirm={() => {
          handleCreateTrip();
          setShowScheduleModal(false);
        }}
        selectedVehicle={selectedVehicle}
        setSelectedVehicle={setSelectedVehicle}
      />
      <TripsModal
        isOpen={showTripsModal}
        onClose={() => setShowTripsModal(false)}
        trips={trips}
        onStartTrip={handleStartTrip}
      />
    </div>
  );
}
