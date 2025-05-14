import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BotonProps {
  texto: string;
  onPress: () => void;
}

const BotonIniAbajo: React.FC<BotonProps> = ({ texto, onPress }) => {
  return (
    <TouchableOpacity style={styles.boton} onPress={onPress}>
      <Text style={styles.textoBoton}>{texto}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  boton: {
    backgroundColor: '#ffffff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  textoBoton: {
    color: '#4A0000',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default BotonIniAbajo;