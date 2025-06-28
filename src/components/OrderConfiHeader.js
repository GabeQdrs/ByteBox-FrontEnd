import React, { useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CurrencyContext from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';

SplashScreen.preventAutoHideAsync();


const OrderConfiHeader = () => {
  const { currency, changeCurrency } = useContext(CurrencyContext);
  const {logout} = useAuth();

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

    

  return (
    <View style={styles.container}>
    
      <Text style={styles.text}>ByteBox</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C3E50',
    height: 100,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBlock: 17,
    paddingHorizontal: 25,
  },
  text: {
    color: '#ECF0F1',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 24,
  },
  flag: {
    borderRadius: 10,
    width: 40,
    height: 30,
  },
  logoutButtom: {
      backgroundColor: '#bf3f3f',
      paddingHorizontal: 15,
      paddingVertical: 6,
      borderRadius: 10,
  },
  logoutButtomText: {
    fontFamily: 'Lora_700Bold',
    color: '#ECF0F1'
  }

});

export default OrderConfiHeader;
