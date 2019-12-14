// Game interaction layer

const game = new Game();


const startBtn = document.getElementById('start');

// Display game board, remove start button
startBtn.addEventListener('click', (e) => {
    startBtn.style.display = 'none';
    const playerName = document.getElementById('playerName').value;
    const playerPiece = document.getElementById('playerPiece').value;
    document.getElementById('description').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    game.initializeGame(playerPiece, playerName);

    // for dev purposes
    console.log(game.board.spaces);
});


/**
 * Click handler
 * Runs the Game.move method and passes its return value to the Computer.move method
 */
document.addEventListener('click', e => {
    game.computerMove(game.move(e.target.id), game.emptySpaces);
    game.checkForGameOver();
});
