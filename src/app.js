// Game interaction layer

const game = new Game();


const startBtn = document.getElementById('start');

// Display game board, remove start button
startBtn.addEventListener('click', (e) => {
    startBtn.style.display = 'none';
    document.getElementById('description').style.display = 'none';
    game.initializeGame();

    // for dev purposes
    console.log(game.board.spaces);
});

// Click handler
document.addEventListener('click', e => game.move(e.target.id));
