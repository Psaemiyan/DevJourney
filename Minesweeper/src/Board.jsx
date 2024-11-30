import { useEffect } from "react"
import Cell from './Cell'


export default function Board({cols, rows, mines, board, setBoard, firstClick, setFirstClick, gameOver, setGameOver})
{

    useEffect(() => {initBoard()},[])

    useEffect(() => {
        checkWin()
    }, [board, firstClick])
    

    const checkWin = () => {

        let revealedCount = 0
        let totalCells = rows * cols
        let mineCount = mines
    
        board.forEach(row => {
            row.forEach(cell => {
                if (cell.revealed) {
                    revealedCount++
                }
            })
        })
        if (revealedCount === 0) return
        if (revealedCount === totalCells - mineCount) {
            setTimeout(() => {
                setGameOver(true) 
                alert("Congratulations! You win!")
                resetGame()
            }, 100);
        }
    }
    
    const resetGame = () => 
    {
        setGameOver(false)
        initBoard()
        setFirstClick(false)
    }

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

    // FLOOD FILL
    const floodFill = (r, c) => {
        const newBoard = [...board]
        const stack = [[r, c]]
    
        while (stack.length > 0) {
            const [currentR, currentC] = stack.pop()
    
            // Check if out of bounds or already revealed
            if (
                currentR < 0 || currentR >= rows || currentC < 0 || currentC >= cols ||
                newBoard[currentR][currentC].revealed ||
                newBoard[currentR][currentC].isMine
            ) {
                continue // Skip invalid or already processed cells
            }
    
            // Reveal the current cell
            newBoard[currentR] = [...newBoard[currentR]]; // Copy the row for immutability
            newBoard[currentR][currentC] = { 
                ...newBoard[currentR][currentC], 
                revealed: true 
            }
    
            // If the current cell has no adjacent mines, add its neighbors to the stack
            if (newBoard[currentR][currentC].adjacentMines === 0) {
                const directions = [
                    [-1, 0], [1, 0], [0, -1], [0, 1],     // Top, Bottom, Left, Right
                    [-1, -1], [-1, 1], [1, -1], [1, 1]  // Top-left, Top-right, Bottom-left, Bottom-right
                ]
    
                directions.forEach(([dx, dy]) => {
                    stack.push([currentR + dx, currentC + dy])
                })
            }
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
                            firstClick = {firstClick}
                            setFirstClick = {setFirstClick}
                            board={board} 
                            setBoard={setBoard}
                            gameOver={gameOver}
                            setGameOver={setGameOver}
                            floodFill={floodFill}
                            resetGame={resetGame}
                        />
                    ))}
                </div>
            ))}
        </div>
    </>
}