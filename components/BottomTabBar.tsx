import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BackHandler, Platform } from 'react-native'; 
import { RootStackParamList } from '../App'; // Asegúrate de que esto apunte al archivo correcto

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BottomTabBar = () => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = (buttonName: string) => {
    switch (buttonName) {
      case 'Inicio':
        navigation.navigate('Dashboard');
        break;
      case 'Generar Outfit':
        navigation.navigate('Generar');
        break;
      case 'Salir':
        if (Platform.OS === 'android') {
          BackHandler.exitApp();
        } else {
          console.log('Cerrar la app no está permitido en iOS. Redirigiendo a Welcome.');
          navigation.navigate('Welcome'); // Fallback para iOS
        }
        break;
      case 'Registrar':
          navigation.navigate('Registrar');
          break;
      default:
        console.log(`Botón ${buttonName} presionado`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tabButton} onPress={() => handlePress('Inicio')}>
        <Icon name="home" size={24} color="white" />
        <Text style={styles.tabText}>Inicio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={() => handlePress('Generar Outfit')}>
        <Icon name="magic" size={24} color="white" />
        <Text style={styles.tabText}>Generar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={() => handlePress('Registrar')}>
        <Icon name="camera" size={24} color="white" />
        <Text style={styles.tabText}>Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabButton} onPress={() => handlePress('Salir')}>
        <Icon name="sign-out-alt" size={24} color="white" />
        <Text style={styles.tabText}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#5A0000',
    borderTopWidth: 2,
    borderTopColor: '#8B0000',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 8,
    marginBottom: 10,
  },
  tabText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 6,
  },
});

export default BottomTabBar;
