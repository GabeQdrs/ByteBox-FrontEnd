import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useOrders } from '../contexts/OrdersContext';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const OrdersScreen = () => {
  const { orders } = useOrders();
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

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Pedidos Realizados</Text>

      {orders.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum pedido realizado ainda.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(order) => order.id}
          scrollEnabled={false}
          renderItem={({ item }) => {
            const totalPedido = item.items.reduce((sum, prod) =>
              typeof prod.preco === 'number' ? sum + prod.preco : sum, 0);

            return (
              <View style={styles.orderCard}>
                
                  <Text style={styles.orderDate}>Pedido em: {item.date}</Text>
                {item.items.map((product, index) => (
                  <View key={index} style={styles.productCard}>
                    
                    <Image
                      source={{ uri: product.imagem || product.imageUrl }}
                      style={styles.productImage}
                    />
                    <View style={styles.productDetails}>
                      <Text style={styles.productTitle}>{product.nome || product.theme}</Text>
                      <Text style={styles.productPrice}>
                        R$ {product.preco?.toFixed(2) || product.convertedPrice?.toFixed(2)}
                      </Text>
                    </View>
                    
                  </View>
                ))}

              </View>
            );
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ECF0F1',
  },
  title: {
    fontFamily: 'Lora_700Bold',
    fontSize: 22,
    marginBottom: 16,
    color: '#2b3e50',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontFamily: 'Lora_400Regular',
  },
  orderCard: {
    backgroundColor: ' #ECF0F1',
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    
    borderBottomColor: '#2b3e50',
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
    
    borderBottomColor: '#2b3e50',
    backgroundColor: '#A9CCE3',
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    color: '#333',
  },
  productPrice: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 18,
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
