import React, { useState } from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const FavoriteButton = ({ coffee, onFavorite }) => {
    const { favorites } = useCoffee();

    return (
        <button onClick={() => onFavorite(coffee)}>
            {favorites.includes(coffee.id) ? (
                <AiFillHeart color="red" size={24} />
            ) : (
                <AiOutlineHeart size={24} />
            )}
        </button>
    );
};

export default FavoriteButton;