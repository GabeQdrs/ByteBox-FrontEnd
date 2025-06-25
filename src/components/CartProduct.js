
import { View, Text, Image, StyleSheet,TouchableOpacity, Alert} from 'react-native';
import livroImg from '../../assets/ImagemLivroTeste.jpg'; 
import { useCart } from '../contexts/CartContext';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
SplashScreen.preventAutoHideAsync();

const trashIcon = require('../../assets/icons/trash.png')


const CartProduct = ({ product, onPress }) => {
  const {
    removeFromCart,
    decreaseQuantity,
    increaseQuantity,
  } = useCart();

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
    
  const handleRemoveItem = (id) => {
    Alert.alert("Remover", "Tem certeza que deseja remover este item?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => removeFromCart(id),
      },
    ]);
  };
  return (
  <View style={styles.productCard}>

    <Image source={livroImg} style={styles.productImage} />

  
    <View style={styles.productDetails}>
      <Text style={styles.productTitle}>{product.theme}</Text>
      <Text style={styles.productPrice}>{product.convertedPrice.toFixed(2)}</Text>
    </View>

    <TouchableOpacity
      onPress={() => handleRemoveItem(product.id)}
      style={styles.trashButtom}
    >
      <Image source={trashIcon} style={styles.trash}/>
    </TouchableOpacity>    
    
  </View>

  );
}
  

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
    justifyContent: 'space-between',
    height: '100%',    
  },
  productTitle: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 24,
  },
  productPrice: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  trashButtom: {
    alignSelf: 'flex-end',
    marginBottom: 5,
  },
  trash: {
    width: 30,
    height: 40,
  },

});

export default CartProduct;