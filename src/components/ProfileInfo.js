import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../contexts/AuthContext';

SplashScreen.preventAutoHideAsync();

const optionsIcon = require('../../assets/icons/options.png');

const ProfileInfo = () => {
  const {user, logout} = useAuth();

    const [loaded, error] = useFonts ({
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
        <View style={styles.textContainer}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.signature}>Sem assinatura</Text>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2b3e50',
        height: 100,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 25,
        flexDirection: 'row',

    },
    textContainer: {
        flex: 1,
        marginRight: 30,
    },
    name: {
        color: '#ECF0F1',
        fontFamily: 'Lora_600SemiBold',
        fontSize: 20,
        marginBottom: 5,
    },
    signature: {
        backgroundColor: '#A9CCE3',
        color: '#2b3e50',
        fontFamily: 'Lora_700Bold',
        fontSize: 12,
        textAlign: 'center',
        borderRadius: 20,
        width: '40%',
        paddingVertical: 2,
    },
    button: {
      backgroundColor: '#FB4B4B',
      paddingHorizontal: 15,
      paddingVertical: 7,
      borderRadius: 8,
    },
    buttonText: {
      fontFamily: 'Lora_700Bold',
      color: '#ECF0F1',
    }
})

export default ProfileInfo