import React, { useState } from 'react';
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
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Lupa } from '../components/Lupa';
import { Ubicacion } from '../components/Icono_ubicacion';
import { Inicio as InicioIcon } from '../components/Icono_inicio';
import { Icono_Historial as HistorialIcon } from '../components/Icono_historial';
import { Cuenta as CuentaIcon } from '../components/Icono_cuenta';
import CarInfoCard2 from '../components/CarInfoCard2';

export default function ViajesDisponiblesScreen() {
  const navigation = useNavigation();


  const [viajes] = useState([
    { id: '1', origen: 'Cra 34 #56-07', fecha: '25 de jun - 7:19 p.m.' },
    { id: '2', origen: 'Cra 34 #56-07', fecha: '25 de jun - 7:19 p.m.' },
    { id: '3', origen: 'Cra 34 #56-07', fecha: '25 de jun - 7:19 p.m.' },
    { id: '4', origen: 'Cra 34 #56-07', fecha: '25 de jun - 7:19 p.m.' },
  ]);

  const renderItem = ({ item }) => (
    <CarInfoCard2
      place={item.origen}
      dateTime={item.fecha}
      onPress={() => console.log('Agendar', item.id)}
      btnLabel="Agendar"
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Viajes disponibles</Text>

        <View style={styles.card}>
          {/* Campos de búsqueda */}
          <View style={styles.inputWrapper}>
            <Lupa width={20} height={20} />
            <TextInput style={styles.input} placeholder="Punto de partida" />
          </View>
          <View style={styles.resultRow}>
            <Ubicacion width={20} height={20} />
            <Text style={styles.resultTxt}>Placeholder</Text>
          </View>

          <View style={[styles.inputWrapper, { marginTop: 16 }]}>
            <Lupa width={20} height={20} />
            <TextInput style={styles.input} placeholder="Punto de parada" />
          </View>
          <View style={styles.resultRow}>
            <Ubicacion width={20} height={20} />
            <Text style={styles.resultTxt}>Cra 34 # 36 08</Text>
          </View>
        </View>

        {/* Lista de resultados */}
        <View style={styles.card}>
          <FlatList
            data={viajes}
            keyExtractor={(item) => item.id}
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
