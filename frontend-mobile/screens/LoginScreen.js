import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <ImageBackground source={require('../assets/fondo.jpg')} style={styles.bg}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.cardWrapper}
        >
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.title}>Bienvenido a</Text>
              <Image source={require('../assets/Logo.png')} style={styles.logo} />
            </View>

            <TextInput
              placeholder="Usuario o Email"
              placeholderTextColor="#aaa"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Contraseña"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={pwd}
              onChangeText={setPwd}
            />

            <RoundedButton title="Iniciar Sesion" onPress={() => navigation.navigate('Inicio')} />

            <Pressable onPress={() => navigation.navigate('ResetPassword')}>
              <Text style={styles.forgot}>¿Olvido su contraseña?</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>

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
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 22, fontWeight: '700', marginRight: 6 },
  logo: { width: 90, height: 32 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
  },
  forgot: { alignSelf: 'center', marginTop: 10 },
  version: { alignSelf: 'center', color: '#666', marginBottom: 8 },
});
