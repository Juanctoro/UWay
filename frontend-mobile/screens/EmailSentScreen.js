import React from 'react';
import { Image, ImageBackground, View, Text, StyleSheet } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmailSentScreen({ route, navigation }) {
  const { email = 'tu correo' } = route.params || {};

  return (
    <ImageBackground source={require('../assets/fondo.jpg')} style={styles.bg}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Bienvenido a</Text>
              <Image source={require('../assets/Logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.textCenter}>
              Se ha enviado un enlace de restablecimiento de contraseña al correo{'\n'}
              <Text style={{ fontWeight: '700' }}>{email}</Text>
            </Text>

            <RoundedButton
              title="Volver a login"
              style={{ marginTop: 18 }}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </View>

        <Text style={styles.version}>V 1.0.1</Text>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  cardWrapper: { flex: 1, justifyContent: 'center', paddingHorizontal: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 26,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 22 },
  title: { fontSize: 22, fontWeight: '700', marginRight: 6 },
  logo: { width: 90, height: 32 },
  textCenter: { textAlign: 'center', fontSize: 14, lineHeight: 22 },
  version: { alignSelf: 'center', color: '#666', marginBottom: 8 },
});
