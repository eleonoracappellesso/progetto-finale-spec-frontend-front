import { NavLink } from "react-router-dom";

export default function Header() {
    return (
        <header>
            <nav>
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    All Coffees
                </NavLink>
                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? "nav-link active" : "nav-link"
                    }
                >
                    Favorites
                </NavLink>
            </nav>
        </header>
    );
}
