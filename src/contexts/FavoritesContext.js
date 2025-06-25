import React, { createContext, useContext, useReducer } from 'react';

// Estado inicial
const initialState = {
  favorites: [],
};

// Tipos de ações
const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

// Redutor
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      // Evita duplicados
      if (state.favorites.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };

    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(item => item.id !== action.payload),
      };

    default:
      return state;
  }
};

// Criação do contexto
const FavoritesContext = createContext();

// Hook de uso
export const useFavorites = () => useContext(FavoritesContext);

// Provider
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  const addToFavorites = (item) => {
    dispatch({ type: ADD_TO_FAVORITES, payload: item });
  };

  const removeFromFavorites = (id) => {
    dispatch({ type: REMOVE_FROM_FAVORITES, payload: id });
  };

  const isFavorite = (id) => {
    return state.favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
