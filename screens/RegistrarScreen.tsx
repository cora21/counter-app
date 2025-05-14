import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import TopBar from '../components/TopBar';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const clothingItems = [
{ label: 'Camisas', icon: 'tshirt-crew', type: 'material' },
  
  { label: 'Chalecos', icon: 'vest', type: 'awesome' },
  { label: 'Sobretodo', image: require('../assets/images/sobretoIcono.png'), type: 'image' },
  { label: 'Suéteres', image: require('../assets/images/suetericono.png'), type: 'image' },
  { label: 'Pantalones', image: require('../assets/images/PantalonesIcono.png'), type: 'image' },
  { label: 'Zapatos', icon: 'shoe-heel', type: 'material' },
];

export default function RegistrarScreen() {
  return (
    <View style={styles.mainContainer}>
      <TopBar />
      <View style={styles.content}>
        <Text style={styles.title}>Aquí puedes registrar tu ropa</Text>
        <Text style={styles.subtitle}>Puedes subir tus imágenes aquí</Text>

        <View style={styles.grid}>
          {clothingItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.box}>
              {item.type === 'image' ? (
                <Image source={item.image} style={styles.imageIcon} resizeMode="contain" />
              ) : item.type === 'material' ? (
                <MaterialCommunityIcons name={item.icon} size={40} color="#8B0000" />
              ) : (
                <FontAwesome5 name={item.icon} size={40} color="#8B0000" />
              )}
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8B3A3A',
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
  },
  box: {
    width: '48%',
    aspectRatio: 3 / 4,
    borderWidth: 1.5,
    borderColor: '#8B0000',
    borderRadius: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: '600',
    color: '#4A0000',
  },
  imageIcon: {
    width: 120,
    height: 120,
  },
});
