import { useEffect } from "react"
import Cell from './Cell'


export default function Board({cols, rows, mines, board, setBoard, gameOver, setGameOver})
{

    const initBoard = () => 
    {
        const newBoard =[]
        const directions = [
            [-1, -1], [-1, 0], [-1, 1], // Top-left, top, top-right
            [0, -1],          [0, 1],   // Left, right
            [1, -1], [1, 0], [1, 1],   // Bottom-left, bottom, bottom-right
        ]

        // init board
        for(let i = 0; i < rows; i++)
        {
            const newRow = []
            for(let j=0; j < cols; j++)
            {
                newRow.push({
                    isMine: false,
                    adjacentMines: 0,
                    revealed: false,
                    flagged: false
                })
            }
            newBoard.push(newRow)
        }

        // place mines
        let minesPlaced = 0
        while(minesPlaced < mines)
        {
            const randRow = Math.floor(Math.random() * rows)
            const randCol = Math.floor(Math.random() * cols)

            if(!newBoard[randRow][randCol].isMine)
            {
                newBoard[randRow][randCol].isMine = true
                minesPlaced ++
                // console.log(`Mine placed at (${randRow}, ${randCol})`)
            }
        }
        
        // calculate neighbouring mines
        for(let i = 0; i < rows; i++)
        {
            for(let j=0; j < cols; j++)
            {
                if(!newBoard[i][j].isMine)
                {
                    let mineCount = 0
                    directions.forEach(([dx, dy]) => {
                        const newRow = i + dx
                        const newCol = j + dy

                        // ensure adjacent cell is within bounds
                        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                            if (newBoard[newRow][newCol].isMine) {
                                mineCount++;
                            }
                        }
                    })
                    newBoard[i][j].adjacentMines = mineCount
        
                }
            }
        }

        setBoard(newBoard)
    }

    useEffect(() => {initBoard()},[])

    // FLOOD FILL
    const floodFill = (r, c) => {
        const newBoard = [...board]
        newBoard[r] = [...newBoard[r]]
        
        // Check for out of bounds, already revealed, mine
        if (r < 0 || r >= rows || c < 0 || c >= cols || newBoard[r][c].revealed || newBoard[r][c].isMine) {
            return;
        }

        newBoard[r][c] = { ...newBoard[r][c], revealed: true }

        // Reveal neighbours
        if (newBoard[r][c].adjacentMines === 0) {
            floodFill(r - 1, c)  // Top
            floodFill(r + 1, c)  // Bottom
            floodFill(r, c - 1)  // Left
            floodFill(r, c + 1)  // Right
            floodFill(r - 1, c - 1) // Top-left
            floodFill(r - 1, c + 1) // Top-right
            floodFill(r + 1, c - 1) // Bottom-left
            floodFill(r + 1, c + 1) // Bottom-right
        }

        setBoard(newBoard)
    }

    return <>
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className="row">
                    {row.map((cell, colIndex) => (
                        <Cell
                            key={colIndex}
                            row={rowIndex}
                            col={colIndex}
                            cell={cell} 
                            board={board} 
                            setBoard={setBoard}
                            gameOver={gameOver}
                            setGameOver={setGameOver}
                            floodFill={floodFill}
                        />
                    ))}
                </div>
            ))}
        </div>
    </>
}