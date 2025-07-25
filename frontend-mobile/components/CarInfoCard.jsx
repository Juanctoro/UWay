import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Carro_3D } from './Carro_3D';        
const WIDTH = Dimensions.get('window').width;

export default function CarInfoCard({
  status = 'Viaje en curso',
  model  = 'Kia Picanto azul',
  plate  = 'ABC 123',   
  eta    = '5 min',
}) {
  return (
    <View style={styles.container}>
      <View style={styles.dragHandle} />

      <View style={styles.row}>
        <Carro_3D width={64} height={64} />

        <View style={styles.infoBlock}>
          <Text style={styles.status}>{status}</Text>
          <Text style={styles.model}>{model}</Text>
          <Text style={styles.plate}>{plate}</Text>
        </View>

        <Text style={styles.eta}>{eta}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH - 40,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  dragHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d9d9d9',
    marginBottom: 12,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  infoBlock: { flex: 1, marginLeft: 12 },
  status: { fontSize: 16, fontWeight: '700' },
  model:  { fontSize: 14, marginTop: 2 },
  plate:  { fontSize: 14, color: '#8e8e8e' },
  eta:    { fontSize: 14, fontWeight: '600', color: '#8e8e8e' },
});
