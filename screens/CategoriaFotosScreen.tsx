import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';

type RootStackParamList = {
  CategoriaFotos: { category: string };
};

type CategoriaFotosRouteProp = RouteProp<RootStackParamList, 'CategoriaFotos'>;

export default function CategoriaFotosScreen() {
  const route = useRoute<CategoriaFotosRouteProp>();
  const navigation = useNavigation();
  const { category } = route.params;

  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    loadPhotos();
  }, []);

  const getCategoryDir = () =>
    `${FileSystem.documentDirectory}ropa/${category}/`;

  const loadPhotos = async () => {
    try {
      const dir = getCategoryDir();

      const dirInfo = await FileSystem.getInfoAsync(dir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      }

      const files = await FileSystem.readDirectoryAsync(dir);
      const uris = files.map(file => `${dir}${file}`);
      setPhotos(uris);
    } catch (error) {
      console.error('Error cargando fotos:', error);
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para usar la cámara.');
      return;
    }
  
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
  
      if (result.canceled) return;
  
      const uri = result.assets[0].uri;
      if (uri) {
        const filename = `photo_${Date.now()}.jpg`;
        const dest = `${getCategoryDir()}${filename}`;
        await FileSystem.copyAsync({ from: uri, to: dest });
        loadPhotos();
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo tomar la foto.');
    }
  };
  

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => {
        setSelectedImage(item);
        setShowModal(true);
      }}
      style={styles.imageWrapper} // 👈 aquí está el cambio clave
    >
      <Image source={{ uri: item }} style={styles.image} />
    </TouchableOpacity>
  );
  
  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back" size={28} color="#4A0000" />
      </TouchableOpacity>

      <Text style={styles.title}>Fotos de {category}</Text>

      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
        {selectedImage && (
        <View style={styles.modalContainer} pointerEvents={showModal ? 'auto' : 'none'}>
            {showModal && (
            <View style={styles.modalContent}>
                <Image source={{ uri: selectedImage }} style={styles.modalImage} resizeMode="contain" />
                <View style={styles.modalButtons}>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={async () => {
                    await FileSystem.deleteAsync(selectedImage);
                    setShowModal(false);
                    setSelectedImage(null);
                    loadPhotos();
                    }}
                >
                    <Text style={styles.buttonText}>🗑 Eliminar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => {
                    setShowModal(false);
                    setSelectedImage(null);
                    }}
                >
                <Text style={styles.buttonText}>✖ Cerrar</Text>
                </TouchableOpacity>
                </View>
            </View>
            )}
        </View>
        )}

      <TouchableOpacity style={styles.fab} onPress={takePhoto}>
        <Icon name="add-a-photo" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 65,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A0000',
    marginBottom: 20,
  },
  grid: {
    paddingHorizontal: 8,
  },
  imageWrapper: {
    width: '32.5%',
    margin: '0.75%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#eee',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: 50,
    right: 35,
    backgroundColor: '#8B0000',
    width: 90,
    height: 90,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 15,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    width: '90%',
    height: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
  deleteButton: {
    backgroundColor: '#B22222',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 10,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },  
});
