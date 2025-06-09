import { NavLink } from "react-router-dom";
export default function Header() {
    return (
        <header>
            <nav>
                <NavLink
                    to="/"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none',
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: "beige"

                    })}
                >
                    All Coffees
                </NavLink>
                <NavLink
                    to="/favorites"
                    style={({ isActive }) => ({
                        textDecoration: isActive ? 'underline' : 'none',
                        fontWeight: isActive ? 'bold' : 'normal',
                        color: "beige"
                    })}
                >
                    Favorites
                </NavLink>
            </nav>
        </header >
    )
}