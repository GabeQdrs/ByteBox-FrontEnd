import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import CurrencyContext from '../contexts/CurrencyContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

const ProductHeader = ({ product }) => {
  const { currency } = useContext(CurrencyContext);
  const navigation = useNavigation();

  const [loaded, error] = useFonts({
    Lora_400Regular,
    Lora_600SemiBold,
    Lora_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  const handleGoHome = () => {
    navigation.navigate('AppTabs', { screen: 'Inicio' });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backArrow} onPress={handleGoHome}>
        <Ionicons name="arrow-back" size={30} color="#ECF0F1" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>{product.theme}</Text>
        <Text style={styles.quantity}>Livros incluso: {product.quantity}</Text>
      </View>

      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2b3e50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backArrow: {
    paddingVertical: 6,
    paddingHorizontal: 5, 
  },
  titleContainer: {
    position: 'absolute',
    right: 20,
    alignItems: 'flex-end',
  },
  title: {
    color: '#ECF0F1',
    fontFamily: 'Lora_700Bold',
    fontSize: 22,
    textAlign: 'right',
  },
  quantity: {
    color: '#ECF0F1',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 16,
    textAlign: 'right',
  },
  placeholder: {
    width: 70, 
  },
});

export default ProductHeader;