import { useEffect } from "react"

export default function Hangman({word, setWrongLetters, gameOver, setGameOver, spot, setSpot, checkWin, setWinMessage})
{
    const wordArr = word.toUpperCase().split('') 

    const handleKeyPress = (e) => {
        if (gameOver) return
    
        const keyPressed = e.key.toUpperCase()
    
        if (keyPressed.length === 1 && keyPressed.match(/[A-Z]/)) {
            if (wordArr.includes(keyPressed)) {
                setSpot((prevSpot) => {
                    const updatedSpot = [...prevSpot]
                    wordArr.forEach((letter, index) => {
                        if (letter === keyPressed) {
                            updatedSpot[index] = letter
                        }
                    })
                    if(checkWin(updatedSpot)) 
                    {
                        setGameOver(true)
                        setWinMessage("You Win!")
                    }
                    
                    return updatedSpot
                })
            } else {
                setWrongLetters((prev) => {
                    const updatedWrongLetters = prev.includes(keyPressed) ? prev : [...prev, keyPressed]
    
                    if (updatedWrongLetters.length === 6) {
                        setGameOver(true)
                    }
    
                    return updatedWrongLetters;
                })
            }
        }
    }
    
    useEffect(() => {
        if (spot.every((letter) => letter !== "")) {
          setGameOver(true);
          setWinMessage("You Win!");
        }
      }, [spot, setGameOver, setWinMessage])

    useEffect(() => {
        window.addEventListener('keyup', handleKeyPress)
        return () => {
            window.removeEventListener('keyup', handleKeyPress)
        }
    }, [gameOver, spot])

    return <>
    </>
}