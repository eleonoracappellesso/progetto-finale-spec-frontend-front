import { createContext, useState, useContext, useEffect } from 'react';

// Creazione del contesto
const CoffeeContext = createContext();

// Provider del contesto per fornire dati a tutta l'app
export const CoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]); // Stato globale per i caffè
    const [loading, setLoading] = useState(true); // Stato di caricamento globale
    const [error, setError] = useState(null); // Stato di errore globale

    const [compareList, setCompareList] = useState([]); // max 2 caffè per confronto

    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('coffeeFavorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
            return [];
        }
    });

    // Effetto per caricare i caffè una sola volta, quando il provider viene montato
    useEffect(() => {
        const fetchAllCoffees = async () => {
            try {
                setLoading(true);
                const res = await fetch('http://localhost:3001/coffees');
                if (!res.ok) throw new Error('Errore nella richiesta al server');
                const data = await res.json();
                setCoffees(data);
                setError(null);
            } catch (err) {
                console.error('Errore fetch globale:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllCoffees();
    }, []); // L'array vuoto [] assicura che l'effetto venga eseguito solo una volta

    // Effetto per salvare i preferiti nel localStorage
    useEffect(() => {
        try {
            localStorage.setItem('coffeeFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Could not save favorites to localStorage", error);
        }
    }, [favorites]);

    return (
        <CoffeeContext.Provider value={{
            coffees,
            loading,
            error,
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