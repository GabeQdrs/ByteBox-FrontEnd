import React, { createContext, useState} from "react";

const CurrencyContext = createContext();

export function CurrencyProvider  ({ children }) {
    const [currency, setCurrency] = useState('BRL');

    const changeCurrency = () => {
        setCurrency( currentCurrency => {
            if (currentCurrency === 'BRL') {
                return 'USD';
            } else if (currentCurrency === 'USD') {
                return 'EUR';
            } else {
                return 'BRL';
            }
        });
    };

    const value = {currency, changeCurrency};

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyContext;