import { useState, useEffect, useRef } from "react"

export default function Board() {  
    const height = 6
    const width = 5

    const words = ['SUSHI', 'PIZZA', 'CHAIR', 'HOUSE', 'PLANT', 'WATER', 'TABLE', 'COMPUTER', 'MOUSE', 'BOOK']
    
    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * words.length)
        return words[randomIndex]
    }


    const [board, setBoard] = useState(Array.from({ length: height }, () => Array(width).fill('')))
    const [statusBoard, setStatusBoard] = useState(Array(height).fill(Array(width).fill(''))) 
    const [currentRow, setCurrentRow] = useState(0)
    const [currentCol, setCurrentCol] = useState(0)
    const [word, setWord] = useState(getRandomWord())
    const [gameOver, setGameOver] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    
    const buttonRef = useRef()


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
                    const newBoard = [...prevBoard]
                    newBoard[currentRow][currentCol] = e.key.toUpperCase()
                    console.log(newBoard)
                    return newBoard
                })
                setCurrentCol(currentCol + 1)
            }
        }
        if (currentCol === width && e.key === 'Enter') {
            if (board[currentRow].every(cell => cell !== '')) {
                checkGuess(board[currentRow].join(''))
                setCurrentRow(prevRow => Math.min(prevRow + 1, height - 1))
                setCurrentCol(0)
            }
        }
    }

    const checkGuess = (guess) => {
        const newStatus = [...statusBoard]
        const targetWord = word.toUpperCase()
        const guessArr = guess.split('')
        const rowStatus = Array(width).fill('absent')
    
        const letterCount = {}
        for (let letter of targetWord) {
            letterCount[letter] = (letterCount[letter] || 0) + 1
        }
    
        guessArr.forEach((letter, index) => {
            if (letter === targetWord[index]) {
                rowStatus[index] = 'correct'
                letterCount[letter]--
            }
        })

        guessArr.forEach((letter, index) => {
            if (rowStatus[index] !== 'correct' && letterCount[letter] > 0) {
                rowStatus[index] = 'present'
                letterCount[letter]--
            }
        })
    
        newStatus[currentRow] = rowStatus
        setStatusBoard(newStatus)
    
        if (guess === word) {
            setGameOver(true)
        } else if (currentRow === height - 1) {
            setGameOver(true)
            setShowAnswer(true)
        }
    }
    
    

    useEffect(() => {
        window.addEventListener('keyup', handleKeyPress)
        return () => {
            window.removeEventListener('keyup', handleKeyPress)
        }
    }, [currentRow, currentCol, gameOver])


    const handleRestart = () => {
        setBoard(Array.from({ length: height }, () => Array(width).fill('')))
        setStatusBoard(Array.from({ length: height }, () => Array(width).fill('')))
        setCurrentRow(0)
        setCurrentCol(0)
        setGameOver(false)
        setShowAnswer(false)
        setWord(getRandomWord())
        buttonRef.current.blur()
    }


    const revealAnswer = () => {
        setShowAnswer(!showAnswer) 
    }
    

    return <>
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

            <div>
                <button ref= { buttonRef} onClick={revealAnswer}>See Answer</button>
                <button ref= { buttonRef} onClick={handleRestart}>Another Go</button>
            </div>

            <div>
                <h4 className={showAnswer ? 'visible' : 'not-visible'}>Answer was: {word}</h4>
            </div>
    </>
}
