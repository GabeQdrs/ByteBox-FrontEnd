import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import OrderConfiHeader from "../components/OrderConfiHeader";

const DEFAULT_IMAGE = require("../../assets/ImagemLivroTeste.jpg");

export default function OrderConfirmationScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { order, currency } = route.params || {};

  if (!order || !order.items || order.items.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Ops! Não foi possível carregar os detalhes do pedido.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const formatPrice = (price, currentCurrency) => {
    if (typeof price !== "number" || isNaN(price)) {
      return "R$ 0,00";
    }

    let currencyCode = "BRL";

    if (currentCurrency === 'USD') {
      currencyCode = 'USD';
    } else if (currentCurrency === 'EUR') {
      currencyCode = 'EUR';
    } else {
      currencyCode = 'BRL';
    }

    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const isValidImageUrl = (url) => {
    return typeof url === "string" && url.trim() !== "";
  };

  const renderItem = ({ item }) => {
    const product = item.product || {};
    const imageSource = isValidImageUrl(product.imageUrl)
      ? { uri: product.imageUrl }
      : DEFAULT_IMAGE;

    const unitPrice =
      typeof item.convertedPriceAtPurchase === "number" &&
      !isNaN(item.convertedPriceAtPurchase)
        ? item.convertedPriceAtPurchase
        : typeof item.priceAtPurchase === "number" &&
          !isNaN(item.priceAtPurchase)
        ? item.priceAtPurchase
        : 0;

    const itemTotal = unitPrice * (item.quantity ?? 0);

    return (
      <View style={styles.productCard}>
        <Image source={imageSource} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>
            {product.theme || product.brand || "Nome do Produto"}
          </Text>

          <Text style={styles.productSubtitle}>
            {product.author || product.genre || "Autor"}
          </Text>

          <Text style={styles.priceUnit}>
            Preço unitário: {formatPrice(unitPrice, currency)}
          </Text>

          <Text style={styles.productPrice}>
            Total: {formatPrice(itemTotal, currency)}
          </Text>
        </View>
      </View>
    );
  };

  const totalOrderPrice =
    typeof order.totalConvertedPrice === "number" &&
    !isNaN(order.totalConvertedPrice)
      ? order.totalConvertedPrice
      : typeof order.totalPrice === "number" && !isNaN(order.totalPrice)
      ? order.totalPrice
      : 0;

  const firstOrderItem =
    order.items && order.items.length > 0 ? order.items[0] : null;
  const orderImage =
    firstOrderItem && isValidImageUrl(firstOrderItem.product?.imageUrl)
      ? { uri: firstOrderItem.product.imageUrl }
      : DEFAULT_IMAGE;
  const orderDescription =
    firstOrderItem?.product?.description || "Itens variados";

  return (
    <View style={styles.container}>
      <OrderConfiHeader />

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.title}>Pedido Confirmado!</Text>
      </View>

      <FlatList
        data={order.items}
        keyExtractor={(item, index) =>
          item.productId?.toString() || index.toString()
        }
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.total}>
          Total do Pedido: {formatPrice(totalOrderPrice, currency)}{" "}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("AppTabs", {
              screen: "Pedidos",
              params: {
                newOrderImage: orderImage,
                newOrderDescription: orderDescription,
                newOrderId: order.id,
              },
            })
          }
        >
          <Text style={styles.buttonText}>Voltar para a Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECF0F1",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ECF0F1",
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "#D9534F",
    marginBottom: 20,
    fontFamily: "Lora_600SemiBold",
  },
  orderSummaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2b3e50",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "#28a745",
    marginBottom: 8,
    fontFamily: "Lora_600SemiBold",
  },
  list: {
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  productCard: {
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#2b3e50",
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: "#ECF0F1",
    marginHorizontal: 10,
  },
  productImage: {
    width: "30%",
    height: 120,
    borderRadius: 8,
    resizeMode: "cover",
    marginLeft: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "space-between",
    height: 120,
    paddingVertical: 5,
  },
  productTitle: {
    color: "#2b3e50",
    fontFamily: "Lora_700Bold",
    fontSize: 18,
  },
  productSubtitle: {
    fontFamily: "Lora_600SemiBold",
    fontSize: 14,
    color: "#2b3e50",
    marginTop: 5,
  },
  priceUnit: {
    fontSize: 14,
    color: "#2b3e50",
    marginTop: 5,
    fontFamily: "Lora_600SemiBold",
  },
  productPrice: {
    color: "#2b3e50",
    fontFamily: "Lora_600SemiBold",
    fontSize: 18,
    marginTop: "auto",
  },
  footerContainer: {
    backgroundColor: "#A9CCE3",
    paddingTop: 16,
    paddingBottom: 30,
    paddingHorizontal: 16,
    
    alignItems: "flex-start",
  },
  total: {
    fontSize: 18,
    color: " #2b3e50",
    marginBottom: 12,
    fontFamily: "Lora_600SemiBold",
  },
  button: {
    backgroundColor: "#2b3e50",
    paddingVertical: 14,
    borderRadius: 10,
    width: "100%",
    alignSelf: "center",
    
  },
  buttonText: {
    color:"#ECF0F1",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Lora_600SemiBold",
  },
});