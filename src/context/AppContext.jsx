import { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  
  // Simplified to one canteen
  const canteen = { id: 'main_canteen', name: 'SSN Main Canteen' };

  const menu = [
    { id: 'p1', name: 'Veg Fried Rice', price: 60 },
    { id: 'p2', name: 'Gobi Manchurian', price: 70 },
    { id: 'p3', name: 'Parotta', price: 20 },
    { id: 'p4', name: 'Chicken Biryani', price: 120 },
    { id: 'p5', name: 'Egg Noodles', price: 80 },
    { id: 'p6', name: 'Chilli Chicken', price: 100 },
    { id: 'p7', name: 'Sandwich', price: 50 },
    { id: 'p8', name: 'Coffee', price: 20 },
    { id: 'p9', name: 'Puffs', price: 15 },
  ];

  // Note: selectedCanteen is no longer needed
  const value = { cart, setCart, canteen, menu };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};