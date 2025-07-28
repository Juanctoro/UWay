import React, { useEffect, useState } from 'react';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import api from '../api/axiosClient';
import './styles/ReservationsModal.css';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';

export default function ReservationsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función auxiliar para parsear POINT (lng lat)
  const parsePoint = (wktString) => {
    const match = wktString.match(/POINT\s?\(([-\d.]+)\s+([-\d.]+)\)/);
    if (!match) return null;
    return {
      lng: parseFloat(match[1]),
      lat: parseFloat(match[2])
    };
  };

useEffect(() => {
  const fetchReservations = async () => {
    try {
      const res = await api.get('/reservations/my-reservations/');
      const baseReservations = res.data;

      // Paso 1: Consultar todos los trips
      const tripPromises = baseReservations.map((r) =>
        api.get(`/trips/${r.trip}/`).then(res => ({
          tripId: r.trip,
          trip: res.data
        }))
      );

      const tripsData = await Promise.all(tripPromises); // ← primero se obtiene esto

      // Paso 2: Consultar todos los vehículos (si es necesario)
      const vehiclePromises = tripsData
        .filter(t => typeof t.trip.vehicle === 'number') // verifica que sea ID
        .map(t =>
          api.get(`/vehicles/${t.trip.vehicle}/`).then(res => ({
            vehicleId: t.trip.vehicle,
            vehicle: res.data
          }))
        );

      const vehiclesData = await Promise.all(vehiclePromises);

      // Paso 3: Enriquecer reservas con trip y vehicle
      const enrichedReservations = baseReservations.map((r) => {
        const tripInfo = tripsData.find(t => t.tripId === r.trip)?.trip;
        const vehicleInfo = vehiclesData.find(v => v.vehicleId === tripInfo?.vehicle)?.vehicle;

        return {
          ...r,
          pickup_coords: parsePoint(r.pickup_point),
          trip_info: {
            ...tripInfo,
            vehicle: vehicleInfo || null
          }
        };
      });

      setReservations(enrichedReservations);
    } catch (err) {
      console.error("Error al cargar reservas, viajes o vehículos:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isOpen) fetchReservations();
}, [isOpen]);


  return (
    <div className="reservations-modal-overlay">
      <div className="reservations-modal-content">
        <div className="reservations-modal-header">
          <h2>Mis Reservas</h2>
          <button className="reservations-modal-close" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="reservations-modal-body">
          {loading ? (
            <p>Cargando reservas...</p>
          ) : reservations.length === 0 ? (
            <p>No tienes reservas registradas.</p>
          ) : (
            reservations.map((r, i) => (
              <div key={i} className="reservation-card">
                <p><strong>Viaje ID:</strong> {r.trip}</p>
                <p><strong>Reservado el:</strong> {new Date(r.reserved_at).toLocaleString('es-CO')}</p>
                <p><strong>Observación:</strong> {r.observation || 'Ninguna'}</p>

                {/* Punto de recogida */}
                {r.pickup_coords ? (
                    <div style={{ height: '200px', marginTop: '10px' }}>
                        <MapContainer
                            center={[r.pickup_coords.lat, r.pickup_coords.lng]}
                            zoom={15}
                            style={{ height: '100%', width: '100%' }}
                            scrollWheelZoom={false}
                        >
                            <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                            attribution="© OpenStreetMap contributors © CARTO"
                            />

                            {/* Punto de espera */}
                            <Marker
                            position={[r.pickup_coords.lat, r.pickup_coords.lng]}
                            icon={L.divIcon({
                                className: 'selected-point-icon',
                                html: '<div style="background:#7e22ce;width:14px;height:14px;border-radius:50%;border:2px solid white;"></div>',
                                iconSize: [18, 18],
                                iconAnchor: [9, 9]
                            })}
                            >
                            <Popup>Punto de recogida</Popup>
                            </Marker>
                        </MapContainer>
                        </div>

                ) : (
                  <p>
                    <FaMapMarkerAlt style={{ marginRight: '5px' }} />
                    <strong>Recogida:</strong> No disponible
                  </p>
                )}

                {/* Información del viaje */}
                {r.trip_info && (
                  <>
                    <p><strong>Hora de salida:</strong> {new Date(r.trip_info.start_time).toLocaleTimeString('es-CO')}</p>
                    {r.trip_info.vehicle && (
                      <p><strong>Vehículo:</strong> {r.trip_info.vehicle.brand} {r.trip_info.vehicle.model} - {r.trip_info.vehicle.plate}</p>
                    )}
                  </>
                )}

                {r.has_boarded && <p className="badge-boarded">✔️ Abordado</p>}
              </div>
            ))
          )}
        </div>

        <div className="reservations-modal-footer">
            <button className="close-modal-button" onClick={onClose}>
                Cerrar
            </button>
        </div>
      </div>
    </div>
  );
}
