import { createContext, useState, useContext } from 'react';

// Creazione del contesto
const CoffeeContext = createContext();

// Provider del contesto per fornire dati a tutta l'app
export const CoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]); // Stato globale per i caffè
    const [compareList, setCompareList] = useState([]); // mex 2 caffè per confronto
    const [favorites, setFavorites] = useState([]); //Stato globale per i caffè preferiti

    // //Funzione che aggiunge un caffè alla lista di confronto
    // const addToCompare = (coffee) => {
    //     setCompareList(prev => {
    //         if (prev.find(c => c.id === coffee.id)) return prev; //già presente
    //         if (prev.length >= 2) return [prev[1], coffee]; //rimuove il più vecchio
    //         return [...prev, coffee];
    //     });
    // };

    // //Funzione che rimuove un caffè dalla lista di confronto
    // const removeFromCompare = (id) => {
    //     setCompareList(prev => prev.filter(c => c.id !== id));
    // };

    return (
        <CoffeeContext.Provider value={{
            coffees,
            setCoffees,
            compareList,
            favorites,
            setFavorites
            // addToCompare,
            // removeFromCompare
        }}>
            {children}
        </CoffeeContext.Provider>
    );
};

// Custom hook per usare il contesto in modo comodo
export const useCoffee = () => useContext(CoffeeContext);
