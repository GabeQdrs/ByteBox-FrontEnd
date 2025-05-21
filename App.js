import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductScreen from './src/screens/ProductScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Entrar' >
        <Stack.Screen name='Entrar' component={LoginScreen}/>
        <Stack.Screen name='Cadastro' component={RegisterScreen}/>
        <Stack.Screen name='Inicio' component={HomeScreen}/>
        <Stack.Screen name='Produto' component={ProductScreen}/>
        <Stack.Screen name='Perfil' component={ProfileScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
