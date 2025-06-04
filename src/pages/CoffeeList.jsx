import React, { useState, useEffect, useMemo } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useCoffee } from '../contexts/CoffeeContext';
import Filters from '../components/Filters';
import CoffeeItem from '../components/CoffeeItem';

// Pagina principale che mostra lista dei caffè con filtri e ordinamento
export default function CoffeeList() {
    // Otteniamo i dati dal backend tramite hook personalizzato
    const { data, loading, error } = useFetch('/coffees');

    // Stato globale condiviso (es. in futuro per modifica/eliminazione)
    const { setCoffees } = useCoffee();

    // Stati locali per filtri e ordinamento
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    // Aggiorna contesto globale quando arrivano i dati
    useEffect(() => {
        if (data) setCoffees(data);
    }, [data, setCoffees]);

    // Applica ricerca, filtro e ordinamento in modo memorizzato (useMemo)
    const filteredCoffees = useMemo(() => {
        if (!data) return [];

        let result = [...data];

        // Filtro per titolo
        if (search) {
            result = result.filter(coffee =>
                coffee.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Filtro per categoria
        if (category) {
            result = result.filter(coffee => coffee.category === category);
        }

        // Ordinamento
        if (sortBy === 'title-asc') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'title-desc') {
            result.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortBy === 'category-asc') {
            result.sort((a, b) => a.category.localeCompare(b.category));
        } else if (sortBy === 'category-desc') {

            result.sort((a, b) => b.category.localeCompare(a.category));
        }

        return result;
    }, [data, search, category, sortBy]);

    // Stato di caricamento o errore
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div>
            <h1>☕ Lista dei Caffè</h1>

            {/* Sezione filtri */}
            <Filters
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />

            {/* Lista dei caffè filtrati */}
            {filteredCoffees.length === 0 ? (
                <p>Nessun caffè trovato.</p>
            ) : (
                filteredCoffees.map(coffee => (
                    <CoffeeItem key={coffee.id} coffee={coffee} />
                ))
            )}
        </div>
    );
}
