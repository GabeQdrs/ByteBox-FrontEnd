import React, { useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CurrencyContext from '../contexts/CurrencyContext';

SplashScreen.preventAutoHideAsync();

const brazilFlag = require('../../assets/flags/brFlag.png');
const usaFlag = require('../../assets/flags/usFlag.png');
const germanyFlag = require('../../assets/flags/gerFlag.png');

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

    const getFlagSource = () => {
      if (currency === 'USD') {
        return usaFlag;
      } else if (currency === 'EUR') {
        return germanyFlag;
      }
      return brazilFlag; // padrão
    }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ByteBox</Text>
      <TouchableOpacity  onPress={changeCurrency}>
        <Image 
        style={styles.flag}
        source={getFlagSource()}
        />
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
  flag: {
    borderRadius: 10,
    width: 40,
    height: 30,
  }

});

export default CustomHeader;
