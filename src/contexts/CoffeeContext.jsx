import { createContext, useState, useContext } from 'react';

// Creazione del contesto
const CoffeeContext = createContext();

// Provider del contesto per fornire dati a tutta l'app
export const CoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]); // Stato globale per i caffè

    return (
        <CoffeeContext.Provider value={{ coffees, setCoffees }}>
            {children}
        </CoffeeContext.Provider>
    );
};

// Custom hook per usare il contesto in modo comodo
export const useCoffee = () => useContext(CoffeeContext);
