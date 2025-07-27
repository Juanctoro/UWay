import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import ResetPasswordScreen from './screens/ResetPasswordScreen';
import EmailSentScreen from './screens/EmailSentScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import InicioScreen from './screens/InicioScreen';
import CuentaScreen from './screens/CuentaScreen';
import ScanQrScreen from './screens/ScanQrScreen';
import HistorialScreen from './screens/HistorialScreen';
import ViajesDisponiblesScreen from './screens/ViajesDisponiblesScreen';
import RealizarViajeScreen from './screens/RealizarViajeScreen';
import QuienEresScreen from './screens/QuienEresScreen';
import Usuario1Screen from './screens/Usuario1Screen';
import Usuario2Screen from './screens/Usuario2Screen';
import Institucion1Screen from './screens/Institucion1Screen';
import Institucion2Screen from './screens/Institucion2Screen';
import AsignacionContrasenaScreen from './screens/AsignacionContrasenaScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" translucent />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="EmailSent" component={EmailSentScreen} />
        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Cuenta" component={CuentaScreen} />
        <Stack.Screen name="ScanQr" component={ScanQrScreen} />
        <Stack.Screen name="Historial" component={HistorialScreen} />
        <Stack.Screen name="ViajesDisponibles" component={ViajesDisponiblesScreen} />
        <Stack.Screen name="RealizarViaje" component={RealizarViajeScreen} />
        <Stack.Screen name="QuienEres" component={QuienEresScreen} />
        <Stack.Screen name="Usuario1" component={Usuario1Screen} />
        <Stack.Screen name="Usuario2" component={Usuario2Screen} />
        <Stack.Screen name="Institucion1" component={Institucion1Screen} />
        <Stack.Screen name="Institucion2" component={Institucion2Screen} />
        <Stack.Screen name="AsignacionContraseña" component={AsignacionContrasenaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
