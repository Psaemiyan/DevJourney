import { useState } from 'react';

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

export const useTicTacToe = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [isGameOver, setIsGameOver] = useState(false);
    const [xScore, setXScore] = useState(0);
    const [oScore, setOScore] = useState(0);
    const [winner, setWinner] = useState(null);
    const [showWinnerText, setShowWinnerText] = useState(false);

    const winnerCheck = (squares) => {
        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const HandleClick = (index) => {
        if (squares[index] || isGameOver) return;

        const newSquares = [...squares];
        newSquares[index] = isXNext ? 'X' : 'O';

        const declaredWinner = winnerCheck(newSquares);

        if (declaredWinner) {
            setSquares(newSquares);
            setWinner(declaredWinner);
            setIsGameOver(true);
            setShowWinnerText(true);

            if (declaredWinner === 'X') {
                setXScore(prevScore => prevScore + 1);
            } else if (declaredWinner === 'O') {
                setOScore(prevScore => prevScore + 1);
            }

        } else if (!newSquares.includes(null)) {
            setSquares(newSquares)
            setIsGameOver(true)
            setShowWinnerText(true)
        } else {
            setSquares(newSquares);
            setIsXNext(!isXNext);
        }
    };

    const Restart = () => {
        setSquares(Array(9).fill(null));
        setIsXNext(true);
        setWinner(null);
        setIsGameOver(false);
        setShowWinnerText(false);
    };

    const NewGame = () => {
        Restart();
        setXScore(0);
        setOScore(0);
    };

    return { 
        squares, 
        isGameOver, 
        xScore, 
        oScore, 
        winner, 
        showWinnerText, 
        setShowWinnerText,
        HandleClick, 
        Restart, 
        NewGame
    };
};
