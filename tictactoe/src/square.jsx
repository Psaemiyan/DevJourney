export default function Square({ value, onClick, isDisabled }) {
    const squareClass = value === 'X' ? 'square x' : value === 'O' ? 'square o' : 'square';

    return (
        <button className={squareClass} onClick={onClick} disabled={isDisabled}>
            {value}
        </button>
    );
}
