import './assets/style.css'
import { useState } from 'react'
import Board from './Border';


// const test = () => {

//     const [set] = useState(false);

// export default test


const TicTacToe = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(true);

    const handleClick = (i) => {
        const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
        const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
        const newSquares = current.squares.slice();

        if (calculateWinner(newSquares) || newSquares[i]) {
            return;
        }
        newSquares[i] = isXNext ? 'X' : 'O';

        setHistory(historyUpToCurrentStep.concat([{ squares: newSquares }]));
        setStepNumber(historyUpToCurrentStep.length);
        setIsXNext(!isXNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setIsXNext(step % 2 === 0);
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const status = winner
        ? `Winner: ${winner}`
        : `Next player: ${isXNext ? 'X' : 'O'}`;

    return (
        <div className="flex flex-col justify-center items-center mt-28 mb-28 sm:flex-col sm:items-center md:flex-row">
            <div className='flex flex-col items-center md:mr-10'>
                <div className="text-2xl mb-4 border-2 p-2 rounded-lg bg-[#4C3BCF] font-medium">{status}</div>
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className='flex flex-col items-center mt-5'>
                <div className="">
                    <button
                        className="p-2 bg-[#4C3BCF] hover:bg-[#4B70F5] font-medium rounded-lg border-2"
                        onClick={() => setHistory([{ squares: Array(9).fill(null) }]) & setStepNumber(0) & setIsXNext(true)}
                    >
                        Restart
                    </button>
                </div>

                <div className="mt-4">
                    <ol>
                        {history.map((step, move) => {
                            const desc = move ? `Go to move #${move}` : 'Go to game start';
                            return (
                                <div className='border-x-2 px-1'>
                                    <li className='flex flex-col items-center' key={move}>
                                        <button
                                            className="text-[#3DC2EC] hover:underline my-1"
                                            onClick={() => jumpTo(move)}
                                        >
                                            {desc}
                                        </button>
                                        <hr className='opacity-40 w-10' />
                                    </li>
                                </div>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    );
};

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export default TicTacToe;