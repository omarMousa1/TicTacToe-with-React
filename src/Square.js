import React from 'react';
import './assets/style.css'

const Square = ({ value, onClick }) => {
    return (
        <button
            className="w-16 h-16 bg-gray-200 border-2 border-gray-400 text-2xl font-bold"
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Square;
