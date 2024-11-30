export default function Cell ({row, col, cell, board, setBoard, firstClick, setFirstClick, gameOver, setGameOver, floodFill, resetGame})
{
    const handleClick = () => {
        if (gameOver || cell.revealed || cell.flagged) return

        const newBoard = [...board]
        const newRow = [...newBoard[row]]
        newRow[col] = {...newRow[col], revealed: true}
        newBoard[row] = newRow
        setBoard(newBoard)

        if(!firstClick)
            setFirstClick(true)
        
        // Mine
        if(cell.isMine)
        {
            setTimeout(() => {
                setGameOver(true)
                alert("It's a mine! You lose!")
                resetGame()
            }, 100)
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
        if(gameOver || cell.revealed) return
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