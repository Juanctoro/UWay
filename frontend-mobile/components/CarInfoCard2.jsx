import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Carro_3D } from './Carro_3D';

export default function CarInfoCard2({
  place,
  dateTime,
  subtitle,
  onPress,
  btnLabel = 'Agendar',
}) {
  return (
    <View style={styles.row}>
      {/* Icono */}
      <View style={styles.thumb}>
        <Carro_3D width={48} height={48} />
      </View>

      {/* Datos */}
      <View style={styles.info}>
        <Text style={styles.place}>{place}</Text>
        <Text style={styles.date}>{dateTime}</Text>
        {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
      </View>

      {/* Botón */}
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.btnTxt}>{btnLabel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  thumb: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: { flex: 1 },
  place: { fontWeight: '700' },
  date: { fontSize: 12, color: '#666' },
  sub: { fontSize: 12, color: '#666' },
  btn: {
    backgroundColor: '#7A00FF',
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  btnTxt: { color: '#FFF', fontWeight: '700' },
});
