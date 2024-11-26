import { useEffect } from "react"
import Cell from './Cell'


export default function Board({cols, rows, mines, board, setBoard})
{

    const initBoard = () => 
    {
        const newBoard =[]
        for(let i = 0; i < rows; i++)
        {
            const newRow = []
            for(let j=0; j < cols; j++)
            {
                newRow.push({
                    isMine: false,
                    revealed: false
                })
            }
            newBoard.push(newRow)
        }

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
        setBoard(newBoard)
    }

    useEffect(() => {initBoard()},[])

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
                        />
                    ))}
                </div>
            ))}
        </div>
    </>
}