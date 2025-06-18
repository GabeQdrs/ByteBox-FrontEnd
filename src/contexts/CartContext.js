import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

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
        // FAZER
    }

    function decreaseQuantity(productId) {
        // FAZER
    }

    function clearCart() {
        // FAZER
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