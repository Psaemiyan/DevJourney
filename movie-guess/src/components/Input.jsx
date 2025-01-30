import React from "react";

export default function Input({ value, onChange, onSubmit }) {
  return (
    <div className="input-container">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}
