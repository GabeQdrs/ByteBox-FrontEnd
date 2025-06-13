import { View, Text, StyleSheet } from 'react-native'
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

const ProductHeader = ({ product }) => {
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
      <View>
      <Text style={styles.title}>{product.theme}</Text>
      <Text style={styles.quantity}>Livros incluso: {product.quantity}</Text>
      </View>
      <Text style={styles.price}>{product.price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#2b3e50',
      paddingVertical: 20,
      paddingHorizontal: 15,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      color: '#ECF0F1',
      fontFamily: 'Lora_700Bold',
      fontSize: 24,
      borderLeftColor: '#ECF0F1',
      borderLeftWidth: 1,
      paddingLeft: 6,
    },
    quantity: {
      color: '#ECF0F1',
      fontFamily: 'Lora_600SemiBold',
      fontSize: 16,
    },
    price: {
      color: '#2b3e50',
      fontFamily: 'Lora_700Bold',
      fontSize: 24,
      backgroundColor: '#ECF0F1',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 11,
      borderColor: '#A9CCE3',
      borderWidth: 4,
    },
})

export default ProductHeader