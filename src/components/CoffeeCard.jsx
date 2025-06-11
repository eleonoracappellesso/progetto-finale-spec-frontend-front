import React from 'react';
// import FavoriteButton from './FavoriteButton';

const CoffeeCard = ({ coffee }) => {
    return (
        <div>
            {/* <FavoriteButton coffee={coffee} onFavorite={onFavorite} /> */}
            <h2>{coffee.title}</h2>
            <p><strong>Category:</strong> {coffee.category}</p>
            <p><strong>Roastery:</strong> {coffee.roaster}</p>
            <p><strong>Origin:</strong> {coffee.origin}</p>
            <p><strong>Process:</strong> {coffee.process}</p>
            <p><strong>Roast Level:</strong> {coffee.roastLevel}</p>
            <p><strong>Quantity:</strong> {coffee.grams}g</p>
            <p><strong>Price:</strong> € {coffee.price}</p>
            <p><strong>Rating:</strong> {coffee.rating}/10 ⭐ </p>
        </div>
    );
};

export default React.memo(CoffeeCard);