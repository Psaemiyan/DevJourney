import './App.css'
import Figure from './Figure'
import LetterBoard from './LetterBoard'
import Hangman from './Hangman'
import Display from './Display'
import Restart from './Restart'

import { useState } from 'react'

function App() {
    const words = [
        "PENGUIN",
        "GALAXY",
        "PYRAMID",
        "UMBRELLA",
        "OASIS",
        "WIZARD",
        "MIRROR",
        "CANYON",
        "TIGER",
        "BALLOON"
    ]   
    const randomWord = words[Math.floor(Math.random() * words.length)];
 
    const [word, setWord] = useState(randomWord)
    const [spot, setSpot] = useState(Array(word.length).fill(''))
    const [wrongLetters, setWrongLetters] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [winMessage, setWinMessage] = useState("");

    const checkWin = () => {
        return word.toUpperCase().split('').every((letter, index) => spot[index] === letter);
    };

    const resetGame = () => 
    {
        setWord(randomWord)
        setSpot(Array(word.length).fill(''))
        setWrongLetters([])
        setGameOver(false)
    }

    return (
    <>
        <div className="game-container">
            <h1>HANGMAN</h1>
            <Figure wrongLetters={wrongLetters}/>
            <LetterBoard word={word} spot={spot}/> 
            <Hangman 
                word={word}
                setWrongLetters = {setWrongLetters}
                gameOver={gameOver}
                setGameOver={setGameOver}
                spot={spot}
                setSpot={setSpot}
                checkWin={checkWin}
                setWinMessage={setWinMessage}

            />          
            <Display wrongLetters={wrongLetters} gameOver={gameOver} word={word} winMessage={winMessage}/> 
            <Restart wrongLetters={wrongLetters} resetGame={resetGame}/>
        </div>

    </>
    )
}

export default App
