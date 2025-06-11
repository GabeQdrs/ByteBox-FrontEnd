import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import livroImg from '../../assets/ImagemLivroTeste.jpg'; 


const RenderItem = ({ item, selected, onPress }) => (
  <View style={styles.productCard}>

   
     {/* IMAGEM TESTE DO PRODUTO */}
    <Image source={livroImg} style={styles.productImage} />

  
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productSubtitle}>{item.subtitle}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
    </View>
     {/* CAIXINHA DE SELEÇÃO */}
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      <MaterialIcons
        name={selected ? 'check-box' : 'check-box-outline-blank'}
        size={30}
        color="#2b3e50"
      />
    </TouchableOpacity>

  </View>
  );

const styles = StyleSheet.create({
  productCard: {
    flexDirection: 'row',
   
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50',
  },
  productDetails: {
    flex: 1,
    marginLeft: 20,
  },
  productTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: -10,
    borderBottomWidth: 1,
    borderBottomColor: '#2b3e50',
  },
  productSubtitle: {
    fontSize: 12,
    color: '#555',
    marginTop:10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop:80,
  },
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  checkboxContainer:{
    marginTop:120,
    
  },
});

export default RenderItem;