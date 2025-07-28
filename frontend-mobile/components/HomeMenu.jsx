import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Inicio as InicioIcon } from '../components/Icono_inicio';
import { Icono_Historial as HistorialIcon } from '../components/Icono_historial';
import { Cuenta } from '../components/Icono_cuenta';
import { Ubicacion } from '../components/Icono_ubicacion';
import axios from 'axios';
import { Image } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeMenu({ onDestinationSelected }) {
  
  const navigation = useNavigation();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([
    { id: '1', name: 'Universidad del Valle Entrada 2', coords: { latitude: 3.3731, longitude: -76.5310 } },
    { id: '2', name: 'Crepes & Waffles Pance', coords: { latitude: 3.3353, longitude: -76.5325 } },
  ]);

  const handleSelectSuggestion = (item) => {
    onDestinationSelected(item.coords);
    setQuery(item.name);
  };

  return (
    <>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.logoBox}>
          <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain"/>
        </View>
      </View>

     {/* Search card */}
      <View style={styles.searchCard}>
        <TextInput
          style={styles.input}
          placeholder="¿A donde vas?"
          onPress={() => navigation.navigate('ViajesDisponibles')}
          onChangeText={setQuery}
        />
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.suggestionRow} onPress={() => handleSelectSuggestion(item)}>
              <Ubicacion width={24} height={24} />
              <Text style={{ marginLeft: 12 }}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </View>

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
          <Cuenta width={28} height={28} />
          <Text style={styles.navTxt}>Cuenta</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    position: 'absolute',
    top: Platform.select({ ios: 60, android: 40 }),
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoBox: {
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  logoTxt: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#7A00FF',
  },
  qrButton: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 12,
  },
  searchCard: {
    position: 'absolute',
    bottom: 140,
    left: 20,
    width: SCREEN_WIDTH - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d9d9d9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
  },
  suggestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#fff',
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
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navTxt: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  logo: {
    width: 100,
    height: 45,
    resizeMode: 'contain',
  },
});