import React from "react";
import Game from "./components/Game";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <h1>Guess the Movie!</h1>
      <Game />
    </div>
  )
}
