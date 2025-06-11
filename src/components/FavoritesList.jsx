import React from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import { useFavorites } from '../utils/favorites';
import CoffeeItem from './CoffeeItem';
import FavoritesAlert from './FavoritesAlert';

export default function FavoritesList() {
    const { coffees, favorites, setFavorites } = useCoffee();
    const { handleFavorite, showAlert, setShowAlert, alertMessage } = useFavorites();

    return (
        <div className='favorites-list'>
            <h2>Favorites:</h2>

            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            <ul>
                {favorites.map(id => (
                    <li key={id}>
                        {coffees.find(coffee => coffee.id === id) && (
                            <CoffeeItem coffee={coffees.find(coffee => coffee.id === id)} onFavorite={() => handleFavorite(coffees.find(coffee => coffee.id === id), favorites, setFavorites)} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}