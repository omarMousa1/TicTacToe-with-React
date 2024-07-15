import './assets/style.css';
import { useState } from 'react';
import Board from './Border';

const TicTacToe = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(Math.random() < 0.5);
    const [draw, setDraw] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [bgColor, setBgColor] = useState('#FEFBD8');
    const [textColor, setTextColor] = useState('#000000');

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

        const winner = calculateWinner(newSquares);
        setDraw(!winner && newSquares.every(square => square !== null));
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setIsXNext(step % 2 === 0);
        const current = history[step];
        const winner = calculateWinner(current.squares);
        setDraw(!winner && current.squares.every(square => square !== null));
    };

    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    const noMovesMade = current.squares.every(square => square === null);

    const status = noMovesMade
        ? `No moves made yet \n Player '${isXNext ? 'X' : 'O'}', make your first move`
        : winner
            ? `Winner: ${winner}`
            : draw
                ? 'No one won!'
                : `Next player: ${isXNext ? 'X' : 'O'}`;

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        if (!darkMode) {
            setBgColor('#402E7A');
            setTextColor('#FFFFFF');
        } else {
            setBgColor('#FEFBD8');
            setTextColor('#000000');
        }
    };

    // Update CSS variables
    document.documentElement.style.setProperty('--bg-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);

    return (
        <div className={`flex flex-col justify-center items-center sm:flex-col sm:items-center md:flex-row ${darkMode ? 'bg-[#402E7A]' : 'var(--bg-color)'} text-black h-screen`}>

            <div className={`absolute top-1 left-1 rounded-lg border-2 p-2 font-medium ${darkMode ? 'bg-[#4C3BCF] text-black' : 'bg-[#EECEB9] text-[#BB9AB1]'}`}>
                <p className='text-sm'>Select color:</p>
                <div className='flex justify-start items-center'>
                    <label className='text-sm'>Background: </label>
                    <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="mb-1 ml-2"
                    />
                </div>
                <div className='flex justify-start items-center'>
                    <label className='text-sm'>Text: </label>
                    <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="mt-1 ml-2"
                    />
                </div>
            </div>

            <div className='flex flex-col items-center md:mr-10'>
                <div className={`text-lg mb-4 border-2 p-2 rounded-lg ${darkMode ? 'bg-[#4C3BCF] text-black' : 'bg-[#EECEB9] text-[#BB9AB1]'} font-medium whitespace-pre-line text-center`}>{status}</div>
                <Board squares={current.squares} onClick={handleClick} />
            </div>
            <div className='flex flex-row items-center md:flex-col md:justify-center md:items-center mt-5 mb-5'>
                <div className="">
                    <button
                        className={`p-2 ${darkMode ? 'bg-[#4C3BCF] hover:bg-[#4B70F5] text-black' : 'bg-[#EECEB9] text-[#BB9AB1]'} font-medium rounded-lg border-2`}
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? 'Light' : 'Dark'} Mode
                    </button>
                </div>

                <div className="ml-5 md:ml-0 md:mt-2">
                    <button
                        className={`p-2 ${darkMode ? 'bg-[#4C3BCF] hover:bg-[#4B70F5] text-black' : 'bg-[#EECEB9] text-[#BB9AB1]'} font-medium rounded-lg border-2`}
                        onClick={() => {
                            setHistory([{ squares: Array(9).fill(null) }]);
                            setStepNumber(0);
                            setIsXNext(Math.random() < 0.5);
                        }}
                    >
                        Restart
                    </button>
                </div>
            </div>
            <div className="mt-4 md:ml-10">
                <ol>
                    {history.map((step, move) => {
                        const desc = move ? `Go to move #${move}` : 'Go to game start';
                        return (
                            <div className={`border-x-2 px-1 ${darkMode ? 'border-white ' : 'border-black'}`} key={move}>
                                <li className='flex flex-col items-center'>
                                    <button
                                        className={`${darkMode ? 'bg-[#402E7A] text-black' : ' text-[#987D9A]'} hover:underline my-1`}
                                        onClick={() => jumpTo(move)}
                                    >
                                        {desc}
                                    </button>
                                    <hr className={`opacity-40 w-10 ${darkMode ? 'border-white ' : 'border-black'}`} />
                                </li>
                            </div>
                        );
                    })}
                </ol>
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
