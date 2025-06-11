import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import OrderSreen from '../screens/OrdersScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import CouponsScreen from '../screens/CouponsScreen'
import SignaturesScreen from '../screens/SignaturesScreen'
import { View } from 'react-native'

import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react'
import CustomTopTabBar from '../components/CustomTopTabBar'



const Tab = createMaterialTopTabNavigator();

const ProfileTabs = () => {
  return (
    <View style={{ flex: 1 }} >
    <Tab.Navigator tabBar={(props) => <CustomTopTabBar {...props}/>}>
        <Tab.Screen name='Pedidos' component={OrderSreen}/>
        <Tab.Screen name='Favoritos' component={FavoritesScreen}/>
        <Tab.Screen name='Cupons' component={CouponsScreen}/>
        <Tab.Screen name='Assinaturas' component={SignaturesScreen}/>
    </Tab.Navigator>
    </View>
    
  )
}

export default ProfileTabs