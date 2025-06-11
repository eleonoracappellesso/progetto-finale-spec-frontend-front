import React, { useState, useEffect, useMemo } from 'react';
import FavoritesAlert from '../components/FavoritesAlert';
import { useFetch } from '../hooks/useFetch';
import { useCoffee } from '../contexts/CoffeeContext';
import Filters from '../components/Filters';
import CoffeeItem from '../components/CoffeeItem';
import { useFavorites } from '../utils/favorites';
import { useDebounce } from '../hooks/useDebounce';

function CoffeeList() {
    const { data, loading, error } = useFetch('/coffees');
    const { setCoffees, favorites, setFavorites } = useCoffee();
    const { handleFavorite, showAlert, alertMessage, setShowAlert } = useFavorites();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    //Creo un valore debounced per la ricerca
    const debouncedSearch = useDebounce(search, 500); // Ritardo di 500ms

    useEffect(() => {
        if (data) setCoffees(data);
    }, [data, setCoffees]);

    const filteredCoffees = useMemo(() => {
        if (!data) return [];
        let result = [...data];
        //Uso il valore debounced per filtrare
        if (debouncedSearch) {
            result = result.filter(c => c.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
        }
        if (category) result = result.filter(c => c.category === category);
        if (sortBy === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortBy === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
        else if (sortBy === 'category-asc') result.sort((a, b) => a.category.localeCompare(b.category));
        else if (sortBy === 'category-desc') result.sort((a, b) => b.category.localeCompare(a.category));
        return result;
        //Aggiungo il valore debounced alle dipendenze di useMemo
    }, [data, debouncedSearch, category, sortBy]);

    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div>
            <h1>☕ Coffee List</h1>

            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            <div className="filter-div">
                <Filters
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    setCategory={setCategory}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                {(search || category || sortBy) && (
                    <button className="reset-btn" onClick={() => {
                        setSearch('');
                        setCategory('');
                        setSortBy('');
                    }}>
                        Reset filtri
                    </button>
                )}
            </div>

            {filteredCoffees.length === 0 ? (
                <p>Nessun caffè trovato.</p>
            ) : (
                filteredCoffees.map(coffee => (
                    <CoffeeItem
                        key={coffee.id}
                        coffee={coffee}
                        onFavorite={() => handleFavorite(coffee, favorites, setFavorites)}
                    />
                ))
            )}
        </div>
    );
}

export default React.memo(CoffeeList);