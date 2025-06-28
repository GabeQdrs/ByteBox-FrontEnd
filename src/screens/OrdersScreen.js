
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import { useAuth } from "../contexts/AuthContext";
import { getOrders } from "../services/OrderService";

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
    const imagesToDisplay = item.items
      ? item.items
          .filter(orderItem => isValidImageUrl(orderItem.product?.imageUrl))
          .slice(0, 3) // Display up to 3 images to avoid clutter
      : [];

    const description = item.items && item.items.length > 0
      ? item.items[0].product?.description || "Itens variados"
      : "Itens variados";


    return (
      <TouchableOpacity
        style={styles.orderCard}
        onPress={() => navigation.navigate("OrderDetailScreen", { order: item })}
      >
        <View style={styles.orderHeader}>
          {imagesToDisplay.length > 0 ? (
            <View style={styles.imageGallery}>
              {imagesToDisplay.map((orderItem, index) => (
                <Image
                  key={`${item.id}-${orderItem.product.id}-${index}`}
                  source={{ uri: orderItem.product.imageUrl }}
                  style={styles.orderImage}
                />
              ))}
              {item.items.length > 3 && (
                <View style={styles.moreImagesOverlay}>
                  <Text style={styles.moreImagesText}>+{item.items.length - 3}</Text>
                </View>
              )}
            </View>
          ) : (
            <Image source={DEFAULT_IMAGE} style={styles.orderImage} />
          )}
          <View style={styles.orderSummary}>
            <Text style={styles.orderId}>Pedido #{item.id}</Text>
            <Text style={styles.orderDescription}>{description}</Text>
          </View>
        </View>
        <Text style={styles.orderDate}>Data: {formatDate(item.orderDate)}</Text>
        <Text style={styles.orderTotal}>
          Total: R$ {item.totalConvertedPrice.toFixed(2)}
        </Text>
        <Text style={styles.orderItems}>
          Itens: {item.items ? item.items.length : 0}
        </Text>
      </TouchableOpacity>
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
      contentContainerStyle={styles.list}
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
  list: {
    padding: 16,
  },
  footer: {
    paddingVertical: 16,
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  imageGallery: {
    flexDirection: "row",
    marginRight: 10,
    alignItems: 'center',
  },
  orderImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 5, // Small margin between images
    backgroundColor: "#e9ecef",
  },
  moreImagesOverlay: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', // Position over the last image
    right: 0,
  },
  moreImagesText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderSummary: {
    flex: 1,
  },
  orderId: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#343a40",
  },
  orderDescription: {
    fontSize: 14,
    color: "#495057",
  },
  orderDate: {
    fontSize: 14,
    marginBottom: 4,
    color: "#6c757d",
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#28a745",
  },
  orderItems: {
    fontSize: 14,
    color: "#495057",
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