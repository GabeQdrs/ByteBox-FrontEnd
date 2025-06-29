import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView, // Import ScrollView
  Image,
} from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { getOrders } from "../services/OrderService";

// Assuming you have a default image
const DEFAULT_IMAGE = require("../../assets/ImagemLivroTeste.jpg");

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

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const isValidImageUrl = (url) => {
    return typeof url === "string" && url.trim() !== "" && url !== "string";
  };

  const renderOrder = ({ item }) => {
    return (
      <View style={styles.orderCard}>
        {/* ScrollView for product images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.imagesScrollContainer}>
          {item.items && item.items.length > 0 ? (
            item.items.map((orderItem, index) => {
              const imageUrl = isValidImageUrl(orderItem.product?.imageUrl)
                ? orderItem.product.imageUrl
                : DEFAULT_IMAGE;
              return (
                <Image
                  key={`${item.id}-${orderItem.product?.id || index}`}
                  source={{ uri: imageUrl }}
                  style={styles.productImage}
                />
              );
            })
          ) : (
            <Image source={DEFAULT_IMAGE} style={styles.productImage} />
          )}
        </ScrollView>

        {/* Order Details */}
        <View style={styles.orderDetails}>
          <Text style={styles.orderTitle}>Pedido #{item.id}</Text>
          <Text style={styles.orderDate}>Data: {formatDate(item.orderDate)}</Text>
          <Text style={styles.orderItems}>Itens: {item.items ? item.items.length : 0}</Text>
          <Text style={styles.orderPrice}>Total: R$ {item.totalConvertedPrice.toFixed(2)}</Text>
        </View>
      </View>
    );
  };

  const renderFooter = () =>
    loadingMore ? (
      <View style={styles.footer}>
        <ActivityIndicator size="small" color="#4e73df" />
      </View>
    ) : null;

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
      ListFooterComponent={renderFooter}
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
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: '#ECF0F1',
    
    borderBottomWidth:1,
    marginBottom: 15,
    overflow: 'hidden', 
  },
  imagesScrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  productImage: {
    width: 100, 
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'cover', 
  },
  orderDetails: {
    padding: 10,
  },
  orderTitle: {
    color: '#2b3e50',
    fontFamily: 'Lora_700Bold',
    fontSize: 18,
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3,
  },
  orderItems: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 3,
  },
  orderPrice: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 16,
    marginTop: 5,
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  noOrdersText: {
    fontSize: 16,
    color: "#6c757d",
  },
});