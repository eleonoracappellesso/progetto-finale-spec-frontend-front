import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
//Context globale per accesso ai caffè
import { useCoffee } from '../contexts/CoffeeContext';
//Hook personalizzato per fetch API
import { useFetch } from '../hooks/useFetch';

//import componenti
import CoffeeCard from '../components/CoffeeCard';
import FavoriteButton from '../components/FavoriteButton';
import FavoritesAlert from '../components/FavoritesAlert';

function Compare() {
    const navigate = useNavigate();

    //Dati globali e stato per l'alert
    const { coffees, showAlert, alertMessage, setShowAlert } = useCoffee();

    //Legge l'id del caffè base dalla url
    const [searchParams] = useSearchParams();
    const baseId = searchParams.get("base");

    //Stato per il secondo caffè selezionato
    const [selectedId, setSelectedId] = useState("");

    //Fetch asincroni per entrambi i caffè da confrontare
    const { data: baseData, loading: baseLoading, error: baseError } = useFetch(baseId ? `/coffees/${baseId}` : null);
    const { data: selectedData, loading: selectedLoading, error: selectedError } = useFetch(selectedId ? `/coffees/${selectedId}` : null);

    return (
        <div className="compare-page">

            {/* Messaggio visivo in caso di aggiunta/rimozione preferito */}
            <FavoritesAlert show={showAlert} message={alertMessage} onClose={() => setShowAlert(false)} />

            <h1>📊 Coffee Comparison</h1>

            {/* Header di confronto: titolo base + selezione secondo caffè */}
            <div className="compare-header">
                <div><h2>Base Coffee</h2></div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <h2>Selected Coffee</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <p style={{ fontSize: '0.8rem', margin: 0 }}>Select a coffee to compare:</p>

                        {/* Dropdown per scegliere secondo caffè (escluso quello base) */}
                        <select className="coffee-select" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
                            <option value="">-- Select coffee --</option>
                            {coffees.filter(c => String(c.id) !== String(baseId)).map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>

                    </div>
                </div>
            </div>

            {/* Sezione principale: visualizzazione affiancata dei due caffè */}
            <div className="comparison-table">
                <div className="coffee-column">
                    {/* Colonna caffè base */}
                    {baseLoading ? <p>Loading base coffee...</p> : baseError ? <p>Error loading base coffee.</p> : baseData?.coffee ? (
                        <CoffeeCard
                            coffee={baseData.coffee}
                            favoriteButton={<FavoriteButton coffee={baseData.coffee} />}
                        />
                    ) : <p>Base coffee not found.</p>}
                </div>
                <div className="coffee-column">
                    {/* Colonna caffè selezionato */}
                    {selectedLoading && <p>Loading selected coffee...</p>}
                    {!selectedLoading && selectedId && !selectedData?.coffee && <p className="error-text">Error loading selected coffee.</p>}
                    {selectedData?.coffee && (
                        <CoffeeCard
                            coffee={selectedData.coffee}
                            favoriteButton={<FavoriteButton coffee={selectedData.coffee} />}
                        />
                    )}
                </div>
            </div>

            {/* Bottone per tornare alla lista */}
            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to list
            </button>
        </div>
    );
}

//Esporto il componente con React.memo per evitare render inutili
export default React.memo(Compare);