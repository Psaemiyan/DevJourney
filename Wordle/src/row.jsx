import Tile from "./tile";


export default function Row({ row, statusRow }) {
    return (
        <div className="row" style={{ display: "flex", flexWrap: "nowrap" }}>
            {row.map((cell, colIndex) => (
                <Tile key={colIndex} value={cell} status={statusRow[colIndex]} />
            ))}
        </div>
    )
}
