import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import TopBar from '../components/TopBar';

export default function GenerarScreen() {
  return (
    <View style={styles.mainContainer}>
      <TopBar title="Generar Outfit ✨" />
      <View style={styles.content}>
        <Text style={styles.title}>Aquí se generará tu outfit 👗👚</Text>
        <Text style={styles.subtitle}>Selecciona tus preferencias y ¡voilà!</Text>
      </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B3A3A',
    textAlign: 'center',
  },
});
