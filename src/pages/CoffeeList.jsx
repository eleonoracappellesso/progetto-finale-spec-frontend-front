import React, { useState, useMemo } from 'react';
//Context globale per accedere ai dati
import { useCoffee } from '../contexts/CoffeeContext';
//Hook custom per 'ritardare' il search
import { useDebounce } from '../hooks/useDebounce';

//import componenti
import CoffeeItem from '../components/CoffeeItem';
import Filters from '../components/Filters';
import FavoritesAlert from '../components/FavoritesAlert';

function CoffeeList() {
    //Estrae dati e metodi dal context
    const {
        coffees,
        loading,
        error,
        showAlert,
        alertMessage,
        setShowAlert
    } = useCoffee();

    //Stati locali per i filtri
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [sortBy, setSortBy] = useState('');

    //Applica un debunce per evitare ricerche ad ogni singola lettera digitata
    const debouncedSearch = useDebounce(search, 1000);

    //Filtro e ordinamento memorizzati con useMemo per performance
    const filteredCoffees = useMemo(() => {
        if (!coffees) return [];

        let result = [...coffees];

        //Filtro per titolo
        if (debouncedSearch) result = result.filter(c => c.title.toLowerCase().includes(debouncedSearch.toLowerCase()));

        //Filtro per categoria
        if (category) result = result.filter(c => c.category === category);

        //Ordinamento
        if (sortBy === 'title-asc') result.sort((a, b) => a.title.localeCompare(b.title));
        else if (sortBy === 'title-desc') result.sort((a, b) => b.title.localeCompare(a.title));
        else if (sortBy === 'category-asc') result.sort((a, b) => a.category.localeCompare(b.category));
        else if (sortBy === 'category-desc') result.sort((a, b) => b.category.localeCompare(a.category));
        return result;
    }, [coffees, debouncedSearch, category, sortBy]);

    //Stato di caricamento
    if (loading) return <p>Caricamento in corso...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div>
            <h1>☕ Coffee List</h1>

            {/* Alert per feedback "aggiunto/rimosso dai preferiti" */}
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

                {/* Bottone per resettare i filtri, visibile solo se attivi */}

                {(search || category || sortBy) && (
                    <button className="reset-btn" onClick={() => { setSearch(''); setCategory(''); setSortBy(''); }}>
                        Reset filtri
                    </button>
                )}
            </div>

            {/* Lista filtrata dei caffè */}
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

//Esporto il componente con React.memo per evitare render inutili
export default React.memo(CoffeeList);