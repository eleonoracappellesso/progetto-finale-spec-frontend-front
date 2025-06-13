import React from 'react';
//hook per ottenere parametri e navigare
import { useParams, useNavigate } from 'react-router-dom';
//hook personalizzato per fetch asincrona
import { useFetch } from '../hooks/useFetch';
//Context per accedere allo stato globale del caffè
import { useCoffee } from '../contexts/CoffeeContext';
//import componenti

//import componenti
import CoffeeCard from '../components/CoffeeCard';
import FavoriteButton from '../components/FavoriteButton';
import FavoritesAlert from '../components/FavoritesAlert';

function CoffeeDetails() {
    const { id } = useParams(); //estrae il parametro 'id' dalla url
    const navigate = useNavigate(); //hook per navigare

    //ottiene dallo stato globale le informazioni sull'alert
    const { showAlert, alertMessage, setShowAlert } = useCoffee();
    //Fetch asincrona per ottenere i dati del singolo caffè tramite ID 
    const { data, loading, error } = useFetch(`/coffees/${id}`);

    //Gestione stati di caricamento, errore o assenza del caffè
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const coffee = data?.coffee;
    if (!coffee) return <p>Any coffee found.</p>;

    return (
        <div>

            {/* Alert per feedback quando si aggiunge/rimuove dai preferiti */}
            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            <h1>☕ Coffee Details</h1>

            {/* Card con tutti i dettagli del caffè e bottone dei preferiti */}
            <CoffeeCard
                coffee={coffee}
                favoriteButton={<FavoriteButton coffee={coffee} />}
            />

            <br />

            {/* Pulsanti per navigare ad altri componenti */}
            <div className='btn-container'>

                {/* Torna alla lista completa dei caffè */}
                <button className='backToList-btn' onClick={() => navigate('/')}>
                    ← Back to list
                </button>

                <br />

                {/* Naviga alla pagina di confronto con questo caffè come base */}
                <button className='compare-btn' onClick={() => navigate(`/compare?base=${coffee.id}`)}>
                    Compare
                </button>

            </div>
        </div>
    );
}

//esporto il componente con React.memo che evita re-render inutili 
export default React.memo(CoffeeDetails);