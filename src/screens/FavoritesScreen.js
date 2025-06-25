import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import FavoriteItem from '../components/FavoriteItem';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';

import { useFavorites } from '../contexts/FavoritesContext';

SplashScreen.preventAutoHideAsync();

const { width } = Dimensions.get('window');

export default function FavoritesScreen() {
  const { favoriteItems, removeFavorite } = useFavorites();
  const [selectedItems, setSelectedItems] = useState([]);

  const [fontsLoaded] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  /* Marcar ou desmarcar produtos */
  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <View style={styles.wrapper}>
      {favoriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você não possui itens favoritos.</Text>
        </View>
      ) : (
        <FlatList
          data={favoriteItems}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <FavoriteItem
              item={item}
              selected={selectedItems.includes(item.id)}
              onPress={() => toggleItem(item.id)}
              onRemove={() => removeFromFavorites(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    fontFamily: 'Lora_600SemiBold',
  },
});
