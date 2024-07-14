import React from 'react';
import Square from './Square';
import './assets/style.css'

const Board = ({ squares, onClick }) => {
    return (
        <div className="grid grid-cols-3 gap-1">
            {squares.map((square, i) => (
                <Square key={i} value={square} onClick={() => onClick(i)} />
            ))}
        </div>
    );
};

export default Board;
