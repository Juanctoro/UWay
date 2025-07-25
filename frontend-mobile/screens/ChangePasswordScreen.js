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
} from 'react-native';
import RoundedButton from '../components/RoundedButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChangePasswordScreen({ navigation }) {
  const [pwd1, setPwd1] = useState('');
  const [pwd2, setPwd2] = useState('');

  const handleChange = () => {
    if (pwd1.length < 8) return alert('La contraseña debe tener 8 caracteres o más');
    if (pwd1 !== pwd2) return alert('Las contraseñas no coinciden');
    alert('Contraseña cambiada');
    navigation.navigate('Login');
  };

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

            <Text style={styles.label}>Nueva Contraseña</Text>
            <TextInput
              placeholder="PlaceHolder"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={pwd1}
              onChangeText={setPwd1}
            />
            <Text style={styles.hint}>La nueva contraseña debe tener al menos 8 caracteres</Text>

            <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
            <TextInput
              placeholder="PlaceHolder"
              placeholderTextColor="#aaa"
              style={styles.input}
              secureTextEntry
              value={pwd2}
              onChangeText={setPwd2}
            />

            <RoundedButton title="Cambiar contraseña" onPress={handleChange} />
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
  label: { fontWeight: '600', marginTop: 4, marginBottom: 6 },
  hint: { fontSize: 12, color: '#444', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  logo: { width: 90, height: 32 },
  version: { alignSelf: 'center', color: '#666', marginBottom: 8 },
});
