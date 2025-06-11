import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import CoffeeCard from '../components/CoffeeCard';

//Pagina che mostra i dettagli completi di un singolo caffè
function CoffeeDetails() {
    const { id } = useParams(); //Prendiamo l'ID dalla route
    const navigate = useNavigate();

    //Chiamata API con l'ID dinamico
    const { data, loading, error } = useFetch(`/coffees/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const coffee = data?.coffee;
    if (!coffee) return <p>Any coffee found.</p>;

    return (
        <div>
            <h1>☕ Coffee Details</h1>
            <CoffeeCard coffee={coffee} />
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