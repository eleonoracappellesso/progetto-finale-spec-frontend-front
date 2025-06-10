// src/pages/Compare.jsx
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useCoffee } from '../contexts/CoffeeContext';
import { useFetch } from '../hooks/useFetch';
import CoffeeCard from '../components/CoffeeCard';

export default function Compare() {
    const navigate = useNavigate();
    const { coffees } = useCoffee();
    const [searchParams] = useSearchParams();
    const baseId = searchParams.get("base");
    const [selectedId, setSelectedId] = useState("");

    const { data: baseData, loading: baseLoading, error: baseError } = useFetch(
        baseId ? `/coffees/${baseId}` : null
    );

    const { data: selectedData, loading: selectedLoading, error: selectedError } = useFetch(
        selectedId ? `/coffees/${selectedId}` : null
    );

    const fields = [
        { label: "Name", key: "title" },
        { label: "Category", key: "category" },
        { label: "Roastery", key: "roaster" },
        { label: "Origin", key: "origin" },
        { label: "Process", key: "process" },
        { label: "Roast Level", key: "roastLevel" },
        { label: "Quantity", key: "grams", suffix: "g" },
        { label: "Price", key: "price", prefix: "€" },
        { label: "Rating", key: "rating", suffix: "/10 ⭐" },
    ];

    return (
        <div className="compare-page">
            <h1>📊 Coffee Comparison</h1>

            {/* Intestazione fuori dalle colonne */}
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
                        <CoffeeCard coffee={baseData.coffee} fields={fields} />
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
                        <CoffeeCard coffee={selectedData.coffee} fields={fields} />
                    )}
                </div>
            </div>

            <button className="back-btn" onClick={() => navigate('/')}>
                ← Back to list
            </button>
        </div >
    );
}









// <div className="compare-page">
//     <h1>📊 Coffee Comparison</h1>

//     <div className="comparison-table">
//         <div className="coffee-column">
//             {baseLoading ? (
//                 <p>Loading base coffee...</p>
//             ) : baseError ? (
//                 <p>Error loading base coffee.</p>
//             ) : baseData?.coffee ? (
//                 <>
//                     <h2>Base Coffee</h2>
//                     <CoffeeCard coffee={baseData.coffee} fields={fields} />
//                 </>
//             ) : (
//                 <p>Base coffee not found.</p>
//             )}
//         </div>

//         <div className="coffee-column">
//             <h2>Selected Coffee</h2>
//             <select
//                 className="coffee-select"
//                 value={selectedId}
//                 onChange={e => setSelectedId(e.target.value)}
//             >
//                 <option value="">-- Select coffee --</option>
//                 {coffees
//                     .filter(c => String(c.id) !== String(baseId))
//                     .map(c => (
//                         <option key={c.id} value={c.id}>
//                             {c.title}
//                         </option>
//                     ))}
//             </select>

//             {selectedLoading && <p>Loading selected coffee...</p>}
//             {/*Mostro l'errore solo se non ho dati validi*/}
//             {!selectedLoading && selectedId && !selectedData?.coffee && (
//                 <p className="error-text">Error loading selected coffee.</p>
//             )}

//             {/*mostro la card solo se è tutto ok*/}
//             {selectedData?.coffee && (
//                 <CoffeeCard coffee={selectedData.coffee} fields={fields} />
//             )}
//         </div>
//     </div>

//     <button className="back-btn" onClick={() => navigate('/')}>
//         ← Back to list
//     </button>
// </div>