import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Image, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from './src/screens/CartScreen';
import SearchScreen from './src/screens/SearchScreen';
import { CurrencyProvider } from './src/contexts/CurrencyContext';
import Routes from './src/routes/routes';


export default function App() {
  return (
    <CurrencyProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </CurrencyProvider>

  );
}

// CORES DO APP
// AZUL ESCURO: #2b3e50
// AZUL CLARO: #A9CCE3
// BRANCO: #ECF0F1