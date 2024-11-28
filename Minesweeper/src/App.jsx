import './App.css'
import Board from './Board'

import { useState } from 'react'

function App() {

  const [board, setBoard] = useState([])
  const [gameOver, setGameOver] = useState(false)

  const cols = 16
  const rows = 16
  const mines = 40

  return ( <>
  
    <h1>Minesweeper</h1>

    <Board 
      cols={cols} 
      rows={rows} 
      mines={mines} 
      board={board}
      setBoard={setBoard}
      gameOver={gameOver}
      setGameOver={setGameOver}
    />

    </>
  )
}

export default App
