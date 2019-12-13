// Game interaction layer

const board = document.getElementById('board');
const startBtn = document.getElementById('start');

// Display game board, remove start button
start.addEventListener('click', (e) => {
    board.style.display = "table";
    start.style.display = "none";
});
