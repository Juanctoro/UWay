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

export default function registerUserScreen({ navigation }) {
    const [ins, setInstitucion] = useState('');
    const [name, setname] = useState('');
    const [apellido, setapellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [Code, setCode] = useState('');

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
                            <Text style={styles.title}>Registro</Text>
                        </View>

                        <Text style={styles.label}>Selecciona la institucion a la cual te vas a registrar</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={ins}
                            onChangeText={setInstitucion}
                        />


                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={name}
                            onChangeText={setname}
                        />

                        <Text style={styles.label}>Apellidos</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={apellido}
                            onChangeText={setapellido}
                        />

                        <Text style={styles.label}>Correo Electronico Institucional (Opcional)</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={correo}
                            onChangeText={setCorreo}
                        />

                        <Text style={styles.label}>Codigo de estudiante (Opcional)</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={Code}
                            onChangeText={setCode}
                        />

                        <RoundedButton title="Siguiente" onPress={() => navigation.navigate('Usuario2')} />
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
