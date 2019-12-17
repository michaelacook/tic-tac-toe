// Game interaction layer

const game = new Game();

const startBtn = document.getElementById('start');


/**
 * Initialize DOM variables, start game play
 * @param {Event} e - click event
 */
startBtn.addEventListener('click', (e) => {
    const playerName = document.getElementById('playerName').value;
    const playerPiece = document.getElementById('playerPiece').value;
    startBtn.style.display = 'none';
    document.getElementById('description').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('gameStatus').style.display = 'block';
    if (playerName !== "") {
        game.initializeGame(playerPiece, playerName);
    } else {
        game.initializeGame(playerPiece);
    }
});


/**
 * Click handler
 * @param {Event} e - click event
 * Call playerMove method, pass Player object to checkForWin method
 * Call computerMove method, pass Computer object to checkForWin method
 */
document.addEventListener('click', e => {
    if (game.board.emptySpaceIDs.includes(e.target.id)) {
        const player = game.playerMove(e.target.id);
        if (!game.checkForWin(player)) {
            setTimeout(() => {
                if (game.difficulty === "veryEasy") {
                    const computer = game.computerMove(game.board.emptySpaces);
                    game.checkForWin(computer);
                } else {
                    const computer = game.computerMove(game.board.spaces, game.board.spacesByCoordinate);
                    game.checkForWin(computer);
                }
            }, 1200);
        }
        game.checkForGameOver();
    }
});
