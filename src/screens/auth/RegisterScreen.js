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
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { register } from '../../services/AuthService';
import { Ionicons } from '@expo/vector-icons';

SplashScreen.preventAutoHideAsync();

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

const handleSignUp = async () => {
  console.log('--- Botão Cadastrar Clicado ---');
  console.log('DADOS ATUAIS NO ESTADO:', { name, email, password, confirmPassword });

  if (
    !email.trim() ||
    !password.trim() ||
    !confirmPassword.trim() ||
    !name.trim()
  ) {
    console.log('VALIDAÇÃO FALHOU: Campos obrigatórios não preenchidos.');
    Alert.alert("Campos obrigatórios", "Preencha todos os campos.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('VALIDAÇÃO FALHOU: E-mail com formato inválido.');
    Alert.alert("E-mail inválido", "Digite um e-mail válido.");
    return;
  }

  if (password.length < 6) {
    console.log('VALIDAÇÃO FALHOU: Senha com menos de 6 caracteres.');
    Alert.alert("Senha inválida", "A senha deve ter no mínimo 6 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    console.log('VALIDAÇÃO FALHOU: As senhas não coincidem.');
    Alert.alert("Senhas diferentes", "As senhas não coincidem.");
    return;
  }

  console.log('✅ VALIDAÇÕES PASSARAM! Iniciando chamada da API...');

  try {
    setLoading(true);
    console.log('BLOCO TRY: Loading ativado. Chamando o serviço de registro...');
    let user = { name, email, password };
    const response = await register(user);
    console.log('BLOCO TRY: Resposta da API recebida:', response);

    if (response && response.error) {
      console.log('BLOCO TRY: A API retornou um erro conhecido:', response.error);
      Alert.alert("Erro", response.error);
      setLoading(false); // Pare o loading aqui se houver erro
      return;
    }

    console.log('BLOCO TRY: Sucesso! Navegando para o Login...');
    Alert.alert("Sucesso", "Cadastro realizado com sucesso.");
    navigation.navigate("Entrar");
  } catch (error) {
    console.log('BLOCO CATCH: Ocorreu um erro inesperado na chamada da API.', error);
    Alert.alert("Erro inesperado", error.message);
  } finally {
    setLoading(false);
    console.log('BLOCO FINALLY: Loading desativado.');
  }
};

  return (
    <SafeAreaView style={styles.container} >
      <KeyboardAvoidingView 
        style={styles.containerDois}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View>
          <Text style={styles.byteBox}>ByteBox</Text>
        </View>

        <View>

          <Text style={styles.title}>Cadastre-se</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>NOME:</Text>
            <TextInput
              style={styles.input}
              placeholder='Seu nome completo'
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>E-MAIL:</Text>
            <TextInput
              style={styles.input}
              placeholder='insira seu email'
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>SENHA:</Text>
            <TextInput
              style={styles.inputSenha}
              placeholder='insira sua senha'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              style={styles.icon}
            />
          </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputText}>SENHA:</Text>
            <TextInput
              style={styles.inputSenha}
              placeholder='Confirme sua senha'
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              style={styles.icon}
            />
          </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
              
            )}
          </TouchableOpacity>

          <Text style={styles.text}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Entrar</Text>
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
    flex: 0.83,
    justifyContent: 'space-between'
  },
  byteBox: {
    fontFamily: 'Lora_600SemiBold',
    fontSize: 20,
    color: '#ECF0F1',
    marginTop: 20,
    textAlign: 'center'
  },
  title: {
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
    // backgroundColor: 'pink',
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
  },
  inputText: {
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
  inputSenha: {
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
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#2b3e50',
    fontSize: 24,
    fontFamily: 'Lora_600SemiBold',
    textAlign: 'center',
  },
  text: {
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
  }
});
