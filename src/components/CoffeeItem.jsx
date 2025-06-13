import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton'

//Componente per mostrare un singolo elemento caffè
//Riceve: 
// - coffee: oggetto con i dati del caffè
// - onFavorite: funzione da chiamare quando si clicca su "preferito"
const CoffeeItem = ({ coffee, onFavorite }) => (
    <div className='item-div'>

        {/* Link alla pagina dettagliata del caffè, con stile ereditato dal contesto */}
        <Link to={`/coffees/${coffee.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong>{coffee.title}</strong> {coffee.category}
        </Link>

        {/* Bottone per aggiungere o rimuovere il caffè dai preferiti */}
        <FavoriteButton coffee={coffee} onFavorite={onFavorite} />
    </div>
);

//esporto il componente con React.memo che evita render inutili se le props non cambiano
export default React.memo(CoffeeItem);
