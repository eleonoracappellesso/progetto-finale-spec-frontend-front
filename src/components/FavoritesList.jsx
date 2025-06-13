import React from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import CoffeeItem from './CoffeeItem';
import FavoritesAlert from './FavoritesAlert';

function FavoritesList() {
    const {
        coffees,
        favorites,
        toggleFavorite,
        showAlert,
        alertMessage,
        setShowAlert
    } = useCoffee();

    return (
        <div className='favorites-list'>
            <h2>Favorites:</h2>

            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            {favorites.length === 0 ? (
                <p>La tua lista di preferiti è vuota. Aggiungine qualcuno dalla lista principale!</p>
            ) : (
                <ul>
                    {favorites.map(id => {
                        const coffee = coffees.find(c => c.id === id);
                        return coffee ? (
                            <li key={id}>
                                <CoffeeItem
                                    coffee={coffee}
                                    onFavorite={() => toggleFavorite(coffee)}
                                />
                            </li>
                        ) : null;
                    })}
                </ul>
            )}
        </div>
    );
}

export default React.memo(FavoritesList);