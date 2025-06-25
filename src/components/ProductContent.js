import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert } from 'react-native'
import { deleteProduct, setFavorite } from '../services/ProductService';
import { useEffect, useState, useContext } from 'react';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useCart } from '../contexts/CartContext';
import CurrencyContext from '../contexts/CurrencyContext'; // ✅ IMPORTAÇÃO DO CONTEXTO
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const favoriteTrue = require('../../assets/icons/favoriteTrue.png');
const favoriteFalse = require('../../assets/icons/favoriteFalse.png');

const ProductContent = ({ product }) => {
  const { addToCart } = useCart();
  const { currency } = useContext(CurrencyContext); // ✅ PEGA A MOEDA
  const [isFavorited, setIsFavorited] = useState(product.favorite);
  const {token, user} = useAuth();
  const navigation = useNavigation();

  const [loaded, error] = useFonts({
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

  const handleEdit = async () => {
    navigation.navigate('AppTabs', {       
    screen: 'Formulario',             
    params: { product: product }     
  });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem certeza que deseja excluir o produto "${product.theme}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sim, Excluir",
          onPress: async () => {
            try {
              await deleteProduct(product.id, token);
              Alert.alert("Sucesso", "Produto excluído com sucesso");
              navigation.goBack();
            } catch (error) {
              Alert.alert("Erro", "Erro ao deletar produto");
            }
          },
          style: "destructive"
        }
      ]
    )
  };


  let coin;
  if (currency === 'USD') {
    coin = 'US$ ';
  } else if (currency === 'EUR') {
    coin = '€ ';
  } else {
    coin = 'R$ ';
  }

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        alignItems: 'center',
        backgroundColor: '#ECF0F1',
        paddingHorizontal: 20,
      }}
    >
      <Image source={{ uri: product.imageUrl }} style={styles.image} />

      <View style={styles.info}>
        <View>
          <Text style={styles.text}>Categoria: {product.category}</Text>
          <Text style={styles.text}>Em estoque: {product.stock}</Text>
          
          
        </View>
        
      {user?.type === 'Admin' ? (
          <View style={styles.adminActions}>
            <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
              <Ionicons name="pencil" size={28} color="#2b3e50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.iconButton}>
              <Ionicons name="trash" size={28} color="#bf3f3f" />
            </TouchableOpacity>
          </View>        
      ) : (
        <TouchableOpacity onPress={changeFavorite}>
          <Image
            source={isFavorited ? favoriteTrue : favoriteFalse}
            style={styles.favoriteIcon}
          />
        </TouchableOpacity>
      )}

      </View>

      <Text style={styles.price}>{coin}{product.convertedPrice.toFixed(2)}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Adicionar ao carrinho</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Descrição:</Text>
        <Text style={styles.text}>{product.description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  image: {
    marginTop: 15,
    width: 300,
    height: 370,
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
  price: {
      color: '#2b3e50',
      fontFamily: 'Lora_700Bold',
      fontSize: 30,
      backgroundColor: '#ECF0F1',
      paddingHorizontal: 25,
      paddingVertical: 5,
      borderBottomWidth: 1,
      marginBottom: 15,
       borderBottomColor: '#2b3e50',
    },
  button: {
    backgroundColor: '#A9CCE3',
    width: '100%',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    textAlign: 'center',
  },
  descriptionContainer: {
    width: '100%',
  },
  descriptionTitle: {
    color: '#2b3e50',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    borderTopColor: '#2b3e50',
    borderTopWidth: 1,
    paddingVertical: 5,
    marginTop: 5,
  },
  text: {
    color: '#2b3e50',
    fontFamily: 'Lora_400Regular',
    fontSize: 15,
  },
  adminActions: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15, // Dá um espaço entre os botões
    padding: 5,
  }

});

export default ProductContent;
