import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useContext, useEffect } from 'react';
import CurrencyContext from '../contexts/CurrencyContext';
import { useNavigation } from '@react-navigation/native';

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
      {/* Botão de Voltar */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoHome}>
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      {/* Título e Subtítulo à direita */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{product.theme}</Text>
        <Text style={styles.quantity}>Livros incluso: {product.quantity}</Text>
      </View>

      {/* Placeholder para manter alinhamento */}
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
  backButton: {
    backgroundColor: '#A9CCE3',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  backText: {
    color: '#2b3e50',
    fontSize: 16,
    fontFamily: 'Lora_600SemiBold',
  },
  titleContainer: {
    position: 'absolute',
    right: 20,
    alignItems: 'flex-end', // ✅ Alinha o conteúdo à direita
  },
  title: {
    color: '#ECF0F1',
    fontFamily: 'Lora_700Bold',
    fontSize: 22,
    textAlign: 'right', // ✅ Texto alinhado à direita
  },
  quantity: {
    color: '#ECF0F1',
    fontFamily: 'Lora_600SemiBold',
    fontSize: 16,
    textAlign: 'right', // ✅ Texto alinhado à direita
  },
  placeholder: {
    width: 70, // ✅ Mesmo tamanho do botão para equilíbrio
  },
});

export default ProductHeader;
