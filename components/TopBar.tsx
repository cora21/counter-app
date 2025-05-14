import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const vinotinto = '#5A0000';
const vinotintoClaro = '#8B0000'; // color al presionar

const TopBar: React.FC = () => {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: vinotinto }]}>
      <View style={styles.container}>
        {/* Texto "Inicio" debe estar dentro de un componente <Text> */}
        <Text style={styles.title}>Inicio</Text>
        
        {/* Espacio vacío para mover el ícono hacia la derecha */}
        <View style={{ flex: 1 }} />

        {/* Icono de usuario */}
        <Pressable
          onPress={() => {}}
          style={({ pressed }) => ({
            opacity: pressed ? 0.8 : 1,
          })}
        >
          {({ pressed }) => (
            <Icon
              name="user-circle"
              size={30}
              color={pressed ? vinotintoClaro : '#ffffff'}
            />
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: vinotinto,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#8B0000',
    elevation: 8,

    // Sombra para iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  title: {
    fontSize: 20, // Tamaño de la fuente
    color: '#fff', // Blanco
    fontWeight: 'bold', // Para que se vea fuerte
  },
});

export default TopBar;
