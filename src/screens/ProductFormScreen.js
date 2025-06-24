import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';
import { useFonts, Lora_400Regular, Lora_600SemiBold, Lora_700Bold } from '@expo-google-fonts/lora';
import * as SplashScreen from 'expo-splash-screen';
import { uploadImage } from '../services/ImageService';
import { createProduct } from '../services/ProductService';
import * as ImagePicker from "expo-image-picker";

SplashScreen.preventAutoHideAsync();

export default function ProductFormScreen({ navigation, route }) {    
    const {token} = useAuth();

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

        try{ 
        const response = await createProduct(productData, token);
        if (response.error) {
            Alert.alert("Erro", "Erro de validação");
            return;
        } else {
            Alert.alert("Sucesso!", "Produto cadastrado com sucesso");
        }
        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "tente novamente mais tarde");
        } finally {
            setLoading(false);
            navigation.goBack();
        }
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
    <View style={{flex:1}}>
        <CustomHeader/>
        <View style={styles.container}>

            <Text style={styles.title}>Criar box</Text>

            <View>
                <Text>Tema</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite o tema da box'
                value={theme}
                onChangeText={setTheme}   
                />
            </View>

            <View>
                <Text>Quantidade de livros</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite quantos livros terão na box'
                value={quantity}
                onChangeText={setQuantity}   
                />
            </View>
            
            <View>
                <Text>Descrição</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a descrição da box'
                value={description}
                onChangeText={setDescription}   
                />
            </View>

            <View>
                <Text>Categoria</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a categoria da box'
                value={category}
                onChangeText={setCategory}   
                />
            </View> 

            <View>
                <Text>Preço</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite o preço da box'
                value={price}
                onChangeText={setPrice}
                keyboardType='numeric'
                />
            </View> 

            <View>
                <Text>Moeda</Text>
                <TextInput
                style={styles.input}
                placeholder='Exemplo: BRL'
                value={currency}
                onChangeText={setCurrency}   
                />
            </View> 

            <View>
                <Text>Estoque</Text>
                <TextInput
                style={styles.input}
                placeholder='Digite a quantidade que tem no estoque'
                value={stock}
                onChangeText={setStock}
                keyboardType='numeric'   
                />
            </View> 

            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
                    <Text>Tirar Foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={pickImageFromGallery}>
                    <Text>Escolher da galeria</Text>
                </TouchableOpacity>
            </View>

            {image && (
                <Image
                source={{ uri: image.uri }}
                style={{ width: 100, height: 100, marginBottom: 10 }}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                {loading ? (
                <Text style={styles.buttonText}>Salvando...</Text>
                ) : (
                <Text style={styles.buttonText}>Salvar Produto</Text>
                )}
            </TouchableOpacity>
        </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ECF0F1',
        paddingHorizontal: 25,
    },
    title: {
        fontFamily: 'Lora_600SemiBold',
        color: '#2b3e50',
        fontSize: 20,
        borderBottomWidth: 1,
        margin: 5,
    }
})