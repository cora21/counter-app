import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import BottomTabBar from './components/BottomTabBar';
import GenerarScreen from './screens/GenerarScreen';
import RegistrarScreen from './screens/RegistrarScreen';
import CalendarioScreen from './screens/CalendarioScreen';
import CategoriaFotosScreen from './screens/CategoriaFotosScreen';


// 1. Definimos y exportamos los tipos de navegación
export type RootStackParamList = {
  Welcome: undefined;
  Dashboard: undefined;
  Generar: undefined;
  Registrar: undefined;
  Calendario: undefined;
  CategoriaFotos: { category: string }; // <-- ¡Añade esto!
};

// 2. Creamos el stack navigator con los tipos aplicados
const Stack = createNativeStackNavigator<RootStackParamList>();


// 3. Configuramos las rutas de navegación
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }} // Ocultar barra superior
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Generar" component={GenerarScreen} />
        <Stack.Screen name="Registrar" component={RegistrarScreen} />
        <Stack.Screen name="Calendario" component={CalendarioScreen} />
        <Stack.Screen name="CategoriaFotos" component={CategoriaFotosScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}