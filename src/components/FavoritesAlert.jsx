import React from "react";
import { Link } from "react-router-dom";

/*
Componente che mostra un messaggio di notifica con pulsante di chiusura e collegamento ai preferiti
Props:
- show: booleano che determina se mostrare l'alert
- message: stringa da mostrare come contenuto dell'alert
- onClose: funzione da eseguire quando l'utente chiude l'alert
*/
const FavoritesAlert = ({ show, message, onClose }) => {
    //Se `show` è false, il componente non viene renderizzato
    if (!show) return null;

    return (
        <div className='alert-div'>
            {/* Pulsante "X" per chiudere l'alert manualmente */}
            <button className='closeAlert-btn-x' onClick={onClose}>
                X
            </button>

            {/* Messaggio dell'alert passato tramite props */}
            {message}

            {/* Link che porta alla pagina dei preferiti */}
            <Link to="/favorites" style={{ textDecoration: 'none' }}>

                {/* Pulsante che chiude l'alert e porta alla pagina dei preferiti */}
                <button className='closeAlert-btn' onClick={onClose}>
                    Go to Favorites
                </button>
            </Link>
        </div>
    );
};

//Esporto il componente usando React.memo per evitare render inutili
export default React.memo(FavoritesAlert);