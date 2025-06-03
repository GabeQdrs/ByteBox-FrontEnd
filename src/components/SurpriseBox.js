import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SurpriseBox = () => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://via.placeholder.com/400x220' }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.bottomContent}>
        <View>
          <Text style={styles.title}>| Box Surpresa</Text>
          <Text style={styles.subtitle}>O que sera que tem aqui??</Text>
        </View>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>-30%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 16,
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
  discountTag: {
    backgroundColor: '#e53935',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SurpriseBox;
