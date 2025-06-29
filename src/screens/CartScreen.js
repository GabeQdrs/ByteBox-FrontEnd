import React, { useContext, useState } from "react";
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
import CurrencyContext from "../contexts/CurrencyContext";

const DEFAULT_IMAGE = require("../../assets/ImagemLivroTeste.jpg"); 

export default function CartScreen() {
  const navigation = useNavigation();
  const {
    cartItems,
    clearCart,
    removeFromCart,
  } = useCart();
  const {currency} = useContext(CurrencyContext);
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);

  const total = cartItems.reduce(
    (sum, item) => sum + item.convertedPrice * item.quantity,
    0
  );

  let coin;
  if (currency === 'USD') {
    coin = 'US$ ';
  } else if (currency === 'EUR') {
    coin = '€ ';
  } else {
    coin = 'R$ ';
  };

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

      // Pass the 'coin' variable here
      navigation.navigate("OrderConfirmationScreen", { order, coin });
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
        ? { uri: item.imageUrl }
        : DEFAULT_IMAGE;

    return (
      <View style={styles.productCard}>
        <Image source={imageSource} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{item.theme}</Text>
          
          <Text style={styles.productSubtitle}>Livros incluso: {item.quantity}</Text>
          
          <Text style={styles.productPrice}>
            Total: {coin}{(item.convertedPrice * item.quantity).toFixed(2)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.removeButtonContainer}
          onPress={() => handleRemoveItem(item.id)}
        >
          <Ionicons name="trash-outline" size={30} color="#dc3545" />
        </TouchableOpacity>
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
            <Text style={styles.total}>Total Geral: {coin}{total.toFixed(2)}</Text>
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
    backgroundColor: "#ECF0F1",
  },
  empty: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
    color: "#bf3f3f",
  },
  list: {
    paddingBottom: 16,
    paddingHorizontal: 10,
  },
  
  productCard: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50',
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#ECF0F1',
    
  },
  productImage: {
    width: "30%",
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
    marginLeft: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
    height: 120,
    paddingVertical: 5,
  },
  productTitle: {
    color: '#2b3e50',
    fontFamily: 'Lora_700Bold',
    fontSize: 18,
  },
  productSubtitle: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 14,
    color: '#2b3e50',
    marginTop: 5,
  },
  productPrice: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 18,
    marginTop: 'auto',
  },
  priceUnit: {
    fontSize: 14,
    color: '#2b3e50',
    marginTop: 5,
    fontFamily: 'Lora_600SemiBold',
  },
  removeButtonContainer: {
    alignSelf: 'flex-end',
    marginRight: 15,
    marginBottom: 10,
  },
  
  footer: {
    
    paddingTop: 16,
    paddingHorizontal: 20,
    backgroundColor: '#A9CCE3',
    
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "left",
    color: "#343a40",
  },
  button: {
    backgroundColor: "#2b3e50",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom:15,
  },
  buttonText: {
    color: "#ECF0F1",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 17,
  },
});