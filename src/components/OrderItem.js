import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native';

const OrderItem = ({ item }) => {
  const navigation = useNavigation();
  
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <TouchableOpacity style={styles.container} 
      onPress={() => navigation.navigate("OrderDetailScreen", {order: item})}
    >
      <Text>Pedido #{item.id}</Text>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({

});

export default OrderItem;