import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

const CoffeeItem = ({ coffee }) => (
    <div className='item-div'>
        <Link to={`/coffees/${coffee.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong>{coffee.title}</strong> {coffee.category}
        </Link>
        <FavoriteButton coffee={coffee} />
    </div>
);

export default React.memo(CoffeeItem);