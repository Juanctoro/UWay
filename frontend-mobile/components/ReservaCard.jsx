
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Carro_3D } from './Carro_3D';

export default function ReservaCard({
  place,
  dateTime,
  subtitle,
  onReschedule,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.left}>
        <Carro_3D width={48} height={48} />
      </View>

      <View style={styles.center}>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.date}>{dateTime}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <TouchableOpacity style={styles.btn} onPress={onReschedule}>
        <Text style={styles.btnTxt}>Reagendar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  left: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  center: { flex: 1 },
  place: { fontWeight: '700' },
  date: { fontSize: 12, color: '#666' },
  subtitle: { fontSize: 12, color: '#666' },
  btn: {
    backgroundColor: '#7A00FF',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  btnTxt: { color: '#FFF', fontWeight: '700' },
});
