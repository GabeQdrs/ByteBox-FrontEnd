import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
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

  const isEmailValid = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.confirmarSenha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    if (!isEmailValid(formData.email)) {
      Alert.alert('Erro', 'E-mail inválido!');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    console.log('Dados de cadastro:', formData);
    Alert.alert('Sucesso', 'Cadastro realizado!');
  };



  return (
  <ScrollView contentContainerStyle={styles.scrollContainer}>
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ByteBox</Text>
      </View>

      <View style={styles.logoSection}>
         <Image
                   source={require('../../assets/logobyte.png')}
                  style={styles.logo}
                />
      </View>
      <Text style={styles.titulo}>CADASTRO</Text>

      <View style={styles.form}>
        
        <Text style={styles.label}>NOME</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={formData.nome}
          onChangeText={(value) => handleChange('nome', value)}
        />

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(value) => handleChange('email', value)}
        />

        <Text style={styles.label}>SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          value={formData.senha}
          onChangeText={(value) => handleChange('senha', value)}
        />

        <Text style={styles.label}>CONFIRMAR SENHA</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={formData.confirmarSenha}
          onChangeText={(value) => handleChange('confirmarSenha', value)}
        />

      </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        
        <Text style={styles.loginLink}>Já tem uma conta?</Text>
        <TouchableOpacity  onPress={() => navigation.navigate('Entrar')} >
        <Text style={styles.link}>Faça o login</Text>
        </TouchableOpacity>
    </SafeAreaView>
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
    alignItems: 'center',
    paddingTop: 40,
  },
  flag: {
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'Lora_400Regular',
    fontSize: 24,
    color: '#ECF0F1', 
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 40,
    fontFamily: 'Lora_400Regular',
    marginTop: 10,
    color: '#ECF0F1',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
    paddingHorizontal: 40,
    marginBottom: 15,
  },
  divider: {
    height: 2,
    width: '80%',
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  form: {
    gap: 10,
  },
  label: {
    fontSize: 15,
    marginTop: 10,
    marginLeft: 10,
    fontFamily: 'Lora_600SemiBold',
    color: '#fff',
  },
  input: {
    backgroundColor: '#ECF0F1',
    width: 304,
    paddingHorizontal:10,
    borderColor: '#A9CCE3',
    borderRadius: 18,
    borderWidth: 4,
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
    color: '#2C3E50',
    fontSize: 24,
    fontFamily: 'Lora_600SemiBold',
    textAlign: 'center',
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Lora_400Regular',
    fontSize: 15,
    color: '#ECF0F1',
  },
  link: {
    color: '#87cefa',
    textDecorationLine: 'underline',
    fontFamily: 'Lora_400Regular',
    fontSize: 15,
    marginBottom: 20,
    textAlign:'center',
    paddingBottom: 40,
  },
});
