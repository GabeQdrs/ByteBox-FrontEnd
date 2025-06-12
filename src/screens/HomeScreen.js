import React, { useEffect, useState } from 'react';
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity,Dimensions, FlatList, ActivityIndicator} from 'react-native';
import ProductCard from '../components/ProductCard';
import SurpriseBox from '../components/SurpriseBox';
import CustomHeader from '../components/CustomHeader';
import axios from 'axios';

const { width } = Dimensions.get('window');

export default function App({ navigation}) {
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fecthProducts() {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://10.1.204.62:8765/products"
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fecthProducts();
    // console.log(products);
  }, []);

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
                product: {...item, id:item}
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
