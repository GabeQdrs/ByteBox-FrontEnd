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

  const { order } = route.params;

  const formatPrice = (price) => {
    if (typeof price !== "number" || isNaN(price) || price <= 0) {
      return "R$ 0,00";
    }
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  const isValidImageUrl = (url) => {
    return typeof url === "string" && url.trim() !== "" && url !== "string";
  };

  const renderItem = ({ item }) => {
    const product = item.product || {};
    const imageSource = isValidImageUrl(product.imageUrl)
      ? { uri: product.imageUrl }
      : DEFAULT_IMAGE;

    const unitPrice =
      item.convertedPriceAtPruchase > 0
        ? item.convertedPriceAtPruchase
        : item.priceAtPurchase;

    return (
      <View style={styles.productCard}>
        <Image source={imageSource} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>
            {product.theme || product.brand || "Nome do Produto"}
          </Text>

          <Text style={styles.productSubtitle}> </Text>

          <Text style={styles.priceUnit}>
            Preço unitário: {formatPrice(unitPrice)}
          </Text>

          <Text style={styles.productPrice}>
            Total: {formatPrice(unitPrice * (item.quantity ?? 0))}
          </Text>
        </View>
      </View>
    );
  };

  const totalOrderPrice =
    order.totalConvertedPrice > 0
      ? order.totalConvertedPrice
      : order.totalPrice;

  const firstOrderItem =
    order.items && order.items.length > 0 ? order.items[0] : null;
  const orderImage =
    firstOrderItem && isValidImageUrl(firstOrderItem.product?.imageUrl)
      ? { uri: firstOrderItem.product.imageUrl }
      : DEFAULT_IMAGE;
  const orderDescription = firstOrderItem?.product?.description || "Itens variados";

  return (
    <View style={styles.container}>
      <OrderConfiHeader />

      <View style={styles.orderSummaryContainer}>
        <Text style={styles.title}>Pedido Confirmado!</Text>
      </View>

      <FlatList
        data={order.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.total}>
          Total do Pedido: {formatPrice(totalOrderPrice)}
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

  orderSummaryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50', // Added border color for consistency
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
    marginHorizontal: 10, // Added horizontal margin
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
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'flex-start',
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
    color: "#343a40",
    marginBottom: 12,
    
  },
  button: {
    backgroundColor: "#2b3e50",
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});