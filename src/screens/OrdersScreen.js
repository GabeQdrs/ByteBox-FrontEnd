import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { getOrders } from '../services/OrderService';
import { useAuth } from '../contexts/AuthContext';
import { useFocusEffect } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useAuth();

  const [fontsLoaded, fontError] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const fetchOrders = async (pageToLoad = 0, append = false) => {
    try {
      const response = await getOrders(token, 'BRL', pageToLoad);
      const newOrders = response.orders || [];

      setHasMore(newOrders.length > 0);
      if (append) {
        setOrders(prev => [...prev, ...newOrders]);
      } else {
        setOrders(newOrders);
      }
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(0);
      fetchOrders(0, false);
    }, [token])
  );

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchOrders(nextPage, true);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(0);
    fetchOrders(0, false);
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderOrder = ({ item }) => {
    return (
      <View style={styles.orderCard}>
        <Text style={styles.orderDate}>Pedido em: {formatDate(item.orderDate)}</Text>
        {item.items.map((product, index) => (
          <View key={index} style={styles.productCard}>
            <Image
              source={{ uri: product.imageUrl || 'https://placehold.co/130x150' }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{product.theme}</Text>
              <Text style={styles.productPrice}>R$ {product.convertedPrice?.toFixed(2)}</Text>
            </View>
          </View>
        ))}
        <Text style={styles.totalText}>
          Total: R$ {item.totalConvertedPrice?.toFixed(2)}
        </Text>
      </View>
    );
  };

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (loading && orders.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4e73df" />
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrder}
      contentContainerStyle={styles.list}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.2}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 16,
    backgroundColor: '#ECF0F1',
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 16,
  },
  orderDate: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 16,
    color: '#2b3e50',
    marginBottom: 10,
  },
  productCard: {
    flexDirection: 'row',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#A9CCE3',
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 18,
    color: '#333',
  },
  productPrice: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 16,
    color: '#2b3e50',
    marginTop: 4,
  },
  productImage: {
    width: 130,
    height: 150,
    borderRadius: 8,
  },
  totalText: {
    marginTop: 10,
    fontFamily: 'Lora_700Bold',
    fontSize: 18,
    color: '#2b3e50',
    textAlign: 'right',
  },
});

export default OrdersScreen;
