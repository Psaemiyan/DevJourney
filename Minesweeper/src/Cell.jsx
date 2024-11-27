export default function Cell ({row, col, cell, board, setBoard, floodFill})
{
    const handleClick = () => {
        if(!cell.revealed) {
            const newBoard = [...board]
            const newRow = [...newBoard[row]]
            newRow[col] = {...newRow[col], revealed: true}

            newBoard[row] = newRow
            setBoard(newBoard)
            
            // Mine
            if(cell.isMine)
            {
                console.log('GAME OVER')
            } 
            else {
                // Adjacent Mines
                if(cell.adjacentMines > 0)
                {
                    console.log(`there are ${cell.adjacentMines} mines around`)

                } 
                // Flood fill
                else if (cell.adjacentMines === 0) {
                    console.log('reveal more')
                    floodFill(row, col)
                }
            }

        }
    }

    return (
        <div
            className={`cell ${cell.revealed? (cell.isMine ? 'mine' : 'revealed') : ''}`}
            onClick={handleClick}
        >
            {cell.revealed && cell.adjacentMines > 0 ? cell.adjacentMines : ''}
        </div>
    )
}