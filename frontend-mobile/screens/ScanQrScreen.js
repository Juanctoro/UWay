import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Iconos generales (bottom‑nav)
import { Inicio as InicioIcon } from '../components/Icono_inicio';
import { Icono_Historial as HistorialIcon } from '../components/Icono_historial';
import { Cuenta as CuentaIcon } from '../components/Icono_cuenta';

// Botones principales de la tarjeta
import { Camara } from '../components/Camara';
import { Galeria } from '../components/Galeria';

export default function ScanQrScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Tarjeta principal */}
        <View style={styles.card}>
          <Text style={styles.title}>Escanear QR</Text>

          <View style={styles.actionsRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => console.log('Abrir cámara')}
            >
              <Camara width={48} height={48} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => console.log('Abrir galería')}
            >
              <Galeria width={48} height={48} />
            </TouchableOpacity>
          </View>

          <View style={styles.textBlock}>
            <Text style={styles.notice}>
              Solicítale el Código QR al conductor antes de comenzar el viaje!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom navigation (mismo look que otras pantallas) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.replace('Inicio')}
        >
          <InicioIcon width={28} height={28} />
          <Text style={styles.navTxt}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.navigate('Historial')}
        >
          <HistorialIcon width={28} height={28} />
          <Text style={styles.navTxt}>Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigation.replace('Cuenta')}
        >
          <CuentaIcon width={28} height={28} />
          <Text style={styles.navTxt}>Cuenta</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Estilos --- //
const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E5E5' },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 180,
    paddingBottom: 120,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 32,
    paddingHorizontal: 36,
    paddingVertical: 36,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 60 },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60,
  },
  actionBtn: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#F6F8FF',
    borderRadius: 16,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBlock: {
    marginBottom: 20,
  },
  notice: { fontSize: 22, fontWeight: '700' },

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
