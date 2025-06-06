import React, { createContext, useState} from "react";

const CurrencyContext = createContext();

export function CurrencyProvider  ({ children }) {
    const [currency, setCurrency] = useState('usa');

    // função para mudar a currency que o header vai usar
    const changeCurrency = () => {
        setCurrency( currentCurrency => (currentCurrency === 'usa' ? 'brl' : 'usa'));
    };

    // o valor que vai ser compartilhado com os componentes
    const value = {currency, changeCurrency};

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyContext;