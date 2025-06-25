import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export default function FavoritesProvider({ children }) {
  const [favoriteItems, setFavoriteItems] = useState([]);

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
