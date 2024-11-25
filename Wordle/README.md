# Wordle Game

A simple Wordle-style game built with React, where players guess a hidden word within a limited number of attempts.

![wordle](https://github.com/user-attachments/assets/70eec296-0965-4db3-a2ec-d284dd0ebad0)


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Game Rules](#game-rules)


## Features

- Guess a hidden word within 6 attempts.
- Visual feedback with colors for each guessed letter.
- Restart option to play again.
- Random word selection for each game round.

## Technologies Used

- React
- JavaScript
- CSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/psaemiyan/DevJourney.git
   ```
2. Navigate to the Wordle project directory:
   ```bash
   cd DevJourney/Wordle
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```


## Game Rules

1. The player has 6 attempts to guess the hidden word.
2. After each guess, the letters are highlighted:
   - **Green (#6aaa64)**: The letter is correct and in the correct position.
   - **Yellow (#c9b458)**: The letter is correct but in the wrong position.
   - **Grey (#787c7e)**: The letter is not in the word.
3. The game ends when the player guesses the word correctly or exhausts all attempts.

