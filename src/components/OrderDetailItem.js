import { View, Text } from 'react-native'
import React from 'react'

const OrderDetailItem = ({ item }) => {
  return (
    <View>
      <Text>{item.product.theme}</Text>
      <Text>{item.priceAtPurchase}</Text>
    </View>
  )
}

export default OrderDetailItem