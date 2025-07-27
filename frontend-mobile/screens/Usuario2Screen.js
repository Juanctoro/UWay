import React, { useState } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as DocumentPicker from 'expo-document-picker';
import RoundedButton from '../components/RoundedButton';

export default function Usuario2Screen({ navigation }) {
    const [celular, setCelular] = useState('');
    const [direccion, setDireccion] = useState('');
    const [documento, setDocumento] = useState('');
    const [carnetFile, setCarnetFile] = useState(null);
    const [registroFile, setRegistroFile] = useState(null);

    const handleSelectCarnet = async () => {
        console.log('📁 Abrir picker Carnet');
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            console.log('📁 Resultado Carnet:', res);
            if (res.type === 'success') {
                setCarnetFile(res);
            }
        } catch (err) {
            console.error('🔴 Error Carnet:', err);
            Alert.alert('Error', 'No se pudo seleccionar el carnet.');
        }
    };

    const handleSelectRegistro = async () => {
        console.log('📁 Abrir picker Registro');
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            console.log('📁 Resultado Registro:', res);
            if (res.type === 'success') {
                setRegistroFile(res);
            }
        } catch (err) {
            console.error('🔴 Error Registro:', err);
            Alert.alert('Error', 'No se pudo seleccionar el registro académico.');
        }
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

                        {/* Número de celular: solo dígitos */}
                        <Text style={styles.label}>Número de celular</Text>
                        <TextInput
                            placeholder="Ej. 3001234567"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            keyboardType="numeric"
                            value={celular}
                            onChangeText={text => setCelular(text.replace(/[^0-9]/g, ''))}
                        />

                        {/* Dirección */}
                        <Text style={styles.label}>Dirección de residencia</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={direccion}
                            onChangeText={setDireccion}
                        />

                        {/* Documento de identidad: solo dígitos */}
                        <Text style={styles.label}>Documento de identidad</Text>
                        <TextInput
                            placeholder="Sólo dígitos"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            keyboardType="numeric"
                            value={documento}
                            onChangeText={text => setDocumento(text.replace(/[^0-9]/g, ''))}
                        />

                        {/* Carnet institucional */}
                        <Text style={styles.label}>Carnet institucional (Opcional)</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleSelectCarnet}>
                            <Text style={{ color: carnetFile ? '#000' : '#aaa' }}>
                                {carnetFile ? carnetFile.name : 'Selecciona un archivo PDF'}
                            </Text>
                        </TouchableOpacity>

                        {/* Registro académico */}
                        <Text style={styles.label}>Registro académico (Opcional)</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleSelectRegistro}>
                            <Text style={{ color: registroFile ? '#000' : '#aaa' }}>
                                {registroFile ? registroFile.name : 'Selecciona un archivo PDF'}
                            </Text>
                        </TouchableOpacity>

                        <RoundedButton
                            title="Siguiente"
                            onPress={() =>
                                navigation.navigate('AsignacionContraseña', {
                                    carnetFile,
                                    registroFile,
                                })
                            }
                        />
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
    label: { fontWeight: '600', marginTop: 12, marginBottom: 6 },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    uploadBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginBottom: 10,
        justifyContent: 'center',
    },
    version: { alignSelf: 'center', color: '#666', marginBottom: 8 },
});
