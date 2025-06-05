import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

const SurpriseBox = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://m.media-amazon.com/images/I/51qW7mL9stL._AC_UF1000,1000_QL80_.jpg' }} 
        style={styles.image}
        resizeMode="cover"
      />
      < TouchableOpacity style={styles.bottomContent}>
        <View>
          <Text style={styles.title}>TESTE</Text>
          <Text style={styles.subtitle}>TESTE</Text>
        </View>
       </TouchableOpacity >
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
    overflow: 'hidden',
    
    backgroundColor: '#fff',
    elevation: 3, // para Android
    shadowColor: '#000', // para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  bottomContent: {
    backgroundColor: '#c6e2f8',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 13,
    color: '#333',
  },
});

export default SurpriseBox;
