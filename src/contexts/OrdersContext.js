import React, { createContext, useContext, useState } from 'react';

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (items) => {
    const newOrder = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      items,
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
