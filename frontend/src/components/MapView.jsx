import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaTimes,
  FaMapMarkerAlt
} from 'react-icons/fa';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import './styles/UWayDashboard.css';

// Captura clicks para agregar puntos
function ClickHandler({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  });
  return null;
}

// Mueve el control de zoom a la esquina superior derecha
function ZoomControlTopRight() {
  const map = useMap();
  useEffect(() => {
    const zoom = L.control.zoom({ position: 'topright' });
    zoom.addTo(map);
    return () => map.removeControl(zoom);
  }, [map]);
  return null;
}

// Dibuja la ruta cuando hay al menos dos puntos
function RoutingControl({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length < 2) return;
    const control = L.Routing.control({
      waypoints: points.map(p => L.latLng(p.lat, p.lng)),
      lineOptions: { styles: [{ color: '#7e22ce', weight: 4 }] },
      altLineOptions: [{ styles: [{ color: '#7e22ce', opacity: 0.3, weight: 3 }] }],
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoutes: true,
      addWaypoints: false,
      createMarker: () => null,
      draggableWaypoints: false
    }).addTo(map);

    // Oculta los botones extra del control
    document.querySelector('.leaflet-routing-container')?.remove();
    document.querySelector('.leaflet-routing-collapse-btn')?.remove();

    return () => map.removeControl(control);
  }, [map, points]);
  return null;
}

// Recentra cuando cambia center
function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
    map.flyTo(center, 17, { animate: true });
  }, [center, map]);
  return null;
}

export default function MapView({
  role,
  existingRoutes = [],
  onPointsChange,
  centerToUser
}) {
  const isDriver = role === 'driver';

  const [points, setPoints] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([4.60971, -74.08175]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Informar al padre cuando cambian los puntos
  useEffect(() => {
    onPointsChange?.(points.length);
  }, [points, onPointsChange]);

  // Recentra a la ubicación del usuario cuando se active
  useEffect(() => {
    if (centerToUser && userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [centerToUser, userLocation]);

  const addPoint = latlng => setPoints(prev => [...prev, latlng]);
  const removePoint = idx => setPoints(prev => prev.filter((_, i) => i !== idx));

  // Iconos personalizados
  const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  const getCircleIcon = () =>
    new L.DivIcon({
      html: '<div style="background:#7e22ce;width:16px;height:16px;border-radius:50%;border:2px solid white;"></div>',
      className: 'circle-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

  // Búsqueda con Nominatim
  const handleSearch = async e => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      let bboxParams = '';
      if (userLocation) {
        const d = 0.05;
        const { lat, lng } = userLocation;
        bboxParams = `&viewbox=${lng - d},${lat + d},${lng + d},${lat - d}&bounded=1`;
      }
      const url =
        `/nominatim/search?` +
        `q=${encodeURIComponent(searchQuery)}` +
        `&format=json&limit=5` +
        bboxParams;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Error en búsqueda', err);
    }
  };

  const handleSelectResult = r => {
    if (r) {
      const lat = parseFloat(r.lat);
      const lng = parseFloat(r.lon);
      addPoint({ lat, lng });
      setMapCenter([lat, lng]);
    }
    setSearchResults([]);
    setSearchQuery('');
  };

  // Obtener geolocalización del usuario
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setMapCenter([latitude, longitude]);
      },
      err => console.warn('Geolocalización denegada', err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return (
    <>
      {isDriver && (
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="Buscar lugar en la ciudad"
            />
            <button
              className="search-button"
              type="button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="search-dropdown">
              <ul className="search-results-list">
                {searchResults.map((r, i) => (
                  <li
                    key={i}
                    className="search-result-item"
                    onClick={() => handleSelectResult(r)}
                  >
                    <FaMapMarkerAlt className="result-icon" />
                    <span className="result-text">{r.display_name}</span>
                  </li>
                ))}
              </ul>
              <button
                className="search-results-close"
                onClick={() => handleSelectResult(null)}
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      )}

      <MapContainer
        center={mapCenter}
        zoomControl={false}
        zoom={13}
        className="map-container"
      >
        <ZoomControlTopRight />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="© OpenStreetMap contributors © CARTO"
        />
        <Recenter center={mapCenter} />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>
              Tú estás aquí: {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
            </Popup>
          </Marker>
        )}

        {isDriver && <ClickHandler onAdd={addPoint} />}

        {points.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]} icon={getCircleIcon()}>
            <Popup>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>
                  Punto {i + 1}: {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
                </span>
                <button className="btn-remove" onClick={() => removePoint(i)}>
                  <FaTimes />
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {isDriver && points.length >= 2 && <RoutingControl points={points} />}

        {!isDriver &&
          existingRoutes.map((route, i) => (
            <Polyline key={i} positions={route.points} />
          ))}
      </MapContainer>

      {isDriver && (
        <div className="points-list">
          <h4>Puntos seleccionados</h4>
          <ol>
            {points.map((p, i) => (
              <li key={i}>
                <span>
                  {i + 1}. {p.lat.toFixed(5)}, {p.lng.toFixed(5)}
                </span>
                <button
                  className="btn-remove-list"
                  onClick={() => removePoint(i)}
                >
                  <FaTimes /> X
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </>
  );
}
