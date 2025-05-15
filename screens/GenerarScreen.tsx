import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { MaterialIcons } from '@expo/vector-icons';
import TopBar from '../components/TopBar';
import BottomTabBar from '../components/BottomTabBar';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width * 0.28;

const CATEGORIES = ['Camisas', 'Sobretodo', 'Suéteres', 'Chalecos', 'Pantalones', 'Zapatos'];

export default function GenerarScreen() {
  const [categoryImages, setCategoryImages] = useState<{ category: string; images: string[] }[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<{ [key: string]: string }>({});
  const scrollXRefs = useRef<{ [key: string]: Animated.Value }>({});
  const flatListRefs = useRef<{ [key: string]: any }>({});

  useEffect(() => {
    loadAllCategories();
    CATEGORIES.forEach(category => {
      scrollXRefs.current[category] = new Animated.Value(0);
    });
  }, []);

  const loadAllCategories = async () => {
    const results: { category: string; images: string[] }[] = [];

    for (const category of CATEGORIES) {
      const dir = `${FileSystem.documentDirectory}ropa/${category}/`;
      const dirInfo = await FileSystem.getInfoAsync(dir);
      if (dirInfo.exists) {
        const files = await FileSystem.readDirectoryAsync(dir);
        const uris = files.map((file) => `${dir}${file}`);
        if (uris.length > 0) {
          results.push({ category, images: uris });
        }
      }
    }
    setCategoryImages(results);
  };

  const generateRandomOutfit = () => {
    const newOutfit: { [key: string]: string } = {};
    
    categoryImages.forEach(({ category, images }) => {
      if (images.length > 0) {
        const randomIndex = Math.floor(Math.random() * images.length);
        newOutfit[category] = images[randomIndex];
        
        if (flatListRefs.current[category]) {
          const targetOffset = randomIndex * ITEM_WIDTH;
          flatListRefs.current[category].scrollToOffset({
            offset: targetOffset,
            animated: true,
          });
        }
      }
    });
    
    setSelectedOutfit(newOutfit);
  };

  const renderCarousel = (images: string[], category: string) => {
    scrollXRefs.current[category] = scrollXRefs.current[category] || new Animated.Value(0);
    const scaleHeight = getImageHeight(categoryImages.length);

    return (
      <Animated.FlatList
        ref={ref => flatListRefs.current[category] = ref}
        data={images}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollXRefs.current[category] } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ITEM_WIDTH,
            index * ITEM_WIDTH,
            (index + 1) * ITEM_WIDTH,
          ];

          const scale = scrollXRefs.current[category].interpolate({
            inputRange,
            outputRange: [0.9, 1, 0.9],
            extrapolate: 'clamp',
          });

          const isSelected = selectedOutfit[category] === item;

          return (
            <View style={{ width: ITEM_WIDTH, alignItems: 'center', padding: 4 }}>
              <Animated.View
                style={[
                  styles.imageWrapper,
                  { 
                    height: scaleHeight, 
                    transform: [{ scale }],
                    borderWidth: isSelected ? 2 : 0,
                    borderColor: isSelected ? '#4A0000' : 'transparent',
                  },
                ]}
              >
                <Image source={{ uri: item }} style={styles.image} />
              </Animated.View>
            </View>
          );
        }}
      />
    );
  };

  const getImageHeight = (count: number) => {
    if (count >= 5) return 70;
    if (count >= 3) return 90;
    return 110;
  };

  return (
    <View style={styles.mainContainer}>
      <TopBar title="Generar Outfit ✨" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Crea tu outfit perfecto</Text>

        {categoryImages.map(({ category, images }) => (
          <View key={category} style={styles.carouselBlock}>
            <Text style={styles.carouselTitle}>{category}</Text>
            {renderCarousel(images, category)}
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab} 
        onPress={generateRandomOutfit}
        activeOpacity={0.8}
      >
        <MaterialIcons name="autorenew" size={32} color="#fff" />
      </TouchableOpacity>

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
    paddingBottom: 70,
    paddingTop: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A0000',
    textAlign: 'center',
    marginBottom: 5,
  },
  carouselBlock: {
    marginBottom: 8,
    alignItems: 'center',
  },
  carouselTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4A0000',
    textAlign: 'center',
    marginBottom: 6,
    width: '100%',
  },
  imageWrapper: {
    borderRadius: 5,
    overflow: 'hidden',
    elevation: 2,
    backgroundColor: '#eee',
    width: '90%',
    marginVertical: 2,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  fab: {
    position: 'absolute',
    bottom: 100,
    right: 25,
    backgroundColor: '#750202FF',
    width: 100,
    height: 70,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 10,
  },
});