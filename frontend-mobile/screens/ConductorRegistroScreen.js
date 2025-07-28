import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform, TouchableOpacity, Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RoundedButton from '../components/RoundedButton';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function registerConductor({ navigation }) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Viaje intermunicipal', value: 'u1' },
        { label: 'Viaje metropolitano', value: 'u2' },
        { label: 'Viaje al interior del campus', value: 'u3' },
    ]);

    const [LicenciaFile, setLicenciaFile] = useState('');
    const [propFile, setpropFile] = useState('');
    const [soatFile, setsoatFile] = useState('');
    const [tecnoFile, settecnoFile] = useState('');

    const zIndexValue = Platform.OS === 'android' ? undefined : 5000;

    const handleSelectLicencia = async () => {
        console.log('📁 Abrir picker Licencia');
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            console.log('📁 Resultado Licencia:', res);
            if (res.type === 'success') {
                setLicenciaFile(res);
            }
        } catch (err) {
            console.error('🔴 Error Licencia:', err);
            Alert.alert('Error', 'No se pudo seleccionar el licencia.');
        }
    };

    const handleSelectprop = async () => {
        console.log('📁 Abrir picker Propiedad');
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            console.log('📁 Resultado propiedad:', res);
            if (res.type === 'success') {
                setpropFile(res);
            }
        } catch (err) {
            console.error('🔴 Error propiedad:', err);
            Alert.alert('Error', 'No se pudo seleccionar el propiedad.');
        }
    };

    const handleSelectsoat = async () => {
        console.log('📁 Abrir picker soat');
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            console.log('📁 Resultado soat:', res);
            if (res.type === 'success') {
                setsoatFile(res);
            }
        } catch (err) {
            console.error('🔴 Error soat:', err);
            Alert.alert('Error', 'No se pudo seleccionar el soat.');
        }
    };

    const handleSelecttecno = async () => {
        console.log('📁 Abrir picker tecnomecanica');
        try {
            const res = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
                copyToCacheDirectory: false,
            });
            console.log('📁 Resultado tecnicomecanica:', res);
            if (res.type === 'success') {
                settecnoFile(res);
            }
        } catch (err) {
            console.error('🔴 Error tecnicomecanica:', err);
            Alert.alert('Error', 'No se pudo seleccionar el tecnicomecanica.');
        }
    };

    const handleChange = () => {
        alert('Se ha generado una solicitud de registro a la institucion que pertenece');
        navigation.navigate('Welcome');
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

                        <Text style={styles.label}>
                            Tipo de viaje que realizara:
                        </Text>

                        <View style={[styles.dropdownContainer, { zIndex: zIndexValue }]}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="-- Selecciona el tipo de viaje --"
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropDownContainer}
                            />
                        </View>


                        <Text style={styles.label}>Licencia de conduccion</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleSelectLicencia}>
                            <Text style={{ color: LicenciaFile ? '#000' : '#aaa' }}>
                                {LicenciaFile ? LicenciaFile.name : 'Selecciona un archivo PDF'}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Tarjeta de propiedad del vehiculo</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleSelectprop}>
                            <Text style={{ color: propFile ? '#000' : '#aaa' }}>
                                {propFile ? propFile.name : 'Selecciona un archivo PDF'}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Seguro Obligatorio de Accidentes de Transito (SOAT)</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleSelectsoat}>
                            <Text style={{ color: soatFile ? '#000' : '#aaa' }}>
                                {soatFile ? soatFile.name : 'Selecciona un archivo PDF'}
                            </Text>
                        </TouchableOpacity>

                        <Text style={styles.label}>Revision tecnicomecanica</Text>
                        <TouchableOpacity style={styles.uploadBox} onPress={handleSelecttecno}>
                            <Text style={{ color: tecnoFile ? '#000' : '#aaa' }}>
                                {tecnoFile ? tecnoFile.name : 'Selecciona un archivo PDF'}
                            </Text>
                        </TouchableOpacity>

                        <RoundedButton title="Terminar registro" onPress={handleChange} />
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