import { createContext, useState, useContext, useEffect } from 'react';

const CoffeeContext = createContext();

export const CoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [compareList, setCompareList] = useState([]);

    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('coffeeFavorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
            return [];
        }
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const toggleFavorite = (coffee) => {
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
        setTimeout(() => setShowAlert(false), 5000);
    };

    // Effetto per la persistenza su localStorage
    useEffect(() => {
        try {
            localStorage.setItem('coffeeFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Could not save favorites to localStorage", error);
        }
    }, [favorites]);

    // --- FINE LOGICA PREFERITI ---

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

    const contextValue = {
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
    };

    return (
        <CoffeeContext.Provider value={contextValue}>
            {children}
        </CoffeeContext.Provider>
    );
};

export const useCoffee = () => useContext(CoffeeContext);