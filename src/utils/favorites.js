import { useState } from 'react';

export function useFavorites() {
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const handleFavorite = (coffee, favorites, setFavorites) => {
        if (favorites.includes(coffee.id)) {
            setFavorites(favorites.filter(id => id !== coffee.id));
            setAlertMessage(`${coffee.title} correctly removed from favorites`);
        } else {
            setFavorites([...favorites, coffee.id]);
            setAlertMessage(`${coffee.title} correctly added to favorites`);
        }
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 5000);
    };

    return { handleFavorite, showAlert, alertMessage, setShowAlert, setAlertMessage };
}