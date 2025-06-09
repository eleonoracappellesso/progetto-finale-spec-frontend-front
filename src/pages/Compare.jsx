import { useCoffee } from "../contexts/CoffeeContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

// Pagina di comparazione tra un caffè base (passato da URL) e uno selezionabile
export default function Compare() {
    const navigate = useNavigate();

    const { coffees } = useCoffee();
    const [searchParams] = useSearchParams();
    const baseId = searchParams.get("base"); // ID del caffè base dalla query string
    const [selectedId, setSelectedId] = useState(""); // ID del secondo caffè scelto

    // Trova il caffè base e il caffè selezionato
    const baseCoffee = coffees.find(c => String(c.id) === String(baseId));
    const selectedCoffee = coffees.find(c => String(c.id) === selectedId);

    // Se il caffè base non esiste, messaggio di errore
    if (!baseCoffee) {
        return <p>Coffee do not found. Go back to <a href="/">list</a>.</p>;
    }

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
        <div className="compare-container">
            <h1>📊 Coffee Comparison</h1>

            <div className="comparison-table">
                {/* Card del caffè base */}
                <CoffeeCard coffee={baseCoffee} fields={fields} title="Base Coffee" />

                {/* Card del caffè selezionato */}
                {selectedCoffee ? (
                    <CoffeeCard coffee={selectedCoffee} fields={fields} title="Selected Coffee" />
                ) : (
                    <div style={{ flex: 1 }}>
                        <h3>Select a coffee to compare</h3>
                        <select
                            value={selectedId}
                            onChange={e => setSelectedId(e.target.value)}
                        >
                            <option value="">-- Select coffee --</option>
                            {coffees
                                .filter(c => c.id !== baseCoffee.id)
                                .map(c => (
                                    <option key={c.id} value={c.id}>
                                        {c.title}
                                    </option>
                                ))}
                        </select>
                    </div>
                )}
            </div>
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

// Componente per visualizzare i dettagli di un caffè
function CoffeeCard({ coffee, fields, title }) {
    return (
        <div className="compare-card">
            <h3>{title}</h3>
            <ul className="compare-list">
                {fields.map(f => (
                    <li key={f.key}>
                        <strong>{f.label}:</strong> {f.prefix || ''}{coffee[f.key]}{f.suffix || ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}
