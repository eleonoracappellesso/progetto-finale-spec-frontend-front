import React from 'react';

// Componente per mostrare singolo caffè (titolo e categoria)
const CoffeeItem = ({ coffee }) => {
    return (
        <div style={{ border: '1px solid gray', padding: '8px', marginBottom: '4px' }}>
            <strong>{coffee.title}</strong> - {coffee.category}
        </div>
    );
};

// React.memo evita render inutili se le props non cambiano
export default React.memo(CoffeeItem);
