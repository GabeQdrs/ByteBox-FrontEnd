import { NavigationContainer } from '@react-navigation/native';
import { CurrencyProvider } from './src/contexts/CurrencyContext';
import Routes from './src/routes/routes';
import CartProvider from './src/contexts/CartContext';
import AuthProvider from './src/contexts/AuthContext';


export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <CurrencyProvider>
          <NavigationContainer>
            <Routes/>
          </NavigationContainer>
        </CurrencyProvider>
      </CartProvider>
    </AuthProvider>

  );
}

// CORES DO APP
// AZUL ESCURO: #2b3e50
// AZUL CLARO: #A9CCE3
// BRANCO: #ECF0F1