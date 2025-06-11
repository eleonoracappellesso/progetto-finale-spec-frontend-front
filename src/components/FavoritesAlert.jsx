import React from "react";
import { Link } from "react-router-dom";

const FavoritesAlert = ({ show, message, onClose }) => {
    if (!show) return null;

    return (
        <div className='alert-div'>
            <button className='closeAlert-btn-x' onClick={onClose}>
                X
            </button>
            {message}
            <Link to="/favorites" style={{ textDecoration: 'none' }}>
                <button className='closeAlert-btn' onClick={onClose}>
                    Go to Favorites
                </button>
            </Link>
        </div>
    );
};

export default React.memo(FavoritesAlert);