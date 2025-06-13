import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { setFavorite } from '../services/ProductService';
import { useState } from 'react';

const favoriteTrue = require('../../assets/icons/favoriteTrue.png');
const favoriteFalse = require('../../assets/icons/favoriteFalse.png');

const ProductContent = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(product.favorite);
    
    const changeFavorite = async () => {
        const newStatus = !isFavorited;
        setIsFavorited(newStatus);
        console.log(`[COMPONENTE] Botão clicado. Enviando ID: ${product.id}, Novo Status: ${newStatus}`);

        try {
          await setFavorite(product.id, newStatus)
        } catch (error) {
          Alert.alert("Erro", "Não foi possível atualizar o favorito. Tente novamente.")
          setIsFavorited(!newStatus);
        }
    };

  return (
    <View style={styles.container}>
        <Image source={{uri: 'https://placehold.co/300x370/png'}} style={styles.image}/>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 25, marginVertical:10,}}>
            <Text>Em estoque: {product.stock}</Text>
            <TouchableOpacity onPress={changeFavorite}>
                <Image 
                    source={isFavorited ? favoriteTrue : favoriteFalse} 
                    style={styles.favoriteIcon}
                />
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ECF0F1',
    alignItems: 'center',
    marginTop: 16,
  },
  image: {
    height:370,
    width:300,
  },
  favoriteIcon: {
    width: 33,
    height: 29,
  },

});

export default ProductContent