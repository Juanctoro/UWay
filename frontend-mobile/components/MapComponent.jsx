import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import MapView, {
  Marker,
  Polyline,
  PROVIDER_DEFAULT,
  UrlTile,
} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';

export default function MapComponent({ origin, destination, onOriginResolved, bottomPadding = 0 }) {
  const mapRef = useRef(null);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  // Ask permission & get user location once at mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
      const { latitude, longitude } = loc.coords;
      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      };
      setCurrentRegion(region);
      onOriginResolved && onOriginResolved({ latitude, longitude });
    })();
  }, []);

  // Whenever origin & destination are set, fetch route from OSRM
  useEffect(() => {
    const fetchRoute = async () => {
      if (!origin || !destination) return;
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}?overview=full&geometries=geojson`;
        const { data } = await axios.get(url);
        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => ({ latitude: lat, longitude: lng }));
        setRouteCoords(coords);

        // Fit route into view
        setTimeout(() => {
          if (mapRef.current) {
            mapRef.current.fitToCoordinates(coords, {
              edgePadding: { top: 100, right: 50, bottom: bottomPadding + 50, left: 50 },
              animated: true,
            });
          }
        }, 300);
      } catch (err) {
        console.error('OSRM error', err);
      }
    };
    fetchRoute();
  }, [origin, destination]);

  if (!currentRegion) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_DEFAULT}
      style={StyleSheet.absoluteFill}
      initialRegion={currentRegion}
      showsUserLocation
      loadingEnabled
      showsMyLocationButton
    >
      {/* OSM tiles */}
      <UrlTile urlTemplate="https://c.tile.openstreetmap.org/{z}/{x}/{y}.png" maximumZ={19} flipY={false} />

      {/* Origin marker */}
      {origin && <Marker coordinate={origin} />}
      {/* Destination marker */}
      {destination && <Marker coordinate={destination} pinColor="green" />}
      {/* Route polyline */}
      {routeCoords.length > 0 && (
        <Polyline
          coordinates={routeCoords}
          strokeWidth={4}
        />
      )}
    </MapView>
  );
}