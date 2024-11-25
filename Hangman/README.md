# Hangman Game

A simple Hangman game built using React. The objective of the game is to guess a hidden word by entering one letter at a time. You have a limited number of incorrect guesses before the game is over.

![Hangman Game Screenshot](./images/hangman.jpeg)


## Technologies Used

- React
- JavaScript 
- CSS

## Installation

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/psaemiyan/DevJourney.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Hangman
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```


## Game Instructions

1. Press any letter key (A-Z) to guess a letter in the word.
2. The correct letter will fill in the corresponding blank spaces.
3. If the letter is incorrect, it will be added to the list of wrong guesses.
4. You have a maximum of 6 incorrect guesses before the game is over.
5. The game ends when either all letters are guessed correctly or when you reach 6 incorrect guesses.

