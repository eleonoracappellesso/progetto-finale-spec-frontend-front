//Hook per navigazione programmata
import { useNavigate } from "react-router-dom";
//import componenti
import FavouritesList from "../components/FavoritesList";

export default function FavoritesPage() {
    const navigate = useNavigate(); //istanza di navigazione per spostarsi tra le pagine

    return (
        <div>
            <main>
                <h1>Coffees you like 🤍</h1>

                {/* Lista dei caffè preferiti salvati nel context/localStorage */}
                <FavouritesList />

                {/* Bottone per tornare alla lista completa dei caffè */}
                <button
                    className='backToList-btn'
                    onClick={() => navigate('/')}
                >
                    ← Back to list
                </button>
            </main>
        </div>
    )
}