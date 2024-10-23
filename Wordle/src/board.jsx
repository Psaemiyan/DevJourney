import { useState, useEffect } from "react"

export default function Board() {  
    const height = 6
    const width = 5

    const [board, setBoard] = useState(Array.from({ length: height }, () => Array(width).fill('')))
    const [statusBoard, setStatusBoard] = useState(Array(height).fill(Array(width).fill(''))) 
    const [currentRow, setCurrentRow] = useState(0)
    const [currentCol, setCurrentCol] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    
    const word = 'SQUAD'


    const handleKeyPress = (e) => {
        if (gameOver) return

        if (e.key === 'Backspace') {
            if (currentCol > 0) {
                setBoard(prevBoard => {
                    const newBoard = [...prevBoard]
                    newBoard[currentRow][currentCol - 1] = ''
                    return newBoard
                })
                setCurrentCol(currentCol - 1)
            }
        } else if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
            if (currentCol < width) {
                setBoard(prevBoard => {
                    const newBoard = [...prevBoard];
                    newBoard[currentRow][currentCol] = e.key.toUpperCase()
                    return newBoard;
                });
                setCurrentCol(currentCol + 1)
            }
        }
        if (currentCol === width && e.key === 'Enter') {
            if (board[currentRow].every(cell => cell !== '')) {
                console.log('here')
                checkGuess(board[currentRow].join(''))
                setCurrentRow(currentRow + 1)
                setCurrentCol(0)
            } else {
                alert('Please fill the entire row before submitting.');
            }
        }
    }

    const checkGuess = (guess) => {
        const newStatus = [...statusBoard]
        const targetWord = word.toUpperCase()
        const guessArr = guess.split('')
        const rowStatus = Array(width).fill('absent');
    
        guessArr.forEach((letter, index) => {
            if (letter === targetWord[index]) {
                rowStatus[index] = 'correct'
            }
        })
    
        guessArr.forEach((letter, index) => {
            if (rowStatus[index] !== 'correct' && targetWord.includes(letter)) {
                rowStatus[index] = 'present'
            }
        })
    
        newStatus[currentRow] = rowStatus
        setStatusBoard(newStatus)
        if (guess === word) {
            setGameOver(true)
            alert('Congratulations! You found the word!');
        } else if (currentRow === height - 1) {
            setGameOver(true)
            alert(`Game Over! The word was: ${word}`);
        }
    }
    

    useEffect(() => {
        window.addEventListener('keyup', handleKeyPress);
        return () => {
            window.removeEventListener('keyup', handleKeyPress);
        }
    }, [currentRow, currentCol, gameOver]);

    return (
            <div className="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row" style={{ display: 'flex', flexWrap: 'nowrap' }}>
                        {row.map((cell, colIndex) => (
                            <div 
                                key={colIndex} 
                                className={`tile ${statusBoard[rowIndex][colIndex]}`}>
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

    )
}
