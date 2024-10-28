export const getRandomWord = () => {
    const words = ['SUSHI', 'PIZZA', 'CHAIR', 'HOUSE', 'PLANT', 'WATER', 'TABLE', 'MOUSE'];
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
};
