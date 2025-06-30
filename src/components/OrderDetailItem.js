import { View, Text, StyleSheet, Image } from 'react-native'
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import CurrencyContext from '../contexts/CurrencyContext';

SplashScreen.preventAutoHideAsync();

const OrderDetailItem = ({ item, coin }) => {
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

    if (currency === 'USD') {
      coin = 'US$ '
    } else if (currency === 'EUR') {
      coin = '€ '
    } else {
      coin = 'R$ '
    }


  return (
    <View style={styles.container}>
       <View  style={{ flexDirection: 'row'}}>
            <Image
            source={{uri :item.product.imageUrl}}
            style={styles.image}
            />
    
            <View style={{marginLeft: 10, justifyContent: 'space-between', flex: 1,}}>
                <View>
                    <Text style={styles.title}>{item.product.theme}</Text>
                    <Text style={styles.text}>Livros incluso: {item.product.quantity}</Text>
                </View>
                
                <Text style={styles.price}>{coin}{item.convertedPriceAtPruchase.toFixed(2)}</Text>
            </View>
       </View>
       

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: '#2b3e50',
        marginBottom: 10,
        marginHorizontal: 15,
        paddingVertical: 10,

    },
    image: {
        width: "30%",
        height: 120,
        borderRadius: 8,
        resizeMode: "cover",
        marginLeft: 10,
    },
    title: {
        fontFamily: 'Lora_700Bold',
        fontSize: 20,
        color: '#2b3e50',
    },
    text: {
        fontFamily: 'Lora_600SemiBold',
        fontSize: 16,
        color: '#2b3e50'
    },
    price: {
        fontFamily: 'Lora_600SemiBold',
        fontSize: 20,
        color: '#2b3e50',
        flex: 1,
        textAlign: 'right',
        textAlignVertical: 'bottom'
    }
})

export default OrderDetailItem