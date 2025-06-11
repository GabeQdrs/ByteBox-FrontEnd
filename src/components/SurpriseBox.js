import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const SurpriseBox = () => {
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
    fontFamily: 'Lora_600SemiBold',
    fontSize: 24,
    color: '#2b3e50',
    borderLeftWidth: 1,
    borderLeftColor: '#2b3e50',
    paddingHorizontal: 5,
  },
  subtitle: {
    fontFamily: 'Lora_400Regular',
    fontSize: 13,
    color: '#2b3e50',
  },
});

export default SurpriseBox;
