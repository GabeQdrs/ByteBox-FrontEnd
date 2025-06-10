import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';

const SurpriseBox = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image
        source={{ uri: 'https://placehold.co/439x251/png' }} 
        style={styles.image}
        resizeMode="cover"
      />
      < View style={styles.bottomContent}>
          <Text style={styles.title}>BOX SURPRESA!</Text>
          <Text style={styles.subtitle}>O que sera que tem aqui?</Text>
       </View >
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // overflow: 'hidden',
    // backgroundColor: '#fff',
    // elevation: 3, // para Android
    // shadowColor: '#000', // para iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
  },
  image: {
    flex: 1,
    height: 250,
  },
  bottomContent: {
    height: 72,
    backgroundColor: '#A9CCE3',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 15,
    
  },
  title: {
    fontSize: 24,
    color: '#2b3e50',
    borderLeftWidth: 1,
    borderLeftColor: '#2b3e50',
    paddingHorizontal: 5,
  },
  subtitle: {
    fontSize: 13,
    color: '#2b3e50',
  },
});

export default SurpriseBox;
