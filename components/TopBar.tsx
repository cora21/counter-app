import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar, Pressable, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

// Define el tipo de las props
interface TopBarProps {
  title: string;
}
const vinotinto = '#800000';
const vinotintoClaro = '#A52A2A';
// Asegúrate de usar React.FC<TopBarProps>
const TopBar: React.FC<TopBarProps> = ({ title }) => {
  

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: vinotinto }]}>
      <View style={styles.container}>
        {/* Usamos el título recibido como prop */}
        <Text style={styles.title}>{title}</Text>

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
    fontSize: 25, // Tamaño de la fuente
    color: '#fff', // Blanco
    //fontWeight: 'bold', // Para que se vea fuerte
  },
});

export default TopBar;
