import React, { useEffect, useState } from 'react';
import './App.css'

export default function App() {
  const [cards, setCards] = useState([]);
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [matchedIndexes, setMatchedIndexes] = useState([]);

  useEffect(() => {
    const symbols = ["🎈", "💖", "💌", "🎀", "🦄", "🌷", "🍒", "🐞"]
    const deck = [...symbols, ...symbols].sort(() => 0.5 - Math.random());
    setCards(deck);
  }, []);

  const handleCardClick = index => {
    if (flippedIndexes.length === 0) {
      setFlippedIndexes([index]);
    } else if (flippedIndexes.length === 1 && flippedIndexes[0] !== index && cards[flippedIndexes[0]] === cards[index]) {
      setMatchedPairs(prev => prev + 1);
      setMatchedIndexes(prev => [...prev, flippedIndexes[0], index]);
      setFlippedIndexes([]);
    } else if (flippedIndexes.length === 1) {
      setFlippedIndexes([flippedIndexes[0], index]);
      setTimeout(() => {
        setFlippedIndexes([]);
      }, 1000);
    }
  };


  return (
    <div className="container">
      <h2>Memory Card Game</h2>
      <p className="description">Match pairs of cards with identical symbols. Win by matching all!</p>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div 
            key={index}
            className={`card ${(flippedIndexes.includes(index) || matchedIndexes.includes(index)) ? "flipped" : ""} ${matchedIndexes.includes(index) ? "matched" : ""}`} 
            onClick={() => handleCardClick(index)}
          >
            
            {(flippedIndexes.includes(index) || matchedIndexes.includes(index)) && card}
          </div>
        ))}
      </div>
    </div>
  );
}

