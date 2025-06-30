import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import OrderDetailItem from '../components/OrderDetailItem';
import CustomHeader from '../components/CustomHeader';
import { Ionicons } from '@expo/vector-icons';
import CurrencyContext from '../contexts/CurrencyContext';
import OrderConfiHeader from '../components/OrderConfiHeader';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function OrderDetailScreen() {
    const route = useRoute();
    const {order, currency} = route.params;
    const navigation = useNavigation();
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

 
    const renderItem = ({item}) => <OrderDetailItem item={item} coin={currency}/>

  let coin;
    if (currency === 'USD') {
      coin = 'US$ '
    } else if (currency === 'EUR') {
      coin = '€ '
    } else {
      coin = 'R$ '
    }

  return (
    <SafeAreaView style={styles.container}>
        <OrderConfiHeader/>
        <FlatList
          data={order.items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
        <View style={styles.totals}>
            <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#ECF0F1" />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.totalConvertedText}>
                Total: {coin}{order.totalConvertedPrice.toFixed(2)}
                </Text>
            </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1'
    },
    totals: {
        backgroundColor: '#2b3e50',
        height: '13%',
        paddingHorizontal: 25,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalConvertedText: {
        fontFamily: 'Lora_700Bold',
        fontSize: 24,
        color: "#ECF0F1",
        textAlign:'right',
    },
})