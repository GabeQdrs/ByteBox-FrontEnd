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

        <Text style={styles.textPromo}>DESCONTOS IMPERTIVEIS</Text>

        {/* PRODUTO */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ProductCard
        image="https://m.media-amazon.com/images/I/51qW7mL9stL._AC_UF1000,1000_QL80_.jpg?text=FNAF"
        discount="50% OFF"
        title="Box Teste"
        subtitle="Descrição teste"
      />
      <ProductCard/>
      </ScrollView >

     <Text style={styles.textPromo}>DESCONTOS IMPERTIVEIS</Text>

      {/* LINHA 2 */}
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ProductCard/>
      <ProductCard/>
      </ScrollView >

       <Text style={styles.textPromo}>DESCONTOS IMPERTIVEIS</Text>
       
      {/* LINHA 3 */}
       <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <ProductCard/>
      <ProductCard/>
      </ScrollView >
      
      
      {/* LINHA 2 */}
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
    textDecorationLine: 'underline',
    marginLeft:10,
    marginTop:5,
  },
  flag: {
    width: 24,
    height: 16,
  },
  topTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  topIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  container: {
    flex: 1,
  },
  surpriseBox: {
    padding: 16,
  },
  surpriseImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
  },
  surpriseOverlay: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  boxTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxSubtitle: {
    color: '#fff',
    fontSize: 14,
  },
  discountLabel: {
    backgroundColor: '#ff3b30',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 4,
    width: 60,
    alignItems: 'center',
  },
  discountText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomBar: {
    height: 60,
    backgroundColor: '#1e1e2f',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});
