// src/components/FavoriteButton.jsx
import React from 'react';
import { useCoffee } from '../contexts/CoffeeContext';

const FavoriteButton = ({ coffee }) => {
    const { favorites, setFavorites } = useCoffee();

    const handleFavorite = () => {
        if (favorites.includes(coffee.id)) {
            setFavorites(favorites.filter(id => id !== coffee.id));
        } else {
            setFavorites([...favorites, coffee.id]);
        }
    };

    return (
        <button onClick={handleFavorite}>
            {favorites.includes(coffee.id) ? 'Rimuovi dai preferiti' : 'Aggiungi ai preferiti'}
        </button>
    );
};