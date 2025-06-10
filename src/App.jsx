import { CoffeeProvider } from "./contexts/CoffeeContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import CoffeeList from "./pages/CoffeeList";
import CoffeeDetails from "./pages/CoffeeDetails";
import Compare from "./pages/Compare";
import FavoritesPage from "./pages/FavoritesPage";


// App principale che gestisce il routing
export default function App() {
    return (
        // Wrappa tutto nel provider globale del contesto
        <CoffeeProvider>
            <BrowserRouter>
                <Routes>
                    {/* DefaultLayout è il layout principale (es. con navbar, footer...) */}
                    <Route element={<DefaultLayout />}>
                        {/* Rotta per la home page con lista dei caffè */}
                        <Route path="/" element={<CoffeeList />} />
                        <Route path="/coffees/:id" element={<CoffeeDetails />} />
                        <Route path="/compare" element={<Compare />} />
                        <Route path="/favorites" element={<FavoritesPage />} />
                        {/* Pagina di fallback per rotte non esistenti */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CoffeeProvider>
    );
}
