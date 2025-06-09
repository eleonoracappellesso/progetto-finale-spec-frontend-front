import { useCoffee } from "../contexts/CoffeeContext";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

// Pagina di comparazione tra un caffè base (passato da URL) e uno selezionabile
export default function Compare() {
    const { coffees } = useCoffee();
    const [searchParams] = useSearchParams();
    const baseId = searchParams.get("base"); // ID del caffè base dalla query string
    const [selectedId, setSelectedId] = useState(""); // ID del secondo caffè scelto

    // Trova il caffè base e il caffè selezionato
    const baseCoffee = coffees.find(c => String(c.id) === String(baseId));
    const selectedCoffee = coffees.find(c => String(c.id) === selectedId);

    // Se il caffè base non esiste, messaggio di errore
    if (!baseCoffee) {
        return <p>Caffè base non trovato. Torna alla <a href="/">lista</a>.</p>;
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
        <div>
            <h1>📊 Confronta Caffè</h1>

            <div style={{ display: "flex", gap: "2rem" }}>
                {/* Card del caffè base */}
                <CoffeeCard coffee={baseCoffee} fields={fields} title="Caffè Base" />

                {/* Card del caffè selezionato */}
                {selectedCoffee ? (
                    <CoffeeCard coffee={selectedCoffee} fields={fields} title="Caffè Selezionato" />
                ) : (
                    <div style={{ flex: 1 }}>
                        <h3>Scegli un caffè da confrontare</h3>
                        <select
                            value={selectedId}
                            onChange={e => setSelectedId(e.target.value)}
                        >
                            <option value="">-- Seleziona caffè --</option>
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
        </div>
    );
}

// Componente per visualizzare i dettagli di un caffè
function CoffeeCard({ coffee, fields, title }) {
    return (
        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '8px', padding: '1rem' }}>
            <h3>{title}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {fields.map(f => (
                    <li key={f.key}>
                        <strong>{f.label}:</strong> {f.prefix || ''}{coffee[f.key]}{f.suffix || ''}
                    </li>
                ))}
            </ul>
        </div>
    );
}
