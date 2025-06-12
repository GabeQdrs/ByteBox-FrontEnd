import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import FavoriteItem from '../components/FavoriteItem';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

/* LISTA DE PRODUTOS */
const productsData = [
  {
    id: '1',
    title: 'Livro 1',
    subtitle: 'Descrição Livro 1',
    price: 100.9,
    
  },
  {
    id: '2',
    title: 'Livro 2',
    subtitle: 'Descrição Livro 2',
    price: 69.9,
    image: 'https://br.freepik.com/fotos-vetores-gratis/livros-png',
  },
];

export default function FavoritesScreen() {
  const [selectedItems, setSelectedItems] = useState(['1', '2']);

   const [loaded, error] = useFonts ({
      Lora_400Regular,
      Lora_600SemiBold,
      Lora_700Bold
    });

  /* MARCAR OU DESMARCAR PRODUTOS - NÃO ESTÁ FUNCIONANDO */
  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  

  return (
    <View style={styles.wrapper}>

      <ScrollView style={styles.container}>

        {/* Lista de produtos */}
        <FlatList
          data={productsData}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <FavoriteItem
              item={item}
              selected={selectedItems.includes(item.id)}
              onPress={() => toggleItem(item.id)}
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
    backgroundColor: '#fffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2239',
    padding: 10,
    justifyContent: 'space-between',
  },
  currencyLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logoText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  productSubtitle: {
    fontSize: 12,
    color: '#555',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});
