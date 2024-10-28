export default function Controls({ revealAnswer, handleRestart, buttonRef, showAnswer, word }) {
    return (
        <div>
            <button ref={buttonRef} onClick={revealAnswer}>See Answer</button>
            <button ref={buttonRef} onClick={handleRestart}>Another Go</button>
            {showAnswer && <h4>Answer was: {word}</h4>}
        </div>
    );
}
