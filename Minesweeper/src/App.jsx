import './App.css'
import Board from './Board'

import { useState } from 'react'

function App() {

  const [board, setBoard] = useState([])

  const cols = 15
  const rows = 15
  const mines = 40

  return ( <>
  
    <h1>Minesweeper</h1>

    <Board 
      cols={cols} 
      rows={rows} 
      mines={mines} 
      board={board}
      setBoard={setBoard}
    />

    </>
  )
}

export default App
