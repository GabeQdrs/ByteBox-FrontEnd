import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ProductScreen from '../screens/ProductScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';




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
    
          <Tab.Screen name='Inicio' component={HomeScreen}/>
          <Tab.Screen name='Perfil' component={ProfileScreen}/>
          <Tab.Screen name='Carrinho' component={CartScreen}/>
          <Tab.Screen name='Pesquisar' component={SearchScreen}/>
        </Tab.Navigator>
      )
    }

  const { user } = useAuth();
  if (!user) {
    return (
        <Stack.Navigator>
          <Stack.Screen
            name="Entrar"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
    );
  }

  return (
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name='AppTabs' component={MainAppTabs}/>
        <Stack.Screen name='Produto' component={ProductScreen}/>
      </Stack.Navigator>
  )
}