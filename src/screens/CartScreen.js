import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert, // Import Alert
} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import CartProduct from '../components/CartProduct';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useCart } from '../contexts/CartContext';
import { useNavigation } from '@react-navigation/native';
import { useOrders } from '../contexts/OrdersContext';

SplashScreen.preventAutoHideAsync();

export default function CartScreen() {
  const { cartItems, clearCart } = useCart(); // Assuming clearCart exists to empty the cart after purchase
  const { addOrder } = useOrders();
  const navigation = useNavigation();

  // Load fonts
  const [loaded, error] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  // Calculate total items and price
  const { totalItems, totalPrice } = useMemo(() => {
    const itemsCount = cartItems.length;
    const price = cartItems.reduce((sum, item) => sum + (item.convertedPrice || 0), 0);
    return { totalItems: itemsCount, totalPrice: price };
  }, [cartItems]);

  const handleBuy = () => {
    if (cartItems.length === 0) {
      Alert.alert("Carrinho Vazio", "Adicione produtos ao carrinho antes de comprar.");
      return;
    }

    // Create a new order object based on the cart's content
    const newOrder = {
      id: `order-${Date.now()}`, // Generate a unique order ID
      orderDate: new Date().toISOString(),
      items: cartItems,
      totalConvertedPrice: totalPrice,
    };

    // Add the order to the orders context
    addOrder(newOrder);

    // Navigate to the OrderConfirmationScreen with the new order data
    navigation.navigate('OrderConfirmationScreen', { order: newOrder });

    // Clear the cart after the purchase is complete
    clearCart(); 
  };
  
  // Font loading check
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null; // Or a loading indicator
  }

  return (
    <View style={styles.wrapper}>
      <CustomHeader />

      <ScrollView style={styles.container}>
        {cartItems.length === 0 ? (
          <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
        ) : (
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <CartProduct
                product={item}
                // Assuming CartProduct has its own logic for removal via useCart
              />
            )}
          />
        )}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerText}>Total de itens: {totalItems}</Text>
          <Text style={styles.footerValue}>Valor total: R$ {totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={handleBuy}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  emptyCartText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    fontFamily: 'Lora_600SemiBold',
    color: '#6c757d',
  },
  footer: {
    backgroundColor: '#2b3e50',
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#34495e',
  },
  footerText: {
    color: '#ECF0F1',
    fontFamily: 'Lora_400Regular',
    fontSize: 16,
  },
  footerValue: {
    color: '#FFFFFF',
    fontFamily: 'Lora_700Bold',
    fontSize: 18,
    marginTop: 4,
  },
  buyButton: {
    backgroundColor: '#b0d4f1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buyButtonText: {
    color: '#2b3e50',
    fontFamily: 'Lora_700Bold',
    fontSize: 16,
  },
  // Re-add other styles if they were removed
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