import { StyleSheet, Image, View, Text, Touchable, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomHeader from '../components/CustomHeader'
import ProductHeader from '../components/ProductHeader';
import { useState } from 'react';
import ProductContent from '../components/ProductContent';



export default function ProductScreen({ route }) {
  const { product } = route.params;

  return (
    <SafeAreaView >
      <CustomHeader/>
      <ProductHeader product={product}/>
      <ProductContent product={product}/>
    </SafeAreaView>
  )
}
