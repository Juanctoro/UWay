import React from 'react';
import { ImageBackground, Image, View, StyleSheet, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Lupa } from '../components/Lupa';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground source={require('../assets/fondo.jpg')} style={styles.bg}>
      <LinearGradient colors={['transparent', '#8000ff']} style={styles.gradient} />

      <View style={styles.boxLogo}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <Pressable style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Iniciar Sesion</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate('QuienEres')}>
        <Text style={styles.linkText}>
          ¿No tienes cuenta? <Text style={{ textDecorationLine: 'underline' }}>Regístrate</Text>
        </Text>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1, justifyContent: 'flex-end', alignItems: 'center' },
  gradient: { ...StyleSheet.absoluteFillObject },
  boxLogo: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  logo: { width: 180, height: 60 },
  btn: {
    width: '80%',
    backgroundColor: '#ddd',
    borderRadius: 28,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  btnText: { fontWeight: '700', fontSize: 16 },
  linkText: { color: '#fff', marginBottom: 40 },
});
