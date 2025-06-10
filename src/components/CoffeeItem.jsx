import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton'

// Componente per mostrare singolo caffè (titolo e categoria)
const CoffeeItem = ({ coffee, onFavorite }) => (
    <div className='item-div'>
        <Link to={`/coffees/${coffee.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong>{coffee.title}</strong> {coffee.category}
        </Link>
        <FavoriteButton coffee={coffee} onFavorite={onFavorite} />
    </div>
);

// React.memo evita render inutili se le props non cambiano
export default React.memo(CoffeeItem);
