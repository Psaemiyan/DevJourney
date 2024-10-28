export default function Tile({ value, status }) {
    return (
        <div className={`tile ${status}`}>
            {value}
        </div>
    )
}
