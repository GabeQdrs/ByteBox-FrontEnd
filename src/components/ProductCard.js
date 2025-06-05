import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';

const ProductCard = ({ image, discount, title, subtitle }) => {
  return (
    
    
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  card: {
    margin:10,
    borderWidth: 1,
    borderColor: '#c3d6e6',
    borderRadius: 10,
    backgroundColor: '#e4f1fc',
    padding: 8,
    alignItems: 'center',
    marginLeft:10,
    maxWidth:300,
    maxHeight:210
    
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 8,
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});

export default ProductCard;
