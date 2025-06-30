import { createContext, useContext, useEffect, useRef, useState } from "react";
import CurrencyContext from './CurrencyContext'; 
import { getProductById } from '../services/ProductService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from './AuthContext'; 

const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const { currency } = useContext(CurrencyContext);
    const { user } = useAuth();

    const isInitialMount = useRef(true);

  useEffect(() => {
    async function loadCartData() {
      // Se não há usuário, limpe o carrinho e não faça mais nada
      if (!user) {
        setCartItems([]);
        return;
      }
      
      
      const cartKey = `@APP_cart_${user.id}`;
      try {
        const savedCart = await AsyncStorage.getItem(cartKey);
        if (savedCart !== null) {
          setCartItems(JSON.parse(savedCart));
        } else {
          
          setCartItems([]);
        }
      } catch (e) {
        console.error("Falha ao carregar o carrinho do AsyncStorage.", e);
      }
    }

    loadCartData();
  }, [user]); 

  
 
  useEffect(() => {
    
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    async function saveCartData() {
     
      if (user) {
        const cartKey = `@APP_cart_${user.id}`;
        try {
          await AsyncStorage.setItem(cartKey, JSON.stringify(cartItems));
        } catch (e) {
          console.error("Falha ao salvar o carrinho no AsyncStorage.", e);
        }
      }
    }

    saveCartData();
  }, [cartItems, user]); 


    const updateCartPrices = async () => {
        if (cartItems.length === 0) {
            return;
        }

        console.log(`Moeda mudou para ${currency}. Atualizando preços do carrinho...`);

        try {
            const updatePromises = cartItems.map(item => getProductById(item.id, currency));
            const updatedProductsData = await Promise.all(updatePromises);

            const newCartItems = cartItems.map(oldItem => {
                const updatedProductResponse = updatedProductsData.find(
                    p => p.product.id === oldItem.id
                );
                if (updatedProductResponse && updatedProductResponse.product) {
                    return {
                        ...updatedProductResponse.product, 
                        quantity: oldItem.quantity, 
                    };
                }
                return oldItem;
            });
            setCartItems(newCartItems);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        updateCartPrices();
    }, [currency]);


    function addToCart( product, quantity = 1) {
        setCartItems((currentItems) => {
            const index = currentItems.findIndex((item) => item.id === product.id);

            if (index >= 0) {
                const updatedItems = [...currentItems];
                updatedItems[index].quantity += quantity;
                return updatedItems;
            } else { 
                return [...currentItems, { ...product, quantity }];
            }
        });
    }
    
    function removeFromCart(productId) {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.id !== productId)
        );
    }

    function increaseQuantity(productId) {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    function decreaseQuantity(productId) {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                    : item
            ).filter(item => item.quantity > 0) 
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartCount,
        decreaseQuantity,
        increaseQuantity,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext);