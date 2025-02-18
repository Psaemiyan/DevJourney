import React, { useState, useEffect } from "react";
import Display from "./Display";
import Input from "./Input";

const movies = [
  { name: "The Lion King", emoji: "🦁👑" },
  { name: "The Dark Knight", emoji: "🦇🌃" },
  { name: "Star Wars", emoji: "🌌🚀" },
  { name: "Jurassic Park", emoji: "🦖🌳" },
  { name: "Titanic", emoji: "🚢❄️" },
  { name: "The Matrix", emoji: "💻🟩" },
  { name: "Forrest Gump", emoji: "🏃‍♂️🍫" },
  { name: "The Godfather", emoji: "🍝🎩" },
  { name: "Pulp Fiction", emoji: "🍔🔫" },
  { name: "Back to the Future", emoji: "⏳🚗" },
  { name: "Gladiator", emoji: "🛡️⚔️" },
  { name: "Harry Potter", emoji: "⚡🧙‍♂️" },
  { name: "Frozen", emoji: "❄️👭" },
  { name: "The Avengers", emoji: "🦸‍♀️💥" },
];


function Game() {
  const [currentMovie, setCurrentMovie] = useState(null);
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  useEffect(() => {
    pickRandomMovie();
  }, []);

  const pickRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    setCurrentMovie(movies[randomIndex]);
    setUserInput("");
    setMessage("");
  };

  const checkAnswer = () => {
    if (userInput.trim().toLowerCase() === currentMovie.name.toLowerCase()) {
      setMessage("✅ Correct!");
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem("score", newScore);
      setTimeout(pickRandomMovie, 1500);
    } else {
      setMessage("❌ Try Again!");
    }
  };

  return (
    <>
      {currentMovie && <Display emoji={currentMovie.emoji} />}
      <Input value={userInput} onChange={setUserInput} onSubmit={checkAnswer} />
      <p className="score">Score: {score}</p>
      <p className={`message ${message.includes('Correct') ? 'correct' : 'incorrect'}`}>
        {message}
      </p>
    </>
  );
}

export default Game;
