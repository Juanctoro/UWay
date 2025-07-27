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

export default function registerInstitucion({ navigation }) {
    const [name, setname] = useState('');
    const [direccion, setdireccion] = useState('');
    const [logo, setlogo] = useState('');
    const [color, setcolor] = useState('');
    const [rut, setrut] = useState('');

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

                        <Text style={styles.label}>Nombre de la institucion</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={name}
                            onChangeText={setname}
                        />


                        <Text style={styles.label}>Direccion de la institucion</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={direccion}
                            onChangeText={setdireccion}
                        />

                        <Text style={styles.label}>Logo</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={logo}
                            onChangeText={setlogo}
                        />

                        <Text style={styles.label}>Paleta de colores</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={color}
                            onChangeText={setcolor}
                        />

                        <Text style={styles.label}>Registro Unico Tributario (RUT)</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            secureTextEntry
                            value={rut}
                            onChangeText={setrut}
                        />

                        <RoundedButton title="Siguiente" onPress={() => navigation.navigate('Institucion2')} />
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
