import { NavigationContainer } from '@react-navigation/native';
import { CurrencyProvider } from './src/contexts/CurrencyContext';
import Routes from './src/routes/routes';
import CartProvider from './src/contexts/CartContext';
import AuthProvider from './src/contexts/AuthContext';
import FavoritesProvider from './src/contexts/FavoritesContext';
import { OrdersProvider } from './src/contexts/OrdersContext'; // ✅ Importado aqui

export default function App() {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <CartProvider>
          <CurrencyProvider>
            <OrdersProvider> 
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            </OrdersProvider>
          </CurrencyProvider>
        </CartProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

// CORES DO APP
// AZUL ESCURO: #2b3e50
// AZUL CLARO: #A9CCE3
// BRANCO: #ECF0F1
