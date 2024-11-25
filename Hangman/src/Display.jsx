export default function Display({ wrongLetters, gameOver, word, winMessage }) {
    return (
        <>
            {gameOver ? (
                <div>
                    {winMessage ? (
                        <div>
                            <h4>{winMessage}</h4>
                        </div>
                    ) : (
                        <div>
                            <h4>The correct word was:</h4>
                            <p className="correct-word">{word}</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h4>Incorrect Guesses:</h4>
                    <p className="wrong-letter">{wrongLetters && wrongLetters.length > 0 ? wrongLetters.join(", ") : ''}</p>
                </div>
            )}
        </>
    );
}
