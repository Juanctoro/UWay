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
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [showTripsModal, setShowTripsModal] = useState(false);

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');

  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [selectedPoints, setSelectedPoints] = useState([]);
  const [centerUserFlag, setCenterUserFlag] = useState(false);

  const [trips, setTrips] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const [currentTrip, setCurrentTrip] = useState(null);

  const parseRoute = (routeStr) => {
    const matches = routeStr.match(/\(\(([^)]+)\)\)/);
    if (!matches) return [];
    return matches[1].split(',').map(pair => {
      const [lon, lat] = pair.trim().split(' ').map(Number);
      return [lat, lon];  // Leaflet usa [lat, lon]
    });
  };


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
    api.get('/trips/current/', {
      headers: { Authorization: `Token ${token}` }
    })
    .then(res => {
      if (res.data && res.data.status === 'in_progress') {
        toast.error('Ya tienes un viaje en curso. Debes finalizarlo antes de iniciar otro.');
        return;
      }

      api.post(`/trips/${trip.id}/start/`, {}, {
        headers: { Authorization: `Token ${token}` }
      })
      .then(res => {
        setShowTripsModal(false);
        
        api.get('/trips/current/', {
          headers: { Authorization: `Token ${token}` }
        })
        .then(res => {
          setCurrentTrip(res.data);
          toast.success('Viaje iniciado correctamente');
        })
        .catch(err => {
          setCurrentTrip(null);
        });
      })
      .catch(err => {
        toast.error('No se pudo iniciar el viaje.');
      });
    })
    .catch(err => {
      if (err.response && err.response.status === 404) {
        api.post(`/trips/${trip.id}/start/`, {}, {
          headers: { Authorization: `Token ${token}` }
        })
        .then(res => {
          setShowTripsModal(false);
          api.get('/trips/current/', {
            headers: { Authorization: `Token ${token}` }
          })
          .then(res => {
            setCurrentTrip(res.data);
          })
          .catch(err => {
            console.warn('No hay viaje en progreso');
            setCurrentTrip(null);
          });
        })
        .catch(err => {
          console.error('Error al iniciar el viaje', err);
          toast.error('No se pudo iniciar el viaje.');
        });
      } else {
        toast.error('No se pudo verificar si ya tienes un viaje activo.');
      }
    });
  };

  const handleCancelTrip = (trip) => {
    console.error('Cancelando viaje:', trip);
    api.delete(`/trips/${trip.id}/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        toast.success('Viaje cancelado correctamente');
        setTrips(trips.filter(t => t.id !== trip.id));
      })
      .catch(err => {
        console.error('Error al cancelar el viaje', err);
        toast.error('No se pudo cancelar el viaje.');
      });
    setShowTripsModal(false);
  };

  const handleFinishTrip = () => {
    api.get(`/trips/finish/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      toast.success('Viaje finalizado correctamente');
      setTrips(null);
      setCurrentTrip(null);
      setSelectedPoints([]);
    })
    .catch(err => {
      console.error('Error al finalizar el viaje', err);
      toast.error('No se pudo finalizar el viaje.');
    });
  };

  const handleCreateTrip = async () => {
    if (selectedPoints.length < 2 || !scheduledTime) {
      toast.warning('Selecciona al menos 2 puntos y una hora válida');
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
      toast.success('Viaje programado correctamente');
      setShowScheduleModal(false);
      setSelectedPoints([]);
    } catch (err) {
      toast.error('No se pudo programar el viaje.');
    }
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
    secondaryMenu.push({
      label: 'Viaje en progreso',
      icon: FaRoute,
      onClick: async () => {
        try {
          const res = await api.get('/trips/current/', {
            headers: {
              Authorization: `Token ${token}`
            }
          });

          if (!res.data || !res.data.route) {
            toast.error('No tienes un viaje activo actualmente.');
            setCurrentTrip(null);
            return;
          }

          setCurrentTrip(res.data);
        } catch (err) {
          console.warn('No hay viaje en progreso', err);
          toast.error('No tienes ningún viaje activo actualmente.');
          setCurrentTrip(null);
        }
      }
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
          existingRoutes={currentTrip?.route ? [parseRoute(currentTrip.route)] : []}
          onPointsChange={setSelectedPoints}
          selectedPoints={selectedPoints}
          centerToUser={centerUserFlag}
          onFinishTrip={handleFinishTrip}
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
        trips={trips || []}
        onStartTrip={handleStartTrip}
        onCancelTrip={handleCancelTrip}
      />
    </div>
  );
}
