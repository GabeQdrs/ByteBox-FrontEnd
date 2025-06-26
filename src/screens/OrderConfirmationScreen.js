import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import CustomHeader from '../components/CustomHeader';

SplashScreen.preventAutoHideAsync();

const OrderConfirmationScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { order } = route.params;

  const [fontsLoaded, fontError] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  const formatDate = (isoDate) => {
    if (!isoDate) return 'Data indisponível';
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'R$ 0,00';
    }
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image
        source={{ uri: item.imageUrl || 'https://placehold.co/130x150' }}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.theme || 'Produto sem nome'}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.convertedPrice)}</Text>
      </View>
    </View>
  );

  if (!fontsLoaded && !fontError) {
    return null; 
  }

  return (
    <View style={styles.wrapper}>
      <CustomHeader />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.confirmationTitle}>Pedido Confirmado!</Text>
        <View style={styles.orderDetailsContainer}>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Número do Pedido:</Text> {order.id}
          </Text>
          <Text style={styles.detailText}>
            <Text style={styles.detailLabel}>Data do Pedido:</Text> {formatDate(order.orderDate)}
          </Text>
        </View>

        <FlatList
          data={order.items}
          renderItem={renderOrderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          scrollEnabled={false}
        />

        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total do Pedido:</Text>
          <Text style={styles.totalAmount}>{formatPrice(order.totalConvertedPrice)}</Text>
        </View>

        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.homeButtonText}>Voltar para a Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  container: {
    padding: 16,
  },
  confirmationTitle: {
    fontFamily: 'Lora_700Bold',
    fontSize: 26,
    color: '#2b3e50',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderDetailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 20,
    marginBottom: 16,
  },
  detailText: {
    fontFamily: 'Lora_400Regular',
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  detailLabel: {
    fontFamily: 'Lora_600SemiBold',
    color: '#2b3e50',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#A9CCE3',
    marginVertical: 8,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 120,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
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
    marginTop: 8,
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 18,
    color: '#2b3e50',
  },
  totalAmount: {
    fontFamily: 'Lora_700Bold',
    fontSize: 20,
    color: '#2b3e50',
  },
  homeButton: {
    backgroundColor: '#4e73df',
    paddingVertical: 15,
    borderRadius: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#FFFFFF',
    fontFamily: 'Lora_700Bold',
    fontSize: 16,
  },
});

export default OrderConfirmationScreen;