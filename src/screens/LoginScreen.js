import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView,  } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({navigation}) {
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>ByteBox</Text>
      </View>

      <View style={styles.logoContainer}>
        <Image
           source={require('../../assets/logobyte.png')}
          style={styles.logo}
        />
      </View>      
      
      <Text style={styles.loginTitle}>LOGIN</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>E-MAIL</Text>
        <TextInput
          placeholder="   Insira seu e-mail aqui"
          placeholderTextColor={'#A5AAAB'}
          style={styles.input}
        />
      </View>  

      <View style={styles.inputContainer}>
        <Text style={styles.textInput}>SENHA</Text>
        <TextInput
          placeholder="   Insira sua senha aqui"
          placeholderTextColor={'#A5AAAB'}
          secureTextEntry
          style={styles.input}
        />
      </View>

      

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Inicio')}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      
      <Text style={styles.signUpText}>Ainda não tem uma conta?</Text>
      <TouchableOpacity  onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.link}>Cadastre-se</Text>
      </TouchableOpacity>

      <TouchableOpacity >
        <Text style={styles.visitorLink}>Entrar como visitante</Text>
        
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
    alignItems: 'center',
    paddingTop: 70,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center',
    marginBottom: 70,
  },
  flag: {
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontFamily: 'Lora_400Regular'
  },
  
  bell: {
    fontSize: 22,
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 5,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  loginTitle: {
    color: '#fff',
    fontSize: 40,
    fontFamily: 'Lora_400Regular',
    marginTop: 40,
    marginBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingHorizontal: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    width: 390,
    height: 50,
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  textInput: {
    backgroundColor: '#ECF0F1',
    color: '#2C3E50',
    fontFamily: 'Lora_700Bold',
    fontSize: 15,
    width: 81,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderColor: '#A9CCE3',
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  input: {
    backgroundColor: '#ECF0F1',
    width: 304,
    borderColor: '#A9CCE3',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderRightWidth: 4,

  },
  button: {
    backgroundColor: '#b0d4f1',
    width: 226,
    height: 60,
    borderRadius: 20,
    marginTop: 30,
    justifyContent: 'center',
    
  },
  buttonText: {
    color: '#000',
    fontSize: 24,
    fontFamily: 'Lora_600SemiBold',
    textAlign: 'center',
  },
  signUpText: {
    color: '#fff',
    marginTop: 20,
    fontSize: 15,
    fontFamily: 'Lora_400Regular'
  },
  link: {
    color: '#87cefa',
    textDecorationLine: 'underline',
    marginBottom: 20,
    fontSize: 15,
    fontFamily: 'Lora_400Regular'
  },
  visitorLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 100,
    fontSize: 15,
    fontFamily: 'Lora_400Regular'
  },
});
