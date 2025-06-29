import { createContext, useContext, useEffect, useRef, useState } from "react";
import CurrencyContext from "./CurrencyContext";
import { productService } from '../services/ProductService';
import { getProductById } from '../services/ProductService'; 


const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const { currency } = useContext(CurrencyContext);

// 1. Crie uma referência para controlar se é a primeira renderização
  const isInitialMount = useRef(true);


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
