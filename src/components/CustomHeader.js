import React, { useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CurrencyContext from '../contexts/CurrencyContext';

SplashScreen.preventAutoHideAsync();

const brazilFlag = require('../../assets/brFlag.png');
const usaFlag = require('../../assets/usFlag.png');

const CustomHeader = () => {
  const { currency, changeCurrency } = useContext(CurrencyContext);

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

    let currencyText; 
    const getCurrencyText = () => {
      if (currency === 'usa')
        currencyText = 'US$'
      else if (currency === 'brl')
        currencyText = 'R$'
    }
    getCurrencyText();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ByteBox</Text>
      <TouchableOpacity style={styles.flagButton} onPress={changeCurrency}>
        <Image 
        style={styles.flag}
        source={currency === 'usa' ? usaFlag : brazilFlag}
        />
        {/* <Text style={styles.currencyText}>{currencyText}</Text> */}
      </TouchableOpacity>
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
  // flagButton: {
  //   backgroundColor: '#ECF0F1',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   borderRadius: 15,
  //   width: 70,
  //   alignItems: 'center',
  // },
  // currencyText: {
  //   fontFamily: 'Lora_600SemiBold',
  //   fontSize: 13,
  //   marginRight: 5,
  // },
  flag: {
    borderRadius: 10,
  }

});

export default CustomHeader;
