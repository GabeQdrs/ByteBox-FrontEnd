import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProductCard = ({ image, discount, title, subtitle }) => {
  return (
    <View style={styles.card}>
      <View style={styles.discountBadge}>
        <Text style={styles.discountText}>{discount}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    
    borderWidth: 1,
    borderColor: '#c3d6e6',
    borderRadius: 10,
    backgroundColor: '#e4f1fc',
    padding: 8,
    alignItems: 'center',
    marginRight: 12,
    maxWidth:300,
    maxHeight:210
  },
  image: {
    width: 100,
    height: 140,
    borderRadius: 6,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#e53935',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 1,
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
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
