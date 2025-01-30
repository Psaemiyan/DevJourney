export default function Input({ value, onChange, onSubmit }) {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Guess the movie..."
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

