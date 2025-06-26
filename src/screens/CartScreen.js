import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { createOrder } from "../services/OrderService";

import CustomHeader from '../components/CustomHeader';

const DEFAULT_IMAGE = require("../../assets/ImagemLivroTeste.jpg");

export default function CartScreen() {
  const navigation = useNavigation();
  const {
    cartItems,
    clearCart,
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();

  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.convertedPrice * item.quantity,
    0
  );

  const handleFinishOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho vazio", "Adicione produtos antes de finalizar.");
      return;
    }

    try {
      setLoading(true);

      const response = await createOrder(cartItems, token);
      const order = response.order;

      clearCart();

      navigation.navigate("OrderConfirmationScreen", { order});
    } catch (error) {
      console.error("Erro ao finalizar o pedido:", error);
      Alert.alert(
        "Erro",
        "Não foi possível finalizar o pedido. Tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = (id) => {
    Alert.alert("Remover", "Tem certeza que deseja remover este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => removeFromCart(id),
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const imageSource =
      item.imageUrl && item.imageUrl.trim() !== ""
        ? DEFAULT_IMAGE
        : DEFAULT_IMAGE;

    return (
     
      <View style={styles.item}>
   
        <Image source={imageSource} style={styles.productImage} />

        <View style={styles.details}>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
          <Text style={styles.priceUnit}>
            Preço unitário: R$ {item.price.toFixed(2)}
          </Text>

          <View style={styles.quantityContainer}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => decreaseQuantity(item.id)}
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={24}
                  color="#dc3545"
                />
              </TouchableOpacity>

              <Text style={styles.quantityText}>{item.quantity}</Text>

              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => increaseQuantity(item.id)}
              >
                <Ionicons name="add-circle-outline" size={24} color="#28a745" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => handleRemoveItem(item.id)}
            >
              <Ionicons name="trash-outline" size={24} color="#dc3545" />
            </TouchableOpacity>
          </View>

          <Text style={styles.totalItemPrice}>
            Total: R$ {(item.convertedPrice * item.quantity).toFixed(2)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomHeader />
      {cartItems.length === 0 ? (
        <Text style={styles.empty}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total Geral: R$ {total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleFinishOrder}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Finalizar Pedido</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: "#f8f9fc",
  },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    color: "#6c757d",
  },
  list: {
    paddingBottom: 16,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#e9ecef",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#343a40",
  },
  brand: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  priceUnit: {
    fontSize: 14,
    color: "#495057",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    color: "#495057",
  },
  iconButton: {},
  totalItemPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "bold",
    color: "#4e73df",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#dee2e6",
    paddingTop: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "right",
    color: "#343a40",
  },
  button: {
    backgroundColor: "#4e73df",
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
});
