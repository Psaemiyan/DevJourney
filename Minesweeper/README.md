# Minesweeper Game

## Overview

This is a Minesweeper game built using **React**, **JavaScript**, and **CSS**. The game is an **intermediate level** Minesweeper puzzle with a **16x16 grid** and **40 mines** scattered across the board. Players can interact with the game by clicking cells to reveal them, and right-clicking to flag suspected mines. The game also supports **flood fill**, which automatically reveals adjacent cells when a player clicks a cell with no adjacent mines.

When the player wins or loses, an alert is shown to indicate the result.

![Minesweeper Game](./minesweeper.jpeg)


## Features

- **16x16 Grid** with 40 mines.
- **Flag Mines** by right-clicking a cell.
- **Flood Fill** to automatically reveal adjacent cells with no nearby mines.
- **Win and Lose Alerts** after the game ends.

## How to Play

1. **Left-click** on a cell to reveal it.
   - If you reveal a mine, the game ends, and an alert will notify you that you've lost.
   - If the cell has no adjacent mines, it will automatically reveal its neighboring cells (flood fill).
   
2. **Right-click** to flag a cell that you suspect contains a mine. The flagged cells are marked with a 🚩.
   
3. **Win Condition**: The game is won when all non-mine cells are revealed.
   
4. **Lose Condition**: The game is lost when a mine is revealed.

## Setup

To get started with the Minesweeper game on your local machine, follow these steps:

### 1. Clone the Repository
```bash
git clone https://github.com/psaemiyan/DevJourney/Minesweeper.git
cd Minesweeper
npm install
npm run dev
