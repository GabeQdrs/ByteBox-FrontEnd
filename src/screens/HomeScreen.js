import React, { useContext, useEffect, useState } from 'react';
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity,Dimensions, FlatList, ActivityIndicator} from 'react-native';
import ProductCard from '../components/ProductCard';
import SurpriseBox from '../components/SurpriseBox';
import CustomHeader from '../components/CustomHeader';
import { getProducts } from '../services/ProductService';
import { useIsFocused } from '@react-navigation/native';
import CurrencyContext from '../contexts/CurrencyContext';


const { width } = Dimensions.get('window');

export default function App({ navigation}) {
  const { currency, changeCurrency } = useContext(CurrencyContext);
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts(currency);
      setProduct(data);
    } catch (error) {
      setError("Não foi possível carregar os produtos.")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  if (loading) { 
        return <ActivityIndicator size={"large"}/>
    }

  return (
    <View style={styles.wrapper}>
      <CustomHeader />

      <ScrollView style={styles.container}>

      <SurpriseBox />
     
      <Text style={styles.text}>BOXES TEMATICOS</Text>     
      <FlatList
        data={products}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <ProductCard
            product={item}
            onPress={() => 
              navigation.navigate('Produto', {
                product: item
              })
            }
          />
        )}
      />
      </ScrollView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  text:{
    color: '#2b3e50',
    fontSize: 16,
    fontFamily: 'Lora_600SemiBold',
    marginHorizontal: 15,
    marginTop: 13,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50',
    paddingBottom: 5,
 
  },
  container: {
    flex: 1,
  },
});
