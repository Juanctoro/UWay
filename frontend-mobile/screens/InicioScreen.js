import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import MapComponent from '../components/MapComponent';
import HomeMenu from '../components/HomeMenu';


const BOTTOM_NAV_HEIGHT = 80;

export default function InicioScreen() {
  const [origin, setOrigin] = useState(null); // { latitude, longitude }
  const [destination, setDestination] = useState(null); // { latitude, longitude }

  const handleDestinationSelected = useCallback((coords) => {
    setDestination(coords);
  }, []);

  return (
    <View style={styles.container}>
      <MapComponent
        origin={origin}
        destination={destination}
        bottomPadding={BOTTOM_NAV_HEIGHT}
        onOriginResolved={setOrigin}
      />
      <HomeMenu onDestinationSelected={handleDestinationSelected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});