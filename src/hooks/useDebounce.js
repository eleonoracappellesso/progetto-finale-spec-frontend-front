import { useState, useEffect } from 'react';

// Custom hook per "ritardare" l'aggiornamento di un valore
// Utile per evitare troppi re-render o chiamate API mentre l'utente sta digitando
export function useDebounce(value, delay) {
    // Stato per il valore "ritardato"
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Imposta un timer che aggiornerà il valore debounced dopo il 'delay' specificato
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Funzione di pulizia: cancella il timer se il 'value' o il 'delay' cambiano
        // prima che il timer sia scattato. Questo è il cuore del debounce.
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // L'effetto si riattiva solo se il valore o il delay cambiano

    return debouncedValue;
}