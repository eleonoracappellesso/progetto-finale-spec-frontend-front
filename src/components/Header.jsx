import { NavLink } from "react-router-dom";

//Componente Header: rappresenta la barra di navigazione principale dell'app
export default function Header() {
    return (
        <header>
            <nav>

                {/* Link alla pagina principale con l'elenco di tutti i caffè */}
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    } //Classe "active" evidenzia il link se è attivo
                >
                    All Coffees
                </NavLink>

                {/* Link alla pagina dei preferiti */}
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    } //Classe "active" evidenzia il link se è attivo
                >
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}
