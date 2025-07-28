import React from 'react';
import { FaTimes, FaMapMarkerAlt, FaFlagCheckered } from 'react-icons/fa';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './styles/NearbyTripsModal.css';
import api from '../api/axiosClient';

const driverIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

const startIcon = L.divIcon({
  className: 'start-icon',
  html: `
    <div style="width: 10px; height: 10px; background: green; border-radius: 50%; border: 2px solid white;"></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

const endIcon = L.divIcon({
  className: 'end-icon',
  html: `
    <div style="width: 10px; height: 10px; background: black; border-radius: 0; transform: rotate(45deg); border: 2px solid white;"></div>
  `,
  iconSize: [20, 20],
  iconAnchor: [10, 10]
});

function parseMultiLineString(wkt) {
  if (!wkt || typeof wkt !== 'string') return [];

  const match = wkt.match(/\(\(([^)]+)\)\)/);
  if (!match) return [];

  const lines = match[1].split(',');
  return lines.map(point => {
    const [lon, lat] = point.trim().split(' ').map(Number);
    return [lat, lon]; // Leaflet usa [lat, lng]
  });
}

export default function NearbyTripsModal({ trips, onClose, selectedPoint }) {
  return (
    <div className="nearby-modal-overlay">
      <div className="nearby-modal-content">
        <div className="nearby-modal-header">
          <h2>Rutas Cercanas</h2>
          <button className="nearby-modal-close" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="nearby-modal-body">
          {trips.length === 0 ? (
            <p className="nearby-no-trips">No se encontraron rutas cercanas.</p>
          ) : (
            trips.map((trip, i) => {
              const routeCoords = parseMultiLineString(trip.route);
              const start = routeCoords[0];
              const end = routeCoords[routeCoords.length - 1];

              return (
                <div key={i} className="nearby-trip-card">
                  <h3 className="nearby-trip-title">Vehículo: {trip.vehicle_plate}</h3>
                  <p className="nearby-trip-info"><strong>Desde:</strong> {trip.nearest_stop.latitude.toFixed(5)}, {trip.nearest_stop.longitude.toFixed(5)}</p>
                  <p className="nearby-trip-info"><strong>Distancia:</strong> {trip.nearest_stop_distance_m.toFixed(1)} m</p>
                  <MapContainer
                    center={[trip.nearest_stop.latitude, trip.nearest_stop.longitude]}
                    zoom={15}
                    style={{ height: '200px', width: '100%' }}
                    scrollWheelZoom={false}
                  >
                    <TileLayer
                      url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      attribution="© OpenStreetMap contributors © CARTO"
                    />

                    {selectedPoint && (
                      <Marker
                        position={[selectedPoint.lat, selectedPoint.lng]}
                        icon={L.divIcon({
                          className: 'selected-point-icon',
                          html: '<div style="background:#f43f5e;width:14px;height:14px;border-radius:50%;border:2px solid white;"></div>',
                          iconSize: [18, 18],
                          iconAnchor: [9, 9]
                        })}
                      >
                        <Popup>Punto seleccionado</Popup>
                      </Marker>
                    )}

                    <Marker
                      position={[trip.nearest_stop.latitude, trip.nearest_stop.longitude]}
                      icon={driverIcon}
                    >
                      <Popup>Parada más cercana</Popup>
                    </Marker>

                    {routeCoords.length > 1 && (
                      <>
                        <Polyline
                          positions={routeCoords}
                          pathOptions={{ color: '#7e22ce', weight: 5 }}
                        />
                        <Marker position={start} icon={startIcon}>
                          <Popup>Inicio del viaje</Popup>
                        </Marker>
                        <Marker position={end} icon={endIcon}>
                          <Popup>Destino del viaje</Popup>
                        </Marker>
                      </>
                    )}
                  </MapContainer>
                    <button
                    className="nearby-reserve-button"
                    onClick={async () => {
                        console.log("Enviando reserva:", {
                            trip_id: trip.id,
                            selected_point: selectedPoint
                        });
                        try {
                        const response = await api.post('/reservations/create-from-map/', {
                            trip_id: trip.trip_id, 
                            selected_point: {
                                lat: trip.nearest_stop.latitude,
                                lng: trip.nearest_stop.longitude
                            }
                        });
                        alert("Reserva creada con éxito");
                        } catch (error) {
                        console.error("Error al crear la reserva:", error.response?.data || error.message);
                        alert("Error al crear la reserva.");
                        }
                    }}
                    >
                    Reservar este viaje
                    </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
