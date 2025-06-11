import { useNavigate } from "react-router-dom";
import FavouritesList from "../components/FavoritesList";

export default function FavoritesPage() {
    const navigate = useNavigate();

    return (
        <div>
            <main>
                <h1>Coffees you like 🤍</h1>
                <FavouritesList />
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