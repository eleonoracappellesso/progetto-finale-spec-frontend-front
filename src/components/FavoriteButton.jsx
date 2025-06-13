import React, { useCallback } from 'react';
import { useCoffee } from '../contexts/CoffeeContext';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

const FavoriteButton = ({ coffee }) => {
    //Ottiene sia lo stato che la funzione per modificarlo dal contesto
    const { favorites, toggleFavorite } = useCoffee();

    //Crea e memorizza un gestore di click specifico per questo bottone
    const handleFavoriteClick = useCallback(() => {
        toggleFavorite(coffee);
    }, [toggleFavorite, coffee]); //Si aggiorna solo se il caffè o la funzione cambiano

    return (
        <button
            onClick={handleFavoriteClick}
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