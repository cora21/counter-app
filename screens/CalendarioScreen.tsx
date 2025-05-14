import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabBar from '../components/BottomTabBar'; // Asegúrate de que la ruta sea correcta
import TopBar from '../components/TopBar';

export default function DashboardScreen() {
  return (
    <View style={styles.mainContainer}>
      <TopBar title="Calendario" />
      {/* Contenido principal */}
      <View style={styles.content}>
        <Text style={styles.title}>¡Bienvenida al Calendario!</Text>
        <Text style={styles.subtitle}>Magic</Text>
      </View>

      {/* Usamos el componente reutilizable */}
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#8B3A3A',
    textAlign: 'center',
  },
});