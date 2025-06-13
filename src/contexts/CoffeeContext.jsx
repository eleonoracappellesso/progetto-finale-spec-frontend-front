import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
    //Stati esistenti
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [compareList, setCompareList] = useState([]);

    //Stato dei preferiti con localStorage
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('coffeeFavorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
            return [];
        }
    });

    //Stati per l'alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //Funzione per aggiungere/rimuovere un preferito, memorizzata con useCallback
    const toggleFavorite = useCallback((coffee) => {
        setFavorites(prevFavorites => {
            if (prevFavorites.includes(coffee.id)) {
                setAlertMessage(`${coffee.title} correctly removed from favorites`);
                return prevFavorites.filter(id => id !== coffee.id);
            } else {
                setAlertMessage(`${coffee.title} correctly added to favorites`);
                return [...prevFavorites, coffee.id];
            }
        });

        setShowAlert(true);
        //Uso un riferimento a un timer per pulirlo se necessario
        const timerId = setTimeout(() => setShowAlert(false), 5000);
        return () => clearTimeout(timerId);
    }, []); //Dipendenze vuote perché le funzioni setState sono stabili

    //Effetto per la persistenza su localStorage
    useEffect(() => {
        try {
            localStorage.setItem('coffeeFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Could not save favorites to localStorage", error);
        }
    }, [favorites]);

    //Effetto per il caricamento globale dei caffè
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
    }, []);

    //Il valore del contesto è memorizzato con useMemo per evitare re-render non necessari dei consumer
    const contextValue = useMemo(() => ({
        coffees,
        loading,
        error,
        compareList,
        setCompareList,
        favorites,
        toggleFavorite,
        showAlert,
        alertMessage,
        setShowAlert
    }), [coffees, loading, error, compareList, favorites, toggleFavorite, showAlert, alertMessage]);

    return (
        <CoffeeContext.Provider value={contextValue}>
            {children}
        </CoffeeContext.Provider>
    );
};

export const useCoffee = () => useContext(CoffeeContext);