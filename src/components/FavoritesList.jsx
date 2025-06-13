import React from 'react';
//Importo il context personalizzato per accedere ai dati e funzioni globali sui caffè
import { useCoffee } from '../contexts/CoffeeContext';
import CoffeeItem from './CoffeeItem';
import FavoritesAlert from './FavoritesAlert';

/*
  FavoritesList è un componente che mostra l'elenco dei caffè preferiti dell'utente.
  Utilizza il CoffeeContext per accedere a:
  - coffees: l'elenco completo dei caffè disponibili
  - favorites: array di ID dei caffè segnati come preferiti
  - showAlert: booleano che controlla la visibilità del messaggio di notifica
  - alertMessage: stringa da mostrare all'interno dell'alert
  - setShowAlert: funzione per aggiornare lo stato di visibilità dell'alert
*/
function FavoritesList() {
    const { coffees, favorites, showAlert, alertMessage, setShowAlert } = useCoffee();

    return (
        <div className='favorites-list'>
            <h2>Favorites:</h2>

            {/* Mostra l'alert se showAlert è true */}
            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            {/* Se la lista dei preferiti è vuota, mostra un messaggio */}
            {favorites.length === 0 ? (
                <p>La tua lista di preferiti è vuota. Aggiungine qualcuno dalla lista principale!</p>
            ) : (
                //Altrimenti mostra la lista dei caffè preferiti

                <ul>
                    {favorites.map(id => {
                        //Per ogni ID nei preferiti, trova il corrispondente oggetto coffee
                        const coffee = coffees.find(c => c.id === id);
                        //Se il caffè esiste, lo mostra tramite il componente CoffeeItem
                        return coffee ? (
                            <li key={id}>
                                <CoffeeItem coffee={coffee} />
                            </li>
                        ) : null; //Se il caffè non esiste non renderizza nulla
                    })}
                </ul>
            )}
        </div>
    );
}

//Esporto il componente con React.memo per evitare render inutili
export default React.memo(FavoritesList);