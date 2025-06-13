//importo l'outlet per rendere dinamico il contenuto delle route figlie
import { Outlet } from "react-router-dom";
//importo l'intestazione comune
import Header from "../components/Header";

/*
Componente layout che definisce la struttura base della pagina, che include un header fisso e una sezione che verrà popolata dinamicamente grazie ad <Outlet />
*/
export default function DefaultLayout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}