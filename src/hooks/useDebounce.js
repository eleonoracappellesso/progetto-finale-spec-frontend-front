import { useState, useEffect } from 'react';

/*
Custom hook per "ritardare" l'aggiornamento di un valore
Utile per evitare troppi re-render o chiamate API mentre l'utente sta digitando
Parametri:
- value: valore da monitorare
- delay: tempo di attesa in millisecondi prima di aggiornare 'debouncedValue'
*/
export function useDebounce(value, delay) {
    // Stato per il valore "ritardato"
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Imposta un timer che aggiornerà il valore debounced dopo il 'delay' specificato
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        /*
        Funzione di pulizia: cancella il timer se 'value' o 'delay' cambiano prima che il timer sia scattato. Questo evita aggiornamenti non necessari e implementa il meccanismo di debounce
        */
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); //L'effetto si riattiva solo se il valore o il delay cambiano

    //restituisce il valore 'ritardato'
    return debouncedValue;
}