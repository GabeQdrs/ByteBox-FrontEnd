import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CurrencyContext from '../contexts/CurrencyContext';

SplashScreen.preventAutoHideAsync();

const OrderItem = ({ item }) => {
  const navigation = useNavigation();
  const {currency} = useContext(CurrencyContext);
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
  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  let coin;
    if (currency === 'USD') {
      coin = 'US$ '
    } else if (currency === 'EUR') {
      coin = '€ '
    } else {
      coin = 'R$ '
    }

  return (
    <TouchableOpacity style={styles.container} 
      onPress={() => navigation.navigate("OrderDetailScreen", {order: item, currency})}
    >
      <Text style={styles.orderId}>Pedido #{item.id}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.text}>Data: {formatDate(item.orderDate)}</Text>
        <Text style={styles.text}>Itens: {item.items ? item.items.length : 0}</Text>
        <Text style={styles.price}>Total: {coin}{item.totalConvertedPrice.toFixed(2)}</Text>
      </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  infoContainer: {
    borderTopWidth: 1,
    borderTopColor: '#2b3e50',
    paddingVertical: 5,
  },
  orderId: {
    color: '#2b3e50',
    fontFamily: 'Lora_700Bold',
    fontSize: 24,
    padding: 5,
  },
  text: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 16,
    color: '#2b3e50'
  },
  price: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    color: '#2b3e50'
  }
});

export default OrderItem;