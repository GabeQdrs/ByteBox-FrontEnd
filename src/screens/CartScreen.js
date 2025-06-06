import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import TopBar from '../components/TopBar';

const { width } = Dimensions.get('window');

/* LISTA DE PRODUTOS */
const productsData = [
  {
    id: '1',
    title: 'Livro 1',
    subtitle: 'Descrição Livro 1',
    price: 69.9,
  },
  {
    id: '2',
    title: 'Livro 2',
    subtitle: 'Descrição Livro 2',
    price: 69.9,
  },
];

export default function CartScreen() {
  const [selectedItems, setSelectedItems] = useState(['1', '2']);

  /* Marcar ou desmarcar produtos */
  const toggleItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  /* Calcular total */
  const total = productsData
    .filter((item) => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text style={styles.productSubtitle}>{item.subtitle}</Text>
        <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.wrapper}>
      {/* Top Bar */}
      <TopBar />

      {/* Conteúdo principal com ScrollView */}
      <ScrollView style={styles.container}>

        {/* Lista de produtos */}
        <FlatList
          data={productsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.footerText}>Total de itens: {selectedItems.length}</Text>
          <Text style={styles.footerText}>Valor total: R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Comprar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F5E3E6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2B2239',
    padding: 10,
    justifyContent: 'space-between',
  },
  currencyLabel: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logoText: {
    flex: 1,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
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
  footer: {
    backgroundColor: '#2B2239',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
  buyButton: {
    backgroundColor: '#BFAED9',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  buyButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});
