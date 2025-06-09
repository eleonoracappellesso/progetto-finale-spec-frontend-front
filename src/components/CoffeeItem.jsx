import React from 'react';
import { Link } from 'react-router-dom';

// Componente per mostrare singolo caffè (titolo e categoria)
const CoffeeItem = ({ coffee }) => {
    return (
        <Link
            to={`/coffees/${coffee.id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div className='item-div'>
                <strong>{coffee.title}</strong> {coffee.category}
            </div>
        </Link>
    );
};

// React.memo evita render inutili se le props non cambiano
export default React.memo(CoffeeItem);
