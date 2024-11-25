export default function LetterBoard({ word, spot }) {
    return (
        <div className="letter-board">
            {Array.from(word).map((_, index) => (
                <span className="letter-space" key={index}>
                    {spot[index]} 
                </span>
            ))}
        </div>
    )
}
