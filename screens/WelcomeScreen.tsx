import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BotonIniAbajo from '../components/BotonIniAbajo';
import { useNavigation } from '@react-navigation/native';

// 1. Importa los tipos necesarios
import type { RootStackParamList } from '../App';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// 2. Define el tipo de navegación
type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen() {
  // 3. Tipa el hook con el tipo definido
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  return (
    <LinearGradient
      colors={['#4A0000', '#8B3A3A']}
      style={styles.container}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      {/* Contenedor para el logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/logoApp.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Contenedor para el texto */}
      <View style={styles.textContainer}>
        <Text style={styles.textInicio}>LiStyle</Text>
      </View>

      {/* Botón fijo en la parte inferior */}
      <View style={styles.botonContainer}>
        <BotonIniAbajo 
          texto="Bienvenida" 
          onPress={() => navigation.navigate('Dashboard')}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 80,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 300,
    height: 300,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
  },
  textInicio: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
  },
  botonContainer: {
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
});