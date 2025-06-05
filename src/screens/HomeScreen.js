import React from 'react';
import {View,Text,Image,ScrollView,StyleSheet,TouchableOpacity,Dimensions,} from 'react-native';
import ProductCard from '../components/ProductCard';
import TopBar from '../components/TopBar';
import SurpriseBox from '../components/SurpriseBox';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.wrapper}>
      {/* Top Bar */}
    <TopBar />

      {/* Scrollable Content */}
      <ScrollView style={styles.container}>

        {/* IMAGEM ANUNCIO */}
        <SurpriseBox />

        <Text style={styles.textPromo}>TESTE</Text>

        {/* PRODUTO */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ProductCard
        image="https://m.media-amazon.com/images/I/51qW7mL9stL._AC_UF1000,1000_QL80_.jpg?text=FNAF"
        
        title="Box Teste"
        subtitle="Descrição teste"
      />
      <ProductCard/>
      </ScrollView >

     <Text style={styles.textPromo}>TESTE </Text>

      {/* LINHA 2 */}
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ProductCard/>
      <ProductCard/>
      </ScrollView >

       <Text style={styles.textPromo}>TESTE</Text>
       
      {/* LINHA 3 */}
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ProductCard/>
      <ProductCard/>
      </ScrollView >
      

      </ScrollView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  
  textPromo:{
      color: '#2b3e50',
    fontSize: 16,
    fontFamily: 'Lora_400Regular',
    marginTop: 13,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
  },
});
