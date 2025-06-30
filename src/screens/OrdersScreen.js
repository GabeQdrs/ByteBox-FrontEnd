import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { getOrders } from "../services/OrderService";

// Importe o novo componente OrderItem
import OrderItem from "../components/OrderItem";
// Importe o novo componente OrdersListFooter
import OrdersListFooter from "../components/OrdersListFooter"; // Ajuste o caminho conforme necessário

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const { token } = useAuth();

  const fetchOrders = async (pageToLoad = 0, append = false) => {
    try {
      if (pageToLoad === 0 && !append) {
        setLoading(true);
        setError(null);
      } else if (append) {
        setLoadingMore(true);
      }

      const response = await getOrders(token, "BRL", pageToLoad);

      const newOrders = response.orders || [];

      setHasMore(newOrders.length > 0);

      if (append) {
        setOrders((prev) => [...prev, ...newOrders]);
      } else {
        setOrders(newOrders);
      }
    } catch (err) {
      setError("Erro ao carregar pedidos. Tente novamente.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPage(0);
      fetchOrders(0, false);

      if (route.params?.newOrderImage && route.params?.newOrderDescription && route.params?.newOrderId) {
        const { newOrderImage, newOrderDescription, newOrderId } = route.params;

        const tempNewOrder = {
          id: newOrderId,
          orderDate: new Date().toISOString(),
          totalConvertedPrice: 0,
          items: [
            {
              product: {
                imageUrl: newOrderImage.uri,
                description: newOrderDescription,
              },
            },
          ],
          isTemp: true,
        };

        setOrders(prevOrders => {
          const existingOrderIndex = prevOrders.findIndex(order => order.id === newOrderId);
          if (existingOrderIndex > -1) {
            const updatedOrders = [...prevOrders];
            updatedOrders[existingOrderIndex] = { ...updatedOrders[existingOrderIndex], isTemp: false };
            return updatedOrders;
          } else {
            return [tempNewOrder, ...prevOrders];
          }
        });

        navigation.setParams({ newOrderImage: undefined, newOrderDescription: undefined, newOrderId: undefined });
      }
    }, [token, route.params])
  );

  const handleLoadMore = () => {
    if (!loadingMore && hasMore && !refreshing) {
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

  const renderOrder = ({ item }) => <OrderItem item={item} />;

  // O ListFooterComponent agora usa o componente OrdersListFooter
  // Passamos a prop 'loadingMore' para ele
  const renderFooter = () => <OrdersListFooter loadingMore={loadingMore} />;


  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4e73df" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noOrdersText}>Você ainda não tem pedidos.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderOrder}
      contentContainerStyle={styles.listContainer}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.3}
      ListFooterComponent={renderFooter} // Usando o componente OrdersListFooter
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  // O estilo 'footer' foi movido para OrdersListFooter.js
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noOrdersText: {
    fontSize: 16,
    color: "#6c757d",
  },
});