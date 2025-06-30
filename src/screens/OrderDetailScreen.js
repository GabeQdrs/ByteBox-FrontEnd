import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import OrderDetailItem from '../components/OrderDetailItem';

export default function OrderDetailScreen() {
    const route = useRoute();
    const {order} = route.params;
 
    const renderItem = ({item}) => <OrderDetailItem item={item}/>

  return (
    <View>
        <Text>TELA PRODUTOS DO PEDIDO TAL</Text>
        <FlatList
          data={order.items}
          keyExtractor={(item) => item.id.toString()}
          scrollEnabled={false}
          renderItem={renderItem}
        />
    </View>
  )
}