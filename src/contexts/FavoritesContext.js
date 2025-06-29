import { createContext, useContext, useEffect, useRef, useState } from "react";
import CurrencyContext from "./CurrencyContext";
import { getProductById } from '../services/ProductService'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { currency } = useContext(CurrencyContext);
  const { user } = useAuth();

// 1. Crie uma referência para controlar se é a primeira renderização
  const isInitialMount = useRef(true);

  // EFEITO 1: Roda quando o usuário muda (login/logout) para CARREGAR os dados.
  useEffect(() => {
    async function loadFavoritesData() {
      if (!user) {
        setFavoriteItems([]); // Se fez logout, limpa os favoritos da memória
        return;
      }
      
      const favoritesKey = `@APP_favorites_${user.id}`;
      try {
        const savedFavorites = await AsyncStorage.getItem(favoritesKey);
        if (savedFavorites !== null) {
          setFavoriteItems(JSON.parse(savedFavorites));
        } else {
          setFavoriteItems([]); // Inicia com array vazio se for o primeiro acesso do usuário
        }
      } catch (e) {
        console.error("Falha ao carregar os favoritos do AsyncStorage.", e);
      }
    }

    loadFavoritesData();
  }, [user]); // Dependência: 'user'

  
  // EFEITO 2: Roda sempre que a lista de favoritos é alterada, para SALVAR os dados.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return; // Pula a primeira execução
    }

    async function saveFavoritesData() {
      if (user) {
        const favoritesKey = `@APP_favorites_${user.id}`;
        try {
          await AsyncStorage.setItem(favoritesKey, JSON.stringify(favoriteItems));
        } catch (e) {
          console.error("Falha ao salvar os favoritos no AsyncStorage.", e);
        }
      }
    }

    saveFavoritesData();
  }, [favoriteItems, user]);


  // 2. Este useEffect agora contém toda a lógica de atualização
  useEffect(() => {
    // 3. Verificação para NÃO rodar na primeira vez que o componente monta
    if (isInitialMount.current) {
      isInitialMount.current = false; // Marca que a montagem inicial já passou
      return; // Para a execução aqui
    }

    // Lógica para atualizar os preços (antes era a função 'updateFavoritesPrices')
    const updatePrices = async () => {
      if (favoriteItems.length === 0) {
        return; // Não faz nada se não houver favoritos
      }

      console.log(`Moeda mudou para ${currency}. Atualizando preços dos favoritos...`);

      try {
        const updatePromises = favoriteItems.map(item => getProductById(item.id, currency));
        const updatedProductsData = await Promise.all(updatePromises);

        const newFavoriteItems = favoriteItems.map(oldItem => {
          const updatedProductResponse = updatedProductsData.find(
            p => p.product.id === oldItem.id
          );
          if (updatedProductResponse && updatedProductResponse.product) {
            // Retorna o produto com os dados atualizados
            return updatedProductResponse.product;
          }
          return oldItem;
        });

        setFavoriteItems(newFavoriteItems);

      } catch (error) {
        console.error("Erro ao atualizar preços dos favoritos:", error);
      }
    };

    updatePrices();

  }, [currency]); // O gatilho continua sendo a mudança de moeda.

  function toggleFavorite(item) {
    setFavoriteItems((currentItems) => {
      const isAlreadyFavorite = currentItems.some(fav => fav.id === item.id);

      if (isAlreadyFavorite) {
        return currentItems.filter(fav => fav.id !== item.id);
      } else {
        return [...currentItems, item];
      }
    });
  }

  function removeFavorite(itemId) {
    setFavoriteItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
  }


  function isFavorite(itemId) {
    return favoriteItems.some((item) => item.id === itemId);
  }

  const favoritesCount = favoriteItems.length;

  const value = {
    favoriteItems,
    toggleFavorite,
    removeFavorite,
    isFavorite,
    favoritesCount,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
