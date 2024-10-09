import Square from './Square'
import { useTicTacToe } from './gameLogic'
import Score from './score'
// import { useEffect } from 'react';

export default function Board() {
    const { 
        squares, 
        isGameOver, 
        xScore, 
        oScore, 
        winner, 
        showWinnerText, 
        setShowWinnerText,
        HandleClick, 
        Restart, 
        NewGame 
    } = useTicTacToe();

    // useEffect(() => {
    //     if (isGameOver) {
    //         setShowWinnerText(false); 
    //         setTimeout(() => {
    //             setShowWinnerText(true); 
    //         }, 600); 
    //     }
    // }, [isGameOver, setShowWinnerText]);

    return (
        <>
            <Score xScore={xScore} oScore={oScore} winner={winner} />
            {/* <h2 class="winnerText visible">Test Transition</h2> */}

            {showWinnerText && (
                <h2 className={`winnerText ${showWinnerText ? 'visible' : ''}`}>
                    {winner ? `${winner} wins!` : "It's a draw!"}
                </h2>
            )}

            <div className={`board ${isGameOver ? 'hidden' : ''}`}>
                {squares.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onClick={() => HandleClick(index)}
                        isDisabled={isGameOver}
                    />
                ))}
            </div>

            <button className='button' onClick={Restart}>
                Restart
            </button>
            
            <button className='button' onClick={NewGame}>
                Clean Slate
            </button>
        </>
    )
}
