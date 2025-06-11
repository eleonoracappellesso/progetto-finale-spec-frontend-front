import React from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const FavoriteButton = ({ coffee, onFavorite }) => {
    const { favorites } = useCoffee();

    return (
        <button
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