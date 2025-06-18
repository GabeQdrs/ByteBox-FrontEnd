import React, { useContext, useEffect } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity, ImageBackground} from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CurrencyContext from '../contexts/CurrencyContext';


SplashScreen.preventAutoHideAsync();

const ProductCard = ({ product, onPress }) => {
  const {currency} = useContext(CurrencyContext)
  const [loaded, error] = useFonts ({
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

    let coin;
      if (currency === 'USD') {
        coin = 'US$ '
      } else if (currency === 'EUR') {
        coin = '€ '
      } else {
        coin = 'R$ '
      }
    

  return (
    
    
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: "https://placehold.co/140x190/png"}} style={styles.image} />
      <Text style={styles.title}>{product.theme}</Text>
      <Text style={styles.price}>{coin}{product.convertedPrice.toFixed(2)}</Text>

    </TouchableOpacity >
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#A9CCE3',
    width: 160,
    height: 250,
    marginHorizontal: 10,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 7,
  },
  image: {
    flex: 1,
    width:140,
    height:190,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 18,

  },
  title: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    textAlign: 'center',
    marginHorizontal: 5,
    marginTop: 5,
    fontSize: 14
    
  },
  price: {
    color: '#2b3e50',
    fontFamily: 'Lora_400Regular',
    textAlign: 'right',
    marginBottom: 2,
  },
});

export default ProductCard;
