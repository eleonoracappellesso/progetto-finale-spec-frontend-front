import React from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import { useFavorites } from '../utils/favorites';
import CoffeeItem from './CoffeeItem';
import FavoritesAlert from './FavoritesAlert';

function FavoritesList() {
    const { coffees, favorites, setFavorites } = useCoffee();
    const { handleFavorite, showAlert, setShowAlert, alertMessage } = useFavorites();

    return (
        <div className='favorites-list'>
            <h2>Favorites:</h2>

            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            {/* controllo se la lista preferiti è vuota */}
            {favorites.length === 0 ? (
                <p>Your favorites list is empty. Add some from the main list!</p>
            ) : (
                <ul>
                    {favorites.map(id => {
                        const coffee = coffees.find(c => c.id === id);
                        return coffee ? (
                            <li key={id}>
                                <CoffeeItem
                                    coffee={coffee}
                                    onFavorite={() => handleFavorite(coffee, favorites, setFavorites)}
                                />
                            </li>
                        ) : null; // Aggiunto controllo per caffè non trovato
                    })}
                </ul>
            )}
        </div>
    );
}

export default React.memo(FavoritesList);