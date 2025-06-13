//Importo la libreria React necessaria per creare componenti React
import React from 'react';

/*
Definisco il componente funzionale CoffeeCard (mostra le infromazioni relative ad un caffè specifico)
Riceve due props: 
- coffee (oggetto con i dati del caffè) 
- favoriteButton (componente per il tasto "preferito")
*/
const CoffeeCard = ({ coffee, favoriteButton }) => {
    return (
        <div>
            {/* Intestazione della card con titolo del caffè e bottone "preferito" */}
            <div className='card-header'>
                <h2>{coffee.title}</h2>
                {favoriteButton}
            </div>

            {/* Dettagli del caffè */}
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

/*
Esporto il componente ottimizzato con React.memo, che evita il rendering del componente se le props non sono cambiate
*/
export default React.memo(CoffeeCard);