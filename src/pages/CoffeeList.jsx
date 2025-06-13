import React, { useState, useMemo } from 'react';
import FavoritesAlert from '../components/FavoritesAlert';
import { useCoffee } from '../contexts/CoffeeContext';
import Filters from '../components/Filters';
import CoffeeItem from '../components/CoffeeItem';
import { useDebounce } from '../hooks/useDebounce';

function CoffeeList() {
    const {
        coffees,
        loading,
        error,
        showAlert,
        alertMessage,
        setShowAlert
    } = useCoffee();

    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const debouncedSearch = useDebounce(search, 500);

    const filteredCoffees = useMemo(() => {
        if (!coffees) return [];
        let result = [...coffees];
        if (debouncedSearch) result = result.filter(c => c.title.toLowerCase().includes(debouncedSearch.toLowerCase()));
        if (category) result = result.filter(c => c.category === category);
        if (sortBy === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortBy === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
        else if (sortBy === 'category-asc') result.sort((a, b) => a.category.localeCompare(b.category));
        else if (sortBy === 'category-desc') result.sort((a, b) => b.category.localeCompare(a.category));
        return result;
    }, [coffees, debouncedSearch, category, sortBy]);

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
                    <button className="reset-btn" onClick={() => { setSearch(''); setCategory(''); setSortBy(''); }}>
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
                    />
                ))
            )}
        </div>
    );
}

export default React.memo(CoffeeList);