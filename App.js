import { NavigationContainer } from '@react-navigation/native';
import { CurrencyProvider } from './src/contexts/CurrencyContext';
import Routes from './src/routes/routes';


export default function App() {
  return (
    <CurrencyProvider>
      <NavigationContainer>
        <Routes/>
      </NavigationContainer>
    </CurrencyProvider>

  );
}

// CORES DO APP
// AZUL ESCURO: #2b3e50
// AZUL CLARO: #A9CCE3
// BRANCO: #ECF0F1