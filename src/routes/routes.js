import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProductScreen from '../screens/ProductScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function Routes() {
  
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
              iconSource = require('../../assets/icons/home.png');
            } else if (route.name === 'Perfil') {
              iconSource = require('../../assets/icons/profile.png');
            } else if (route.name === 'Carrinho') {
              iconSource = require('../../assets/icons/cart.png')
            } else if (route.name === 'Pesquisar') {
              iconSource = require('../../assets/icons/search.png')
            }
            return ( 
            <View style={{
              backgroundColor: focused ? '#ECF0F1' : '#2b3e50',  
              width: 105,
              height: 70,
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

    return (
        <Stack.Navigator initialRouteName='Entrar'screenOptions={{ headerShown: false }} >
            <Stack.Screen name='Entrar' component={LoginScreen}/>
            <Stack.Screen name='Cadastro' component={RegisterScreen}/>
            <Stack.Screen name='Produto' component={ProductScreen}/>
            <Stack.Screen name='AppTabs' component={MainAppTabs}/>
        </Stack.Navigator>
  )
}