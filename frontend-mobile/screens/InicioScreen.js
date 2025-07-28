
import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

import MapComponent   from '../components/MapComponent';
import HomeMenu       from '../components/HomeMenu';

import CarInfoCard    from '../components/CarInfoCard';
import RouteInfoCard  from '../components/RouteInfoCard';

const BOTTOM_NAV_HEIGHT = 80;       

export default function InicioScreen() {
  const [origin,      setOrigin]      = useState(null);   
  const [destination, setDestination] = useState(null);   
  const [tripStarted, setTripStarted] = useState(false); 

  
  const handleDestinationSelected = useCallback((coords) => {
    setDestination(coords);
    setTripStarted(true);             
  }, []);

  return (
    <View style={styles.container}>
      <MapComponent
        origin={origin}
        destination={destination}
        onOriginResolved={setOrigin}
        bottomPadding={BOTTOM_NAV_HEIGHT + 160}
      />

      <HomeMenu onDestinationSelected={handleDestinationSelected} />

      {tripStarted && (
        <View style={styles.overlay}>
          <CarInfoCard
            status="Viaje en curso"
            model="Kia Picanto azul"
            plate="KMI 204"
            eta="5 min"
          />

          <RouteInfoCard
            stops={[
              'Av Roosevelt',
              'Cl 4B # 36-00 (Univalle San Fernando)',
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: BOTTOM_NAV_HEIGHT + 12, 
    alignItems: 'center',
  },
});