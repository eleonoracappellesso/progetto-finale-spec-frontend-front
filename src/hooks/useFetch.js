import { useState, useEffect, useCallback } from "react";

export function useFetch(path) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const baseURL = 'http://localhost:3001';
            const res = await fetch(baseURL + path);
            if (!res.ok) throw new Error('Errore nella richiesta al server');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Errore fetch:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [path]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, error, refetch: fetchData };
}
