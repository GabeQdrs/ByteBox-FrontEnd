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



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainAppTabs() {
  return (
    <Tab.Navigator
     screenOptions={ ({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#2b3e50',
      tabBarInactiveTintColor: '#ECF0F1',

      tabBarIcon: ({ focused, color, size }) => {
        let iconSource;

        if (route.name === 'Inicio') {
          iconSource = require('./assets/icons/home.png');
        } else if (route.name === 'Perfil') {
          iconSource = require('./assets/icons/profile.png');
        } else if (route.name === 'Carrinho') {
          iconSource = require('./assets/icons/cart.png')
        } else if (route.name === 'Pesquisar') {
          iconSource = require('./assets/icons/search.png')
        }
        return ( 
        <View style={{
          backgroundColor: focused ? '#ECF0F1' : '#2b3e50',  
          width: 105,
          height: 65,
          alignItems: 'center',
          justifyContent: 'center',
          }}>
          <Image
            source={iconSource}
            style={{tintColor: color}}
            />
        </View>
        )
      },
      tabBarStyle: {
        backgroundColor: '#2b3e50',
        paddingTop: 14,
        height: 80,
      }
    })
    }>

      <Stack.Screen name='Inicio' component={HomeScreen}/>
      <Stack.Screen name='Perfil' component={ProfileScreen}/>
      <Stack.Screen name='Carrinho' component={CartScreen}/>
      <Stack.Screen name='Pesquisar' component={SearchScreen}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Entrar'screenOptions={{ headerShown: false }} >
        <Stack.Screen name='Entrar' component={LoginScreen}/>
        <Stack.Screen name='Cadastro' component={RegisterScreen}/>
        <Stack.Screen name='Produto' component={ProductScreen}/>
        <Stack.Screen name='AppTabs' component={MainAppTabs}/>
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
