import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';

export default function RegisterScreen({navigation}) {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.senha !== formData.confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }

    console.log('Dados de cadastro:', formData);
    Alert.alert('Sucesso', 'Cadastro realizado!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
         <Image source={{ uri: 'https://flagcdn.com/w40/br.png' }} style={styles.flag} />
        <Text style={styles.topBarTitle}>ByteBox</Text>
         <Image
                   source={require('../../assets/iconesino.png')}
                  style={styles.flag}
                />
      </View>

      <View style={styles.logoSection}>
         <Image
                   source={require('../../assets/logobite.jpeg')}
                  style={styles.logo}
                />
        <Text style={styles.titulo}>CADASTRO</Text>
        <View style={styles.divider} />
      </View>

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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        
         <Text style={styles.loginLink}>Já tem uma conta?</Text>
               <TouchableOpacity  onPress={() => navigation.navigate('Entrar')}>
                 <Text style={styles.link}>Faça o login</Text>
               </TouchableOpacity>
         
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b3e50',
    padding: 50,
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topBarTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoCircle: {
    fontSize: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#fff',
  },
  divider: {
    height: 2,
    width: '80%',
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  form: {
    gap: 15,
  },
  label: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
     backgroundColor: '#f0f8ff',
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#b0d4f1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
  },
  loginAnchor: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});
