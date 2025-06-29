import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useFavorites } from '../contexts/FavoritesContext';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CurrencyContext from '../contexts/CurrencyContext';

SplashScreen.preventAutoHideAsync();

const FavoriteItem = ({ item }) => {
  const { isFavorite, toggleFavorite, removeFavorite } = useFavorites();
  const {currency} = useContext(CurrencyContext);
  

  const favorited = isFavorite(item.id);

  const [loaded, error] = useFonts({
      Lora_400Regular,
      Lora_600SemiBold,
      Lora_700Bold
    });
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return null;
    }

  const handleToggleFavorite = () => {
    if (favorited) {
      removeFavorite(item.id);
    } else {
      	toggleFavorite(item);
    }
  };

  let coin;
  if (currency === 'USD') {
    coin = 'US$ ';
  } else if (currency === 'EUR') {
    coin = '€ ';
  } else {
    coin = 'R$ ';
  };

  return (
    <View style={styles.productCard}>
      {/* IMAGEM */}
      <Image source={{uri: item.imageUrl}} style={styles.productImage} />

      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.theme}</Text>
        <Text style={styles.productSubtitle}>Livros incluso: {item.quantity}</Text>
        <Text style={styles.productPrice}>{coin}{item.convertedPrice.toFixed(2)}</Text>
      </View>

      {/* CORAÇÃO */}
      <TouchableOpacity onPress={handleToggleFavorite} style={styles.heartContainer}>
        <Icon
          name={favorited ? 'heart' : 'heart-o'}
          size={30}
          color={favorited ? 'red' : 'gray'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50',
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
    marginBottom: 10,
  },
  productTitle: {
    color: '#2b3e50',
    fontFamily: 'Lora_700Bold',
    fontSize: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50',
  },
  productSubtitle: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 15,
    color: '#2b3e50',
    marginTop: 5,
  },
  productPrice: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    marginTop: 80,
  },
  productImage: {
    width: "35%",
    height: 150,
    borderRadius: 8,
    
  },
  heartContainer: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,

  },
});

export default FavoriteItem;
