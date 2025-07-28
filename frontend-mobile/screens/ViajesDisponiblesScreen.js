import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Lupa } from '../components/Lupa';
import { Ubicacion } from '../components/Icono_ubicacion';
import { Inicio as InicioIcon } from '../components/Icono_inicio';
import { Icono_Historial as HistorialIcon } from '../components/Icono_historial';
import { Cuenta as CuentaIcon } from '../components/Icono_cuenta';
import CarInfoCard2 from '../components/CarInfoCard2';
import { obtenerViajes } from '../services/tripService';
import vehicleService from '../services/vehicleService';

const API_DRIVERS = 'http://192.168.1.5:8000/drivers/';

export default function ViajesDisponiblesScreen() {
  const navigation = useNavigation();
  const [viajes, setViajes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarViajes = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem('token'); // <-- Token del usuario
        const viajesData = await obtenerViajes();

        // Trae los vehículos asociados en paralelo
        const viajesCompletos = await Promise.all(
          viajesData.map(async (viaje) => {
            let vehiculo = null;
            try {
              if (viaje.vehicle) {
                vehiculo = await vehicleService.getVehicleById(viaje.vehicle, token);
              }
            } catch (error) {
              // Puedes loggear el error si quieres debug
            }
            return { ...viaje, vehiculo };
          })
        );
        // <-- Aquí el console.log que necesitas
        console.log('Viajes completos:', JSON.stringify(viajesCompletos, null, 2));
        setViajes(viajesCompletos);
      } catch (error) {
        Alert.alert('Error', 'No se pudieron cargar los viajes.');
      }
      setLoading(false);
    };
    cargarViajes();
  }, []);

  if (loading) return <ActivityIndicator style={{ marginTop: 60 }} />;

  // Aquí está renderItem
  const renderItem = ({ item }) => {
    const startLat = item.start_point?.coordinates?.[1];
    const startLon = item.start_point?.coordinates?.[0];
    const endLat = item.end_point?.coordinates?.[1];
    const endLon = item.end_point?.coordinates?.[0];

    const vehiculo = item.vehiculo || {};
    const placa = vehiculo.plate || vehiculo.license_plate || 'Desconocida';
    const modelo = vehiculo.model || 'Modelo desconocido';
    const color = vehiculo.color || 'Sin color';
    const conductor = vehiculo.driver || 'Sin conductor';

    const lugar = `De: ${startLat?.toFixed(5) ?? '?'} , ${startLon?.toFixed(5) ?? '?'}\nA: ${endLat?.toFixed(5) ?? '?'} , ${endLon?.toFixed(5) ?? '?'}`;

    return (
      <CarInfoCard2
        place={lugar}
        dateTime={item.start_time ? new Date(item.start_time).toLocaleString() : 'Sin fecha'}
        carModel={modelo}
        carPlate={placa}
        carColor={color}
        driver={conductor}
        onPress={async () => {
          let ids = await AsyncStorage.getItem('historialViajes');
          ids = ids ? JSON.parse(ids) : [];
          if (!ids.includes(item.id)) {
            ids.push(item.id);
            await AsyncStorage.setItem('historialViajes', JSON.stringify(ids));
          }
          Alert.alert('Viaje agendado', '¡Tu viaje ha sido guardado en el historial!');
          navigation.navigate('Historial');
        }}
        btnLabel="Agendar"
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Viajes disponibles</Text>

        <View style={styles.card}>
          {/* Campos de búsqueda (no funcionales aún) */}
          <View style={styles.inputWrapper}>
            <Lupa width={20} height={20} />
            <TextInput style={styles.input} placeholder="Punto de partida" />
          </View>
          <View style={styles.resultRow}>
            <Ubicacion width={20} height={20} />
            <Text style={styles.resultTxt}>Ej: Calle 5 #12-34</Text>
          </View>

          <View style={[styles.inputWrapper, { marginTop: 16 }]}>
            <Lupa width={20} height={20} />
            <TextInput style={styles.input} placeholder="Punto de parada" />
          </View>
          <View style={styles.resultRow}>
            <Ubicacion width={20} height={20} />
            <Text style={styles.resultTxt}>Ej: Cra 34 #36-08</Text>
          </View>
        </View>

        {/* Lista de resultados */}
        <View style={styles.card}>
          <FlatList
            data={viajes}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <BottomNav current="Inicio" navigation={navigation} />
    </SafeAreaView>
  );
}

function BottomNav({ current, navigation }) {
  return (
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
  );
}

const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E5E5' },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 20,
    paddingBottom: 120,
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 24 },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: { flex: 1, marginLeft: 8 },

  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  resultTxt: { marginLeft: 8, fontWeight: '700' },

  confirmBtn: {
    alignSelf: 'flex-start',
    backgroundColor: '#7A00FF',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 40,
  },
  confirmTxt: { color: '#FFF', fontWeight: '700' },

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
