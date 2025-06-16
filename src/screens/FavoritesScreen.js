import React, { useState, useEffect } from 'react';
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
import { getFavorites, setFavorite } from '../services/ProductService';


SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const [favorites, setFavorite] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        setFavorite(data);
      } catch (error) {
        setError("Não foi possível carregar os produtos.")
      } finally {
        setLoading(false);
      }
    };
  
  useEffect(() => {
    fetchFavorites();
    console.log(favorites)
  }, []);

  const [fontsLoaded] = useFonts ({
      Lora_400Regular,
      Lora_600SemiBold,
      Lora_700Bold
    });

  /* MARCAR OU DESMARCAR PRODUTOS */
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
          data={favorites}
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
    backgroundColor: '#ffffff',
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
