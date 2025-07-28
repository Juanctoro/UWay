import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ubicacion } from './Icono_ubicacion';   
const WIDTH = Dimensions.get('window').width;

export default function RouteInfoCard({
  stops = [
    'Av Roosevelt',
    'Cl 4B # 36-00 (Univalle San Fernando)',
  ],
}) {
  return (
    <View style={styles.container}>
      {stops.map((stop, idx) => (
        <View key={idx} style={styles.row}>
          <Ubicacion width={24} height={24} />
          <Text style={styles.txt}>{stop}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  txt: { marginLeft: 12, fontSize: 14 },
});
