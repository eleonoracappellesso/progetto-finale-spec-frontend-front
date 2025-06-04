import React, { useRef, useEffect } from 'react';

// Componente per input di ricerca, selezione categoria, ordinamento
const Filters = ({ search, setSearch, category, setCategory, sortBy, setSortBy }) => {
    const inputRef = useRef();

    // Focus automatico sull'input di ricerca
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div style={{ marginBottom: '20px' }}>
            {/* Input per cercare nel titolo */}
            <input
                ref={inputRef}
                placeholder="Cerca per titolo..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            {/* Filtro per categoria */}
            <select onChange={e => setCategory(e.target.value)} value={category}>
                <option value="">Tutte le categorie</option>
                <option value="Arabica">Arabica</option>
                <option value="Blend">Blend</option>
                <option value="Robusta">Robusta</option>
                <option value="Specialty">Specialty</option>
                <option value="Organic">Organic</option>
            </select>

            {/* Ordinamento */}
            <select onChange={e => setSortBy(e.target.value)} value={sortBy}>
                <option value="">Ordina</option>
                <option value="title-asc">Titolo A-Z</option>
                <option value="title-desc">Titolo Z-A</option>
                <option value="category-asc">Categoria A-Z</option>
                <option value="category-desc">Categoria Z-A</option>
            </select>
        </div>
    );
};

// React.memo evita re-render inutili
export default React.memo(Filters);
