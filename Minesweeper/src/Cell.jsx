export default function Cell ({row, col, cell, board, setBoard})
{
    const handleClick = () => {
        if(!cell.revealed) {
            const newBoard = [...board]
            const newRow = [...newBoard[row]]
            newRow[col] = {...newRow[col], revealed: true}

            newBoard[row] = newRow
            setBoard(newBoard)

            if(cell.isMine)
            {
                console.log('mine')
            }
        }
        else {console.log('clicked already')}
    }

    return (
        <div
            className={`cell ${cell.revealed? (cell.isMine ? 'mine' : 'revealed') : ''}`}
            onClick={handleClick}
        >
        </div>
    )
}