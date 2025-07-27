import React, { useState, useEffect, useCallback } from 'react';
import {
    ImageBackground,
    View,
    Text,
    TextInput,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import RoundedButton from '../components/RoundedButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterUserScreen({ navigation }) {
    // Estados para dropdown
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Universidad Nacional', value: 'u1' },
        { label: 'Univer. de Los Andes', value: 'u2' },
        { label: 'Pontificia Javeriana', value: 'u3' },
        { label: 'Universidad del Valle', value: 'u4' },
        // añade más…
    ]);

    const [name, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [code, setCode] = useState('');

    // Para que el dropdown renderice bien sobre teclado
    const zIndexValue = Platform.OS === 'android' ? undefined : 5000;

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
                            Selecciona la institución a la cual te vas a registrar
                        </Text>

                        <View style={[styles.dropdownContainer, { zIndex: zIndexValue }]}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                placeholder="-- Selecciona institución --"
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropDownContainer}
                            />
                        </View>

                        <Text style={styles.label}>Nombre</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Apellidos</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={apellido}
                            onChangeText={setApellido}
                        />

                        <Text style={styles.label}>
                            Correo Electrónico Institucional (Opcional)
                        </Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={correo}
                            onChangeText={setCorreo}
                        />

                        <Text style={styles.label}>Código de estudiante (Opcional)</Text>
                        <TextInput
                            placeholder="PlaceHolder"
                            placeholderTextColor="#aaa"
                            style={styles.input}
                            value={code}
                            onChangeText={setCode}
                        />

                        <RoundedButton
                            title="Siguiente"
                            onPress={() => navigation.navigate('Usuario2', { institution: value })}
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

    dropdownContainer: {
        marginBottom: 10,
    },
    dropdown: {
        borderColor: '#ddd',
    },
    dropDownContainer: {
        borderColor: '#ddd',
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 10,
    },
    version: { alignSelf: 'center', color: '#666', marginBottom: 8 },
});
