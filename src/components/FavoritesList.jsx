import { useCoffee } from "../contexts/CoffeeContext";

export default function FavoritesList() {
    const { coffees, favorites } = useCoffee();

    return (
        <div>
            <h2>Favorites:</h2>
            <ul>
                {favorites.map(id => (
                    <li key={id}>
                        {coffees.find(coffee => coffee.id === id).title}
                    </li>
                ))}
            </ul>
        </div>
    )
}