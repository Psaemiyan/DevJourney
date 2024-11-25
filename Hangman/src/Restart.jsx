export default function Restart({wrongLetters, resetGame})
{
    const errors = wrongLetters.length

    return <>
        <button 
        className="restart-btn" 
        style={{display: errors === 6? 'block': 'none'}}
        onClick={resetGame}
        >
            Restart
        </button>
    </>
}