import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import EjemploRuta from '../assets/EJEMPLO_RUTA.png';
import ReservaCard from '../components/ReservaCard';

// Iconos bottom‑nav
import { Inicio as InicioIcon } from '../components/Icono_inicio';
import { Icono_Historial as HistorialIcon } from '../components/Icono_historial';
import { Cuenta as CuentaIcon } from '../components/Icono_cuenta';

export default function HistorialScreen() {
  const navigation = useNavigation();

  // TODO: Reemplazar con data real del backend
  const reservas = [
    {
      id: '1',
      lugar: 'Cra 34 #56-07',
      dateTime: '25 de jun - 7:19 p. m.',
      subtitle: 'Placeholder',
    },
    {
      id: '2',
      lugar: 'Cra 34 #56-07',
      dateTime: '25 de jun - 7:19 p. m.',
      subtitle: 'Placeholder',
    },
    {
      id: '3',
      lugar: 'Cra 34 #56-07',
      dateTime: '25 de jun - 7:19 p. m.',
      subtitle: 'Placeholder',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Títulos */}
        <Text style={styles.h1}>Historial</Text>
        <Text style={styles.h2}>Anteriores</Text>

        {/* Card grande – mensaje si no hay viajes */}
        <View style={styles.emptyCard}>
          <Image source={EjemploRuta} style={styles.routeImg} />
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={styles.emptyMsg}>Aun no has realizado viajes!</Text>
            <Text style={styles.emptyDate}>09 de jun - 12:53 p. m.</Text>

            <View style={styles.emptyBtnsRow}>
              <TouchableOpacity style={styles.pillBtn}>
                <Text style={styles.pillTxt}>Calificar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.pillBtn}>
                <Text style={styles.pillTxt}>Reagendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Lista de reservas */}
        {reservas.map((r) => (
          <ReservaCard
            key={r.id}
            place={r.lugar}
            dateTime={r.dateTime}
            subtitle={r.subtitle}
            onReschedule={() => console.log('Reagendar', r.id)}
          />
        ))}
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Inicio')}>
          <InicioIcon width={28} height={28} />
          <Text style={styles.navTxt}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Historial')}>
          <HistorialIcon width={28} height={28} />
          <Text style={styles.navTxt}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => navigation.replace('Cuenta')}>
          <CuentaIcon width={28} height={28} />
          <Text style={styles.navTxt}>Cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ---- Estilos ---- //
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E5E5' },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20,
    paddingBottom: 120,
  },
  h1: { fontSize: 32, fontWeight: '700', marginBottom: 4 },
  h2: { fontSize: 20, fontWeight: '600', marginBottom: 16 },

  // Empty card
  emptyCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  routeImg: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  emptyMsg: { fontSize: 16, fontWeight: '700', marginTop: 12 },
  emptyDate: { fontSize: 13, color: '#666', marginBottom: 16 },
  emptyBtnsRow: { flexDirection: 'row', marginBottom: 16 },
  pillBtn: {
    backgroundColor: '#7A00FF',
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 24,
    marginRight: 12,
  },
  pillTxt: { color: '#FFF', fontWeight: '700' },

  /* bottom nav */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  navItem: { justifyContent: 'center', alignItems: 'center' },
  navTxt: { marginTop: 4, fontSize: 12, fontWeight: '600' },
});
