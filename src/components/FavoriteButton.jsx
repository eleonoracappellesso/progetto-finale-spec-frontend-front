import React from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const FavoriteButton = ({ coffee, onFavorite }) => {
    // Usa il contesto solo per sapere se l'elemento è nei preferiti
    const { favorites } = useCoffee();

    return (
        <button
            // Chiama la funzione passata dal genitore (es. toggleFavorite)
            onClick={onFavorite}
            className='heart-btn'
        >
            {favorites.includes(coffee.id) ? (
                <AiFillHeart color="red" size={24} />
            ) : (
                <AiOutlineHeart color="gray" size={24} />
            )}
        </button>
    );
};

export default React.memo(FavoriteButton);