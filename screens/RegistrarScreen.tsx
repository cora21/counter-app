import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'; // Ajusta la ruta según tu estructura
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import BottomTabBar from '../components/BottomTabBar';
import TopBar from '../components/TopBar';

const clothingItems = [
  { label: 'Camisas', image: require('../assets/images/CamisaIcono.png'), type: 'image' },
  { label: 'Sobretodo', image: require('../assets/images/sobretoIcono.png'), type: 'image' },
  { label: 'Chalecos', image: require('../assets/images/ChalecoIcono.png'), type: 'image' },
  { label: 'Suéteres', image: require('../assets/images/sueterIcono.png'), type: 'image' },
  { label: 'Pantalones', image: require('../assets/images/PantalonesIcono.png'), type: 'image' },
  { label: 'Zapatos', image: require('../assets/images/TaconIcono.png'), type: 'image' },
];

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Registrar'>;

export default function RegistrarScreen() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View style={styles.mainContainer}>
      <TopBar title="Registrar Ropa 📷" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Aquí puedes registrar tu ropa</Text>

          <View style={styles.grid}>
            {clothingItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.box}
                onPress={() => navigation.navigate('CategoriaFotos', { category: item.label })}
              >
                <Image source={item.image} style={styles.imageIcon} resizeMode="contain" />
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
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
