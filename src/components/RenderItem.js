import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import livroImg from '../../assets/livro.jpeg'; 


const RenderItem = ({ item, selected, onPress }) => (
  <View style={styles.productCard}>

    {/* CAIXINHA DE SELEÇÃO */}
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <MaterialIcons
        name={selected ? 'check-box' : 'check-box-outline-blank'}
        size={24}
        color="#2b3e50"
      />
    </TouchableOpacity>

     {/* IMAGEM TESTE DO PRODUTO */}
    <Image source={livroImg} style={styles.productImage} />

  
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productSubtitle}>{item.subtitle}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
    </View>
  </View>
  );

const styles = StyleSheet.create({
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
  productImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
  }
});

export default RenderItem;