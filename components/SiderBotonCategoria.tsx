import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Props {
  visible: boolean;
  onClose: () => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
}

const CATEGORIES = ['Camisas', 'Sobretodo', 'Suéteres', 'Chalecos', 'Pantalones', 'Zapatos'];

export default function SiderBotonCategoria({
  visible,
  onClose,
  selectedCategories,
  toggleCategory,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          <View style={styles.header}>
            <Text style={styles.title}>Filtrar Categorías</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#4A0000" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {CATEGORIES.map((category) => {
              const selected = selectedCategories.includes(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selected && styles.categoryButtonSelected,
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categoryTextSelected,
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sidebar: {
    width: width * 0.65,
    backgroundColor: '#fff',
    height: '100%',
    paddingTop: 40,
    paddingHorizontal: 15,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#4A0000',
  },
  content: {
    paddingBottom: 30,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 70,
    backgroundColor: '#eee',
    borderRadius: 24,
    marginBottom: 10,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  categoryButtonSelected: {
    backgroundColor: '#750202FF',
  },
  categoryText: {
    color: '#000',
    fontWeight: '600',
  },
  categoryTextSelected: {
    color: '#fff',
  },
});
