import { NavigationContainer } from '@react-navigation/native';
import { CurrencyProvider } from './src/contexts/CurrencyContext';
import Routes from './src/routes/routes';
import CartProvider from './src/contexts/CartContext';
import AuthProvider from './src/contexts/AuthContext';
import FavoritesProvider from './src/contexts/FavoritesContext';


export default function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <FavoritesProvider>
          <CartProvider>
            
              <NavigationContainer>
                <Routes />
              </NavigationContainer>
            
          </CartProvider>
        </FavoritesProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

// CORES DO APP
// AZUL ESCURO: #2b3e50
// AZUL CLARO: #A9CCE3
// BRANCO: #ECF0F1
// VERMELHOR: #bf3f3f 

//Email: admin@bytebox.com
//password: bytebox@2025