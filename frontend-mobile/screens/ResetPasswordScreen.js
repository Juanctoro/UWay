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

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    navigation.navigate('EmailSent', { email });
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

            <Text style={styles.label}>Dirección de Correo Electrónico</Text>
            <TextInput
              placeholder="PlaceHolder"
              placeholderTextColor="#aaa"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Text style={styles.hint}>
              Introduce tu correo electrónico y te enviaremos un enlace para restablecerla
            </Text>

            <RoundedButton title="Restablecer contraseña" onPress={handleSend} />
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
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', marginRight: 6 },
  logo: { width: 90, height: 32 },
  label: { marginBottom: 4, fontWeight: '600' },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  hint: { fontSize: 12, color: '#444', marginBottom: 12 },
  version: { alignSelf: 'center', color: '#666', marginBottom: 8 },
});
