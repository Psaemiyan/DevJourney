export default function Cell ({row, col, cell, board, setBoard, gameOver, setGameOver, floodFill})
{
    const handleClick = () => {
        if (gameOver || cell.revealed || cell.flagged) return

        const newBoard = [...board]
        const newRow = [...newBoard[row]]
        newRow[col] = {...newRow[col], revealed: true}
        newBoard[row] = newRow
        setBoard(newBoard)
        
        // Mine
        if(cell.isMine)
        {
            setGameOver(true)
        } 
        else {
            // Flood fill
             if (cell.adjacentMines === 0) {
                floodFill(row, col)
            }  
        }
    }

    const handleRightClick = (e) => 
    {
        e.preventDefault()
        if(gameOver) return
        const newBoard = [...board];
        newBoard[row][col] = { ...newBoard[row][col], flagged: !cell.flagged }
        setBoard(newBoard)
    }

    return (
        <div
            className={`cell ${cell.flagged? 'flagged' : cell.revealed? (cell.isMine ? 'mine' : 'revealed') : ''}`}
            onClick={handleClick} onContextMenu={handleRightClick}
        >
            {cell.flagged? '🚩' : cell.revealed && cell.adjacentMines > 0 ? cell.adjacentMines : ''}
        </div>
    )
}