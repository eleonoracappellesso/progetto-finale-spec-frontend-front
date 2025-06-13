import React from "react";
import { Link } from "react-router-dom";

//Componente che mostra un messaggio di notifica con pulsante di chiusura e collegamento ai preferiti
//Props:
// - show: booleano che determina se mostrare l'alert
// - message: stringa da mostrare come contenuto dell'alert
// - onClose: funzione da eseguire quando l'utente chiude l'alert
const FavoritesAlert = ({ show, message, onClose }) => {
    // Se `show` è false, il componente non viene renderizzato
    if (!show) return null;

    return (
        <div className='alert-div'>
            <button className='closeAlert-btn-x' onClick={onClose}>
                X
            </button>
            {message}
            <Link to="/favorites" style={{ textDecoration: 'none' }}>
                <button className='closeAlert-btn' onClick={onClose}>
                    Go to Favorites
                </button>
            </Link>
        </div>
    );
};

export default React.memo(FavoritesAlert);