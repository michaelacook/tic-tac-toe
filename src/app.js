// Game interaction layer

const game = new Game();
const startBtn = document.getElementById('start');


/**
 * Initialize DOM references and start game
 */
const playerInfo = startBtn.addEventListener('click', (e) => {
    const playerName = document.getElementById('playerName').value;
    const playerPiece = document.getElementById('playerPiece').value;
    startBtn.style.display = 'none';
    document.getElementById('description').style.display = 'none';
    document.getElementById('options').style.display = 'none';
    document.getElementById('gameStatus').style.display = 'block';
    if (playerName !== "" || playerName == null) {
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
                const computer = game.computerMove(game.board.emptySpaces, game.board.rowsByArray);
                game.checkForWin(computer);
            }, 1200);
        }
        game.checkForGameOver();
    }
});


/**
 * Start a new game
 */
function newGame() {
    const piece = game.players[0].item;
    const name = game.players[0].name;
    game.board.clearBoard();
    game.initializeGame(piece, name);
    document.getElementById('gameStatus').innerHTML = "";
}
