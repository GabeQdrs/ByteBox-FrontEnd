import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { setFavorite } from '../services/ProductService';
import { useEffect, useState } from 'react';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useCart } from '../contexts/CartContext';

SplashScreen.preventAutoHideAsync();

const favoriteTrue = require('../../assets/icons/favoriteTrue.png');
const favoriteFalse = require('../../assets/icons/favoriteFalse.png');

const ProductContent = ({ product }) => {
  const {addToCart} =useCart();
  const [isFavorited, setIsFavorited] = useState(product.favorite);
  const [loaded, error] = useFonts ({
      Lora_400Regular,
      Lora_600SemiBold,
      Lora_700Bold
    });
  
    useEffect(() => {
      if (loaded || error) {
        SplashScreen.hideAsync();
      }
    }, [loaded, error]);
  
    if (!loaded && !error) {
      return null;
    }
    
  const changeFavorite = async () => {
    const newStatus = !isFavorited;
    setIsFavorited(newStatus);

    try {
      await setFavorite(product.id, newStatus)
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o favorito. Tente novamente.")
      setIsFavorited(!newStatus);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    Alert.alert("Carrinho", "Produto adicionado ao carrinho!");
  };

  return (
    <ScrollView 
    style={{flex:1}}
    contentContainerStyle={{
      alignItems: 'center',
      backgroundColor: '#ECF0F1',
      paddingHorizontal: 20,

    }}
    >
        <Image source={{uri: 'https://placehold.co/300x370/png'}} style={styles.image}/>
        
        <View style={styles.info}>
          <View>
            <Text style={styles.text}>Categoria: {product.category}</Text>
            <Text style={styles.text}>Em estoque: {product.stock}</Text>
          </View>
            <TouchableOpacity onPress={changeFavorite}>
                <Image 
                    source={isFavorited ? favoriteTrue : favoriteFalse} 
                    style={styles.favoriteIcon}
                />
            </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comprar</Text>
        </TouchableOpacity>

        <View>
        <Text style={styles.descriptionTitle}>Descrição:</Text>
        <Text style={styles.text}>{product.description}</Text>
        </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    width:300,
    height:370,
  },
  favoriteIcon: {
    width: 33,
    height: 29,
  },
  info: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',  
    marginVertical: 15,
    paddingVertical: 7,
    borderBottomColor: '#2b3e50',
    borderBottomWidth: 1,
    borderTopColor: '#2b3e50',
    borderTopWidth: 1,
  },
  button: {
    backgroundColor: '#A9CCE3',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  descriptionTitle: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    borderTopColor: '#2b3e50',
    borderTopWidth: 1,
    paddingVertical: 5,
    marginTop: 5,
  },
  text: {
    fontFamily: 'Lora_400Regular',
    fontSize: 15,
  }

});

export default ProductContent