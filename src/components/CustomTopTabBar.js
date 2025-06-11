import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useFonts, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function CustomTopTabBar({ state, descriptors, navigation }) {
    const [loaded, error] = useFonts ({
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
  return (
    <View style={styles.container}>
        {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        // Verifica se a aba atual é a que está focada (ativa)
        const isFocused = state.index === index;

        // Função para navegar quando a aba for pressionada
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            // A mágica acontece aqui no estilo!
            style={[styles.tabItem, { 
                backgroundColor: isFocused ? '#ECF0F1' : 'transparent',
                borderBottomColor: isFocused ? 'tranparent' : '#A9CCE3',
                borderBottomWidth: isFocused ? 0 : 4,
                borderTopColor: isFocused ? '#A9CCE3' : 'transparent',
                borderTopWidth: isFocused ? 4 : 0,
                borderLeftColor: isFocused ? '#A9CCE3' : 'transparent',
                borderLeftWidth: isFocused ? 4 : 0,
                borderRightColor: isFocused ? '#A9CCE3' : 'transparent',
                borderRightWidth: isFocused ? 4 : 0,

            }]}
          >
            <Text style={{ 
              color: isFocused ? '#2C3E50' : '#ECF0F1', 
              fontFamily: 'Lora_600SemiBold'
            }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2C3E50',

  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 13,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
