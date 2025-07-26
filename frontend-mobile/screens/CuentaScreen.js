// screens/CuentaScreen.js
// Pantalla "Cuenta" – espaciados y tamaños de iconos ajustados

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

// --- IMPORTS DE ICONOS (exportaciones nombradas) ---
import { Cuenta as CuentaIcon } from '../components/Icono_cuenta';
import { Icono_Historial as HistorialIcon } from '../components/Icono_historial';
import { Inicio as InicioIcon } from '../components/Icono_inicio';
import { Qr as QrIcon } from '../components/Icono_qr';
import { Seguridad } from '../components/Icono_seguridad';
import { Ayuda } from '../components/Icono_ayuda';
import { Bus } from '../components/Bus';
import { Ajustes } from '../components/Ajustes';

// Tamaño estándar para los íconos en acciones rápidas
const QUICK_ICON_SIZE = 50;

export default function CuentaScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Encabezado */}
        <View style={styles.header}>
          <Text style={styles.name}>Susanita Perez</Text>

          <View style={styles.ratingChip}>
            <Text style={styles.star}>★</Text>
            <Text style={styles.ratingText}>4.96</Text>
          </View>

          <TouchableOpacity style={styles.avatarBtn}>
            <CuentaIcon width={40} height={40} />
          </TouchableOpacity>
        </View>

        {/* Acciones rápidas */}
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => console.log('Ajustes')}
          >
            <Ajustes width={45} height={45} />
            <Text style={styles.actionText}>Configuración</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBox}
            onPress={() => navigation.navigate('Historial')}
          >
            <HistorialIcon width={45} height={45} />
            <Text style={styles.actionText}>Historial</Text>
          </TouchableOpacity>
        </View>

        {/* Tarjetas de menú */}
        <MenuCard
          title="Quiero Ser Conductor"
          subtitle="Realiza aquí tu solicitud para ser conductor para la institución"
          Icon={Bus}
          onPress={() => console.log('Quiero ser conductor')}
        />

        <MenuCard
          title="Ayuda"
          subtitle="Consulta temas de interés o contacta a un agente de soporte en caso de requerir ayuda personalizada"
          Icon={Ayuda}
          onPress={() => console.log('Ayuda')}
        />

        <MenuCard
          title="Control de Seguridad"
          subtitle="Conoce cómo hacer que los viajes sean más seguros"
          Icon={Seguridad}
          onPress={() => console.log('Control de Seguridad')}
        />

        <MenuCard
          title="Escanea tu QR"
          subtitle="Desde aquí podrás escanear el código QR para así comenzar el viaje"
          Icon={QrIcon}
          onPress={() => navigation.navigate('ScanQr')}
        />
      </ScrollView>

      {/* Bottom Nav */}
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

// --- Componentes auxiliares --- //
function MenuCard({ title, subtitle, Icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        <View style={styles.cardText}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </View>
        <Icon width={45} height={60} />
      </View>
    </TouchableOpacity>
  );
}


const STATUS_BAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E5E5E5' },


  scroll: {
    paddingHorizontal: 20,
    paddingTop: STATUS_BAR_HEIGHT + 40, 
    paddingBottom: 120,
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  name: { flex: 1, fontSize: 28, fontWeight: '700' },
  ratingChip: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  star: { fontSize: 14, marginRight: 4 },
  ratingText: { fontSize: 14, fontWeight: '600' },
  avatarBtn: { backgroundColor: '#FFF', padding: 6, borderRadius: 30 },

  // Acciones rápidas
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionBox: {
    flex: 1,
    backgroundColor: '#FFF',
    marginHorizontal: 4,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    overflow: 'visible', 
  },
  actionText: { marginTop: 6, fontWeight: '600' },

  // Tarjetas menú 
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardText: { flex: 1, paddingRight: 16 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 4 },
  cardSubtitle: { fontSize: 13, color: '#666' },


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
