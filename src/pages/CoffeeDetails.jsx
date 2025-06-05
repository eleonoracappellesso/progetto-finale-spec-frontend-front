import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

// Pagina che mostra i dettagli completi di un singolo caffè
export default function CoffeeDetails() {
    const { id } = useParams(); // ✅ Prendiamo l'ID dalla route
    const navigate = useNavigate();

    // ✅ Chiamata API con l'ID dinamico
    const { data, loading, error } = useFetch(`/coffees/${id}`);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    const coffee = data?.coffee;
    if (!coffee) return <p>Any coffee found.</p>;

    return (
        <div>
            <h1>☕ Coffee Details</h1>
            <p><strong>Name:</strong> {coffee.title}</p>
            <p><strong>Category:</strong> {coffee.category}</p>
            <p><strong>Roastery:</strong> {coffee.roaster}</p>
            <p><strong>Origin:</strong> {coffee.origin}</p>
            <p><strong>Process:</strong> {coffee.process}</p>
            <p><strong>Roast Level:</strong> {coffee.roastLevel}</p>
            <p><strong>Quantity:</strong> {coffee.grams}g</p>
            <p><strong>Price:</strong> €{coffee.price}</p>
            <p><strong>Rating:</strong> {coffee.rating}/10 ⭐ </p>

            <br />
            <button
                className='backToList-btn'
                onClick={() => navigate('/')}
            >
                ← Back to list
            </button>
        </div>
    );
}
