//Importo React per definire componenti React
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';

/*
  CoffeeItem è un componente funzionale che mostra un'anteprima sintetica di un caffè.
  Riceve una prop:
  - coffee: oggetto contenente le informazioni del caffè (in particolare id, title, category)
*/
const CoffeeItem = ({ coffee }) => (
    <div className='item-div'>

        {/*Link che porta alla pagina dettagliata del caffè. La url viene generata dinamicamente in base all'id*/}
        <Link to={`/coffees/${coffee.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <strong>{coffee.title}</strong> {coffee.category}
        </Link>

        {/* Bottone per aggiungere/rimuovere il caffè dai preferiti */}

        <FavoriteButton coffee={coffee} />
    </div>
);

/*
  Esporto il componente ottimizzato con React.memo, che previene il re-render del componente se le props non sono cambiate
*/
export default React.memo(CoffeeItem);