import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { signIn } = useAuth();

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

    const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha o e-mail e a senha.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("E-mail inválido", "Digite um e-mail válido.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Senha inválida", "A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    try {
      setLoading(true);
      const response = await signIn({ email, password });
      if (response?.error) {
        Alert.alert("Erro", response.error);
        return;
      }
    } catch (error) {
      Alert.alert("Erro inesperado", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
          style={styles.containerDois}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          <Text style={styles.title}>ByteBox</Text>

        </View>
       
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../../assets/logobyte.png')}
              style={styles.logo}
              />
          </View>      
          <Text style={styles.loginTitle}>BEM VINDO(A)!</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.textInput}>E-MAIL</Text>
            <TextInput
              placeholder="Insira seu e-mail aqui"
              placeholderTextColor={'#A5AAAB'}
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              />
          </View>  

          <View style={styles.inputContainer}>
            <Text style={styles.textInput}>SENHA</Text>
            <TextInput
              placeholder="Insira sua senha aqui"
              placeholderTextColor={'#A5AAAB'}
              style={styles.inputPassword}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                style={styles.icon}
              />
            </TouchableOpacity> 
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          
          <Text style={styles.signUpText}>Ainda não tem uma conta?</Text>
          <TouchableOpacity  onPress={() => navigation.navigate('Cadastro')}>
            <Text style={styles.link}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
    paddingHorizontal: 25,
  },
    containerDois: {
    flex: 0.8,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    color: '#ECF0F1',
    marginTop: 30,
    textAlign: 'center'
  },  
  logoContainer: {
    alignItems: 'center',

  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  loginTitle: {
    fontFamily: 'Lora_400Regular',
    fontSize: 30,
    color: '#ECF0F1',
    alignSelf: 'center',
    textAlign: 'center',
    borderBottomColor: '#ECF0F1',
    borderBottomWidth: 1,
    width: '80%',
    marginVertical: 30,
    paddingVertical: 10,
  },
  inputContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  textInput: {
    fontFamily: 'Lora_700Bold',
    fontSize: 15,
    color: '#2b3e50',
    backgroundColor: '#ECF0F1',
    width: 80,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderColor: '#A9CCE3',
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    marginRight: 5,
  },
  input: {
    backgroundColor: '#ECF0F1',
    flex: 1,
    height: '100%',
    borderColor: '#A9CCE3',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderBottomWidth: 4,
    borderTopWidth: 4,
    borderRightWidth: 4,
    paddingLeft: 10,
  },
  inputPassword: {
    backgroundColor: '#ECF0F1',
    flex: 1,
    height: '100%',
    borderColor: '#A9CCE3',
    borderBottomWidth: 4,
    borderTopWidth: 4,
    paddingLeft: 10,
  },
  icon: {
    fontSize: 25,
    color: '#2b3e50',
    backgroundColor: '#ECF0F1',
    width: 50,
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
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
    alignSelf: 'center',
  },
  buttonText: {
    color: '#2b3e50',
    fontSize: 24,
    fontFamily: 'Lora_600SemiBold',
    textAlign: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 15,
    marginTop: 20,
    fontFamily: 'Lora_400Regular',
    alignSelf: 'center'
  },
  link: {
    color: '#87cefa',
    textDecorationLine: 'underline',
    marginBottom: 20,
    fontSize: 15,
    fontFamily: 'Lora_400Regular',
    alignSelf: 'center',
  },
  // visitorLink: {
  //   color: '#fff',
  //   textDecorationLine: 'underline',
  //   marginTop: 100,
  //   fontSize: 15,
  //   fontFamily: 'Lora_400Regular'
  // },
});