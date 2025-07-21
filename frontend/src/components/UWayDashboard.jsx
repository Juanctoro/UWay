import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaSearch,
  FaMapMarkerAlt,
  FaChartBar,
  FaUserCog,
  FaHistory,
  FaUser,
  FaUniversity,
  FaCar,
  FaHeadset,
  FaBars
} from 'react-icons/fa';
import './styles/UWayDashboard.css';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

// Captura clicks para agregar puntos
function ClickHandler({ onAdd }) {
  useMapEvents({
    click(e) {
      onAdd({ lat: e.latlng.lat, lng: e.latlng.lng });
    }
  });
  return null;
}

// Cambiar de lugar el zoom
function ZoomControlTopRight() {
  const map = useMap();

  useEffect(() => {
    const zoom = L.control.zoom({ position: 'topright' });
    zoom.addTo(map);

    return () => {
      map.removeControl(zoom);
    };
  }, [map]);

  return null;
}

// Rutas
function RoutingControl({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length < 2) return;

    const control = L.Routing.control({
      waypoints: points.map((p) => L.latLng(p.lat, p.lng)),
      lineOptions: { styles: [{ color: '#7e22ce', weight: 4 }] },
      altLineOptions: { styles: [{ color: '#7e22ce', opacity: 0.3, weight: 3 }] },
      routeWhileDragging: true,
      showAlternatives: true,
      fitSelectedRoutes: true,
      show: false,
      createMarker: () => null,
      addWaypoints: false,
      draggableWaypoints: false,
    }).addTo(map);

    document.querySelector('.leaflet-routing-container')?.remove();
    document.querySelector('.leaflet-routing-collapse-btn')?.remove();

    return () => map.removeControl(control);
  }, [map, points]);

  return null;
}

// Recentrar mapa cuando cambia el centro
function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function Dashboard() {
  const [points, setPoints] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([4.60971, -74.08175]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Añadir y eliminar puntos
  const addPoint = (latlng) => setPoints((prev) => [...prev, latlng]);
  const removePoint = (idx) => setPoints((prev) => prev.filter((_, i) => i !== idx));

  // Iconos de Leaflet y personalizado para puntos
  const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
    iconAnchor: [12, 41]
  });
  const userIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
  const getCircleIcon = () =>
    new L.DivIcon({
      html: '<div style=\"background:#7e22ce;width:16px;height:16px;border-radius:50%;border:2px solid white;\"></div>',
      className: 'circle-icon',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

  // Búsqueda con Nominatim limitada a ciudad actual
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      let bboxParams = '';
      if (userLocation) {
        const d = 0.05;
        const { lat, lng } = userLocation;
        bboxParams = `&viewbox=${lng - d},${lat + d},${lng + d},${lat - d}&bounded=1`;
      }

      const url = `/nominatim/search?` +
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

  // Seleccionar o cerrar resultados
  const handleSelectResult = (r) => {
    if (r) {
      const lat = parseFloat(r.lat);
      const lng = parseFloat(r.lon);
      addPoint({ lat, lng });
      setMapCenter([lat, lng]);
    }
    setSearchResults([]);
    setSearchQuery('');
  };

  // Obtener ubicación al montar
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setMapCenter([latitude, longitude]);
      },
      (err) => console.warn('Geolocalización denegada', err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return (
    <div className="dashboard-container">
      <aside className={`sidebar-dashboard ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-dashboard">
          <div className="logo-dashboard">
            <span className="logo-dashboard-text">Ugüee</span>
            <button className="close-button" onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <p className="tagline">Tu campus, tu viaje, a tu ritmo.</p>
        </div>
        <hr></hr>
        <ul className="menu">
          <li
            className="menu-item locate-button-sidebar"
            onClick={() =>
              userLocation && setMapCenter([userLocation.lat, userLocation.lng])
            }
          >
            <FaMapMarkerAlt className="icon" />Mi ubicación
          </li>
          <li className="menu-item">
            <FaChartBar className="icon" />Estadísticas
          </li>
          <li className="menu-item">
            <FaUserCog className="icon" />Asignar Roles
          </li>
          <li className="menu-item">
            <FaHistory className="icon" />Historial
          </li>
          <li className="menu-item">
            <FaUser className="icon" />Registrar Usuarios
          </li>
        </ul>
        <hr />
        <ul className="menu">
          <li className="menu-item">
            <FaUniversity className="icon" />Registrar Instituciones
          </li>
          <li className="menu-item">
            <FaCar className="icon" />Registrar Conductores
          </li>
        </ul>
        <hr />
        <div className="support">
          <p>¿Necesitas soporte o deseas reportar algún fallo?</p>
          <button className="contact-button">
            <FaHeadset className="icon" />Contacto
          </button>
        </div>
        
      </aside>
      
      <main className="map-view">
        {!sidebarOpen && (
          <button className="hamburger-button" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
        )}
        <div className="search-bar">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              placeholder="Buscar lugar en la ciudad"
            />
            <button className="search-button" type="button" onClick={handleSearch}>
              <FaSearch />
            </button>
          </form>

          {searchResults.length > 0 && (
            <div className="search-dropdown">
              <ul className="search-results-list">
                {searchResults.map((r, i) => (
                  <li key={i} className="search-result-item" onClick={() => handleSelectResult(r)}>
                    <FaMapMarkerAlt className="result-icon" />
                    <span className="result-text">{r.display_name}</span>
                  </li>
                ))}
              </ul>
              <button className="search-results-close" onClick={() => handleSelectResult(null)}>
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        <MapContainer center={mapCenter} zoomControl={false} zoom={13} className="map-container">
          <ZoomControlTopRight />
                    <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            attribution="© OpenStreetMap contributors © CARTO"
            subdomains="abcd"
          />
          <Recenter center={mapCenter} />
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
              <Popup>
                Tú estás aquí: {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
              </Popup>
            </Marker>
          )}
          <ClickHandler onAdd={addPoint} />
          {points.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lng]} icon={getCircleIcon()}>
              <Popup>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Punto {i + 1}: {p.lat.toFixed(5)}, {p.lng.toFixed(5)}</span>
                  <button className="btn-remove" onClick={() => removePoint(i)}><FaTimes /></button>
                </div>
              </Popup>
            </Marker>
          ))}
          {points.length >= 2 && <RoutingControl points={points} />}
        </MapContainer>
        <div className="points-list">
          <h4>Puntos seleccionados</h4>
          <ol>
            {points.map((p, i) => (
              <li key={i}>
                <span>{i + 1}. {p.lat.toFixed(5)}, {p.lng.toFixed(5)}</span>
                <button className="btn-remove-list" onClick={() => removePoint(i)}><FaTimes />X</button>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
