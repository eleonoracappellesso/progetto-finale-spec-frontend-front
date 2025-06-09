import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import CoffeeList from "./pages/CoffeeList";
import CoffeeDetails from "./pages/CoffeeDetails";
import Compare from "./pages/Compare";
import { CoffeeProvider } from "./contexts/CoffeeContext";

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
                        {/* Pagina di fallback per rotte non esistenti */}
                        <Route path="*" element={<div>404 Not Found</div>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </CoffeeProvider>
    );
}
