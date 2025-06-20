import React, { useState,useContext } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getSearchProducts } from '../services/ProductService';
import ProductCard from '../components/ProductCard';
import CustomHeader from '../components/CustomHeader';
import { useNavigation } from '@react-navigation/native';
import CurrencyContext from '../contexts/CurrencyContext';

const SearchScreen = () => {

  const { currency, changeCurrency } = useContext(CurrencyContext);
  const [searchInput, setSearchInput] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!searchInput.trim()) return;

    setLoading(true);
    setError('');
    setProducts([]); // Limpa os resultados anteriores
    Keyboard.dismiss();

    try {
      const result = await getSearchProducts(searchInput,currency);
      if (result.length === 0) {
        setError('Nenhum produto encontrado.');
      } else {
        setProducts(result);
      }
    } catch (err) {
      setError('Erro ao buscar produtos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      <View style={styles.fundo}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar produtos"
          value={searchInput}
          onChangeText={setSearchInput}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      </View>
      {loading && (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      )}

      {!loading && error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      {!loading && products.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('Produto', {
                  product: item,
                })
              }
            />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderColor: '#2b3e50',
    marginTop: 10,
    marginRight:10,
    marginLeft:10,
    marginBottom:10,
  },
  fundo:{
    backgroundColor:'#A9CCE3',
    marginTop: 10,
    marginRight:10,
    marginLeft:10,
    marginBottom:10,
    borderRadius: 8,
  },
  input: {
    flex: 1,
    height: 40,
  },
  icon: {
    paddingLeft: 8,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 20,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 15,
  },
});

export default SearchScreen;
