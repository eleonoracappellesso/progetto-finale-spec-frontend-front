import React, { useRef, useEffect } from 'react';

/*
  Componente Filters per filtrare e ordinare l'elenco dei caffè.
  Props ricevute:
  - search: stringa di ricerca attuale
  - setSearch: funzione per aggiornare la ricerca
  - category: categoria selezionata
  - setCategory: funzione per aggiornare la categoria
  - sortBy: criterio di ordinamento selezionato
  - setSortBy: funzione per aggiornare l'ordinamento
*/
const Filters = ({ search, setSearch, category, setCategory, sortBy, setSortBy }) => {
    //useRef per accedere direttamente all'input di ricerca
    const inputRef = useRef();

    //useEffect per impostare il focus automatico sull'input al montaggio del componente
    useEffect(() => {
        inputRef.current?.focus(); //Se l'input esiste imposta il focus
    }, []);

    return (
        <div className='filter-div'>
            {/* Input per cercare nel titolo */}
            <input
                ref={inputRef}
                placeholder="Search by name..."
                value={search}
                onChange={e => setSearch(e.target.value)} //Aggiorna lo stato della ricerca
            />

            {/* Filtro per categoria */}
            <select
                onChange={e => setCategory(e.target.value)} //Aggiorna la categoria selezionata
                value={category} //Categoria attuale
            >
                <option value="">All categories</option>
                <option value="Arabica">Arabica</option>
                <option value="Blend">Blend</option>
                <option value="Robusta">Robusta</option>
                <option value="Specialty">Specialty</option>
                <option value="Organic">Organic</option>
            </select>

            {/* Ordinamento */}
            <select
                onChange={e => setSortBy(e.target.value)} //Aggiorna il criterio di ordinamento
                value={sortBy} //Ordinamento attuale
            >
                <option value="">Order</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="category-asc">Category A-Z</option>
                <option value="category-desc">Category Z-A</option>
            </select>
        </div>
    );
};

//esporto il componente con React.memo per evitare re-render inutili
export default React.memo(Filters);
