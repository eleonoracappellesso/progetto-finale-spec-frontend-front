//Importo hook React per gestire stato, effetti e ottimizzazione
import { createContext, useState, useContext, useEffect, useCallback, useMemo } from 'react';

//Creo il contesto globale per i dati relativi ai caffè
const CoffeeContext = createContext();

//Componente provider che incapsula l'app e fornisce i dati del contesto
export const CoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]); //Stato che contiene tutti i caffè disponibili
    const [loading, setLoading] = useState(true); //Stato per indicare se i dati stanno ancora caricando
    const [error, setError] = useState(null); //Stato per gestire eventuali errori durante il fetch
    const [compareList, setCompareList] = useState([]); //Stato per una lista temporanea di caffè da confrontare

    //Stato dei preferiti, inizializzato da localStorage se disponibile
    const [favorites, setFavorites] = useState(() => {
        try {
            const savedFavorites = localStorage.getItem('coffeeFavorites');
            return savedFavorites ? JSON.parse(savedFavorites) : [];
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
            return [];
        }
    });

    //Stati per mostrare alert e messaggio
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    //Funzione per aggiungere/rimuovere un preferito e mostrare un msg all'utente, memorizzata con useCallback
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
        //Chiude l'alert automaticamente dopo 5 secondi
        const timerId = setTimeout(() => setShowAlert(false), 5000);
        return () => clearTimeout(timerId); // Restituisce una funzione di cleanup per sicurezza
    }, []);

    //Effetto che salva la lista dei preferiti su localStorage ogni volta che cambia
    useEffect(() => {
        try {
            localStorage.setItem('coffeeFavorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Could not save favorites to localStorage", error);
        }
    }, [favorites]);

    //Effetto per il caricamento globale dei caffè all'avvio dell'app
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

    //Costruisco il valore del contesto con useMemo per evitare calcoli inutili
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

    //Ritorno il provider che avvolge l'applicazione
    return (
        <CoffeeContext.Provider value={contextValue}>
            {children}
        </CoffeeContext.Provider>
    );
};

//Hook personalizzato per accedere facilmente al contesto
export const useCoffee = () => useContext(CoffeeContext);