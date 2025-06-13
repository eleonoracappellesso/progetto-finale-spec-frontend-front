//Importo React e useCallback per ottimizzare la funzione di click
import React, { useCallback } from 'react';
//Importo il context personalizzato per accedere allo stato dei preferiti
import { useCoffee } from '../contexts/CoffeeContext';
//Importo le icone del cuore
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

/*
  FavoriteButton è un componente che mostra un'icona a forma di cuore.
  Serve per aggiungere o rimuovere un caffè dai "preferiti".
  Riceve una prop:
  - coffee: oggetto caffè per cui vogliamo gestire il preferito
*/
const FavoriteButton = ({ coffee }) => {
    //Ottiene dal CoffeeContext:
    // - array di ID dei caffè preferiti
    // - funzione per aggiungere/rimuovere un caffè dai preferiti
    const { favorites, toggleFavorite } = useCoffee();

    /*
      Definisco una funzione di gestione del click, ottimizzata con useCallback.
      Questo evita la ricreazione della funzione ad ogni render, a meno che cambino le dipendenze.
    */
    const handleFavoriteClick = useCallback(() => {
        toggleFavorite(coffee); //Aggiunge o rimuove il caffè dai preferiti
    }, [toggleFavorite, coffee]); //Si aggiorna solo se il caffè o la funzione cambiano

    return (
        <button
            onClick={handleFavoriteClick}
            className='heart-btn'
        >
            {/* Mostra il cuore pieno se il caffè è nei preferiti, altrimenti quello vuoto */}
            {favorites.includes(coffee.id) ? (
                <AiFillHeart color="red" size={24} />
            ) : (
                <AiOutlineHeart color="gray" size={24} />
            )}
        </button>
    );
};

// Esporto il componente ottimizzato con React.memo
export default React.memo(FavoriteButton);