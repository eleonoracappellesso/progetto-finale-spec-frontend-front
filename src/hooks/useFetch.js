import { useState, useEffect, useCallback } from "react";

/*
Hook personalizzato per effttuare una chiamata fetch a un endpoint specificato da path.
Gestisce lo stato di caricamento, dati ricevuti ed eventuali errori
*/
export function useFetch(path) {
    //Stato per memorizzare i dati ricevuti
    const [data, setData] = useState(null);
    //Stato che indica se la fetch è in corso
    const [loading, setLoading] = useState(true);
    //Stato per memorizzare eventuali errori durante la fetch
    const [error, setError] = useState(null);

    //Funzione fetch memorizzata con useCallback per evitare ricreazioni inutili
    const fetchData = useCallback(async () => {
        try {
            setLoading(true); //inizio caricamento
            const baseURL = 'http://localhost:3001'; //url dal server API
            const res = await fetch(baseURL + path); //effettuo la chiamata
            if (!res.ok) throw new Error('Errore nella richiesta al server'); //Controllo esito
            const json = await res.json(); //Converto la risposta in JSON
            setData(json); //Aggiorno lo stato dati
        } catch (err) {
            console.error('Errore fetch:', err); //Log dell'errore
            setError(err.message); //Salvo il messaggio di errore
        } finally {
            setLoading(false); //Fine caricamento
        }
    }, [path]); //Dipende dal path, dunque verrà aggiornata solo se cambia il path

    //Effetto che esegue fetchData al montaggio del componente o quando cambia la funzione fetchData (quindi al cambiare del path)
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    //Restituisco i dati, sato loading, errore e funzione per rifare la fetch
    return { data, loading, error, refetch: fetchData };
}
