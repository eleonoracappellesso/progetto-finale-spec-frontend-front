//Import del provider di contesto globale per gestire lo stato condiviso
import { CoffeeProvider } from "./contexts/CoffeeContext";

//import dei componenti per il routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Import dei layout e delle pagine principali
import DefaultLayout from "./layouts/DefaultLayout";
import CoffeeList from "./pages/CoffeeList";
import CoffeeDetails from "./pages/CoffeeDetails";
import Compare from "./pages/Compare";
import FavoritesPage from "./pages/FavoritesPage";


// App principale che gestisce il routing
export default function App() {
    return (
        // CoffeeProvider rende disponibile lo stato globale del contesto a tutta l'app        
        <CoffeeProvider>
            {/* BrowserRouter abilita il routing con la history del browser */}
            <BrowserRouter>
                <Routes>
                    {/* DefaultLayout è il layout comune con header, outlet per le pagine */}
                    <Route element={<DefaultLayout />}>
                        {/* Home page con la lista di tutti i caffè */}
                        <Route path="/" element={<CoffeeList />} />

                        {/* Dettaglio di un caffè, basato sull'id dinamico nella URL */}
                        <Route path="/coffees/:id" element={<CoffeeDetails />} />

                        {/* Pagina per il confronto tra due caffè */}
                        <Route path="/compare" element={<Compare />} />

                        {/* Pagina dei preferiti */}
                        <Route path="/favorites" element={<FavoritesPage />} />

                        {/* Pagina di fallback per rotte non esistenti */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CoffeeProvider>
    );
}
