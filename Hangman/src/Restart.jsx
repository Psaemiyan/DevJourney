export default function Restart({gameOver, resetGame})
{
    return <>
        <button 
        className="restart-btn" 
        style={{display: gameOver? 'block': 'none'}}
        onClick={resetGame}
        >
            Restart
        </button>
    </>
}