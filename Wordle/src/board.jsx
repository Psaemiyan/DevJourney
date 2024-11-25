import { useState, useEffect, useRef } from "react"
import { getRandomWord } from "./utils"
import Row from "./row"
import Controls from "./controls"

export default function Board() {  
    const height = 6
    const width = 5

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
    
    useEffect(() => {
        window.addEventListener('keyup', )
        return () => {
            window.removeEventListener('keyup', handleKeyPress)
        }
    }, [currentRow, currentCol, gameOver])


    return (
        <>
            <div className="board">
                {board.map((row, rowIndex) => (
                    <Row key={rowIndex} row={row} statusRow={statusBoard[rowIndex]} />
                ))}
            </div>
            <Controls revealAnswer={revealAnswer} handleRestart={handleRestart} buttonRef={buttonRef} showAnswer={showAnswer} word={word} />
        </>
    )
}
