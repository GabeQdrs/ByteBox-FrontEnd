import React, { useCallback, useContext, useEffect, useState } from 'react';
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity,Dimensions, FlatList, ActivityIndicator} from 'react-native';
import ProductCard from '../components/ProductCard';
import SurpriseBox from '../components/SurpriseBox';
import CustomHeader from '../components/CustomHeader';
import { getProducts } from '../services/ProductService';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import CurrencyContext from '../contexts/CurrencyContext';
import { useAuth } from '../contexts/AuthContext';


export default function App({ navigation}) {
  const { currency, changeCurrency } = useContext(CurrencyContext);
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {token} = useAuth();
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageToLoad = 0, append = false) => {
    try {
      if (pageToLoad === 0 && !append) {
        setLoading(true);
      } else if (append) {
        setLoadingMore(true);
      }

      const data = await getProducts(token, currency, pageToLoad);

      const newProducts = data || [];

      if (append) {
        setProduct((prev) => [...prev, ...newProducts]);
      } else {
        setProduct(newProducts);
      }
    } catch (error) {
      setError("Não foi possível carregar os produtos.")
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setProduct([]);
      setPage(0);
      setHasMore(true);
      fetchProducts(0, false, true); 
    }, [token, currency])
  );

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !refreshing) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, true);
    }
  };


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
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
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
