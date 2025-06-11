import { createContext, useState, useContext, useEffect } from 'react';

// Creazione del contesto
const CoffeeContext = createContext();

// Provider del contesto per fornire dati a tutta l'app
export const CoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]); // Stato globale per i caffè
    const [compareList, setCompareList] = useState([]); // mex 2 caffè per confronto

    // Stato per i preferiti, inizializzato leggendo dal localStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('coffeeFavorites');
            // Se troviamo dati nel localStorage, li parsiamo, altrimenti usiamo un array vuoto
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
            // In caso di errore (es. JSON malformato), partiamo con un array vuoto
            return [];
        }
    });

    // useEffect per salvare i preferiti nel localStorage ogni volta che cambiano
    useEffect(() => {
        try {
            localStorage.setItem('coffeeFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Could not save favorites to localStorage", error);
        }
    }, [favorites]); // La dipendenza [favorites] assicura che questo effetto venga eseguito solo quando lo stato dei preferiti cambia

    return (
        <CoffeeContext.Provider value={{
            coffees,
            setCoffees,
            compareList,
            setCompareList,
            favorites,
            setFavorites
        }}>
            {children}
        </CoffeeContext.Provider>
    );
};

// Custom hook per usare il contesto in modo comodo
export const useCoffee = () => useContext(CoffeeContext);