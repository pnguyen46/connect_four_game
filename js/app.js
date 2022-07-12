const game = new Game();

/**
 * Listens for click on button and start the game.
 */
const startGameButton = document.querySelector('#begin-game');
startGameButton.addEventListener('click',(e)=>{
    game.startGame();
    e.target.style.display = 'none';
    document.querySelector('#play-area').style.opacity = '1';
})

/**
 * Listen for keyboard presses
 */

document.addEventListener('keydown',(event) => {
    game.handleKeydown(event);
})