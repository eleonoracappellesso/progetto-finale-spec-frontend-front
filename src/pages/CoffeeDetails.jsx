import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import CoffeeCard from '../components/CoffeeCard';
import { useCoffee } from '../contexts/CoffeeContext';
import FavoriteButton from '../components/FavoriteButton';
import FavoritesAlert from '../components/FavoritesAlert';

function CoffeeDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { toggleFavorite, showAlert, alertMessage, setShowAlert } = useCoffee();

    const { data, loading, error } = useFetch(`/coffees/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const coffee = data?.coffee;
    if (!coffee) return <p>Any coffee found.</p>;

    return (
        <div>
            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            <h1>☕ Coffee Details</h1>

            <CoffeeCard
                coffee={coffee}
                favoriteButton={
                    <FavoriteButton
                        coffee={coffee}
                        onFavorite={() => toggleFavorite(coffee)}
                    />
                }
            />

            <br />
            <div className='btn-container'>
                <button
                    className='compare-btn'
                    onClick={() => navigate(`/compare?base=${coffee.id}`)}
                >
                    Compare
                </button>
                <br />
                <button
                    className='backToList-btn'
                    onClick={() => navigate('/')}
                >
                    ← Back to list
                </button>
            </div>
        </div>
    );
}

export default React.memo(CoffeeDetails);