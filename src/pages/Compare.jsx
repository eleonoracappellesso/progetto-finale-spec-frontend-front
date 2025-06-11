import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCoffee } from '../contexts/CoffeeContext';
import { useFetch } from '../hooks/useFetch';
import CoffeeCard from '../components/CoffeeCard';
import { useFavorites } from '../utils/favorites';
import FavoriteButton from '../components/FavoriteButton';
import FavoritesAlert from '../components/FavoritesAlert';


function Compare() {
    const navigate = useNavigate();
    const { coffees, favorites, setFavorites } = useCoffee();
    const [searchParams] = useSearchParams();
    const baseId = searchParams.get("base");
    const [selectedId, setSelectedId] = useState("");

    //istanzio l'hook dei preferiti per gestire la logica e l'alert
    const { handleFavorite, showAlert, alertMessage, setShowAlert } = useFavorites();

    const { data: baseData, loading: baseLoading, error: baseError } = useFetch(
        baseId ? `/coffees/${baseId}` : null
    );

    const { data: selectedData, loading: selectedLoading, error: selectedError } = useFetch(
        selectedId ? `/coffees/${selectedId}` : null
    );

    return (
        <div className="compare-page">

            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            <h1>📊 Coffee Comparison</h1>

            <div className="compare-header">
                <div>
                    <h2>Base Coffee</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <h2>Selected Coffee</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>Select a coffee to compare:</p>
                        <select
                            className="coffee-select"
                            value={selectedId}
                            onChange={e => setSelectedId(e.target.value)}
                        >
                            <option value="">-- Select coffee --</option>
                            {coffees
                                .filter(c => String(c.id) !== String(baseId))
                                .map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="comparison-table">
                <div className="coffee-column">
                    {baseLoading ? (
                        <p>Loading base coffee...</p>
                    ) : baseError ? (
                        <p>Error loading base coffee.</p>
                    ) : baseData?.coffee ? (

                        <CoffeeCard
                            coffee={baseData.coffee}
                            favoriteButton={
                                <FavoriteButton
                                    coffee={baseData.coffee}
                                    onFavorite={() => handleFavorite(baseData.coffee, favorites, setFavorites)}
                                />
                            }
                        />
                    ) : (
                        <p>Base coffee not found.</p>
                    )}
                </div>

                <div className="coffee-column">
                    {selectedLoading && <p>Loading selected coffee...</p>}
                    {!selectedLoading && selectedId && !selectedData?.coffee && (
                        <p className="error-text">Error loading selected coffee.</p>
                    )}
                    {selectedData?.coffee && (

                        <CoffeeCard
                            coffee={selectedData.coffee}
                            favoriteButton={
                                <FavoriteButton
                                    coffee={selectedData.coffee}
                                    onFavorite={() => handleFavorite(selectedData.coffee, favorites, setFavorites)}
                                />
                            }
                        />
                    )}
                </div>
            </div>

            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to list
            </button>
        </div >
    );
}

export default React.memo(Compare);