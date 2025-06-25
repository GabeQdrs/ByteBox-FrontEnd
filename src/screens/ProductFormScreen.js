import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { uploadImage } from '../services/ImageService';
import { createProduct, updateProduct } from '../services/ProductService';
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();

export default function ProductFormScreen({ navigation, route }) {    
  const {token} = useAuth();
  const existingProduct = route.params?.product;
  
  const [theme, setTheme] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
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
      
  useEffect(() => {
    if (existingProduct) {
      setTheme(existingProduct.theme || "");
      setQuantity(existingProduct.quantity || "");
      setDescription(existingProduct.description || "");
      setCategory(existingProduct.category || "");
      setPrice(existingProduct.price || "");
      setCurrency(existingProduct.currency || "");
      setStock(existingProduct.stock || "");
      setImage(
        existingProduct.imageUrl ? { uri: existingProduct.imageUrl } : null
      );
    }
  }, [existingProduct])
  
  if (!loaded && !error) {
    return null;
  }
  
  const handleSubmit = async () => {
    if (!theme || !quantity || !description || !category || !price || !currency || !stock) {
            Alert.alert("Erro", "Por Favor, preencha todos os campos.");
            return;
        }

        let responseImage = {};

        if (!image?.base64) {
        responseImage = { imageUrl: image?.uri || null };
        } else {
        responseImage = await uploadImage(image);
        }

        const productData = {
            theme,
            quantity,
            description,
            category,
            price: parseFloat(price),
            currency,
            stock,
            imageUrl: responseImage?.imageUrl,
        };

        setLoading(true);

      if (existingProduct) {
        const response = await updateProduct(
        existingProduct.id,
        productData,
        token
        );
        if (response.error) {
          Alert.alert("Erro", response.error);
          return;
        }
        Alert.alert("Sucesso", "Produto atualizado com sucesso!");
      } else {
      const response = await createProduct(productData, token);

      if (response.error) {
        Alert.alert("Erro", response.error);
        return;
      }

      Alert.alert("Sucesso", "Produto cadastrado com sucesso!");
    }

    navigation.goBack();
    setLoading(false);
    };

  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão negada!",
        "Você precisa permitir acesso à câmera."
      );
      return false;
    }
    return true;
  };

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const takePhotoWithCamera = async () => {
    const hasPermission = await requestCameraPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#2b3e50' }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <CustomHeader/>
        
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{existingProduct ? 'Editar Produto' : 'Cadastrar Produto'}</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Tema</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite o tema da box'
                value={theme}
                onChangeText={setTheme}   
                />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Quantidade</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite quantos livros terão na box'
                value={quantity}
                onChangeText={setQuantity}   
                />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.text}>Descrição</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite a descrição da box'
                value={description}
                onChangeText={setDescription}   
                />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Categoria</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite a categoria da box'
                value={category}
                onChangeText={setCategory}   
                />
            </View> 

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Preço</Text>
              <TextInput
                style={styles.input}
                placeholder='Digite o preço da box'
                value={price}
                onChangeText={setPrice}
                keyboardType='numeric'
                />
            </View> 

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Moeda</Text>
              <TextInput
                style={styles.input}
                placeholder='BRL / USD / EUR'
                value={currency}
                onChangeText={setCurrency}   
                />
            </View> 

            <View style={styles.inputContainer}>
              <Text style={styles.text}>Estoque</Text>
              <TextInput
                style={styles.input}
                placeholder='Quantidade disponivel no estoque'
                value={stock}
                onChangeText={setStock}
                keyboardType='numeric'   
              />
            </View> 

            <View style={{ flexDirection: "row", justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.takePhotoButton} onPress={takePhotoWithCamera}>
                    <Text style={styles.buttonText}>Tirar Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.pickPhotoButton} onPress={pickImageFromGallery}>
                    <Text style={styles.buttonText}>Escolher da galeria</Text>
                </TouchableOpacity>
            </View>

            {image && (
              <Image
              source={{ uri: image.uri }}
              style={styles.image}
              />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {loading ? (
                  <Text style={styles.buttonText}>Salvando...</Text>
                ) : (
                  <Text style={styles.buttonText}>
                  {existingProduct ? "Salvar Alterações" : "Salvar Produto"}
                </Text>
                )}
            </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2b3e50',
        paddingHorizontal: 25,
    },
    title: {
        textAlign: 'center',
        fontFamily: 'Lora_600SemiBold',
        color: '#ECF0F1',
        fontSize: 24,
        borderBottomWidth: 1,
        borderColor: '#ECF0F1',
        marginVertical: 10,
        marginBottom: 20,
    },
    inputContainer: {
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 50,
    },
    text: {
      fontFamily: 'Lora_700Bold',
      fontSize: 15,
      color: '#2b3e50',
      backgroundColor: '#ECF0F1',
      width: 95,
      height: '100%',
      textAlign: 'center',
      textAlignVertical: 'center',
      borderTopLeftRadius: 18,
      borderBottomLeftRadius: 18,
      borderBottomWidth: 4,
      borderTopWidth: 4,
      borderLeftWidth: 4,
      borderColor: '#A9CCE3',
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
    takePhotoButton: {
      width: '49%',
      backgroundColor: '#A9CCE3',
      marginTop: 10,
      paddingVertical: 10,
      borderTopLeftRadius: 15,
      borderBottomLeftRadius: 15,
    },
    pickPhotoButton: {
      width: '49%',
      backgroundColor: '#A9CCE3',
      marginTop: 10,
      paddingVertical: 10,
      borderTopRightRadius: 15,
      borderBottomRightRadius: 15,      
    },
    buttonText: {
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'Lora_700Bold',
      color: '#2b3e50'
    },
    button: {
      backgroundColor: '#A9CCE3',
      marginTop: 5,
      marginBottom: 20,
      paddingVertical: 10,
      borderRadius: 15,
    },
    image: {
      width: '60%',
      height: 250,
      marginVertical: 10,
      alignSelf: 'center',
    }
})