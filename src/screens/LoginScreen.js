import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
export default function LoginScreen({navigation}) {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: 'https://flagcdn.com/w40/br.png' }} style={styles.flag} />
        <Text style={styles.title}>ByteBox</Text>
        <TouchableOpacity>
        <Image
           source={require('../../assets/iconesino.png')}
          style={styles.flag}
        />
        </TouchableOpacity>
      </View>


      <View style={styles.logoContainer}>
        <Image
           source={require('../../assets/logobite.jpeg')}
          style={styles.logo}
        />
      </View>

      
      <Text style={styles.loginTitle}>LOGIN</Text>

      <TextInput
        placeholder="Insira seu e-mail aqui"
        placeholderTextColor="#ccc"
        style={styles.input}
      />
      <TextInput
        placeholder="Insira sua senha aqui"
        placeholderTextColor="#ccc"
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity style={styles.button}>
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
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    marginBottom: 100,
  },
  flag: {
    width: 30,
    height: 30,
    borderRadius: 12,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',

  },
  bell: {
    fontSize: 22,
    color: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  loginTitle: {
    color: '#fff',
    fontSize: 22,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  input: {
    backgroundColor: '#f0f8ff',
    width: '85%',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: '#b0d4f1',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#fff',
    marginTop: 20,
  },
  link: {
    color: '#87cefa',
    textDecorationLine: 'underline',
    marginBottom: 20,
  },
  visitorLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 160,
  },
});
