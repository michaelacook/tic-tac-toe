class Game
{

    constructor(difficulty = "easy")
    {
        this.board = new Board();
        this.active = false;
        this.players = new Array();
        this.difficulty = difficulty;
        this.win = false;
    }


    /**
     * Initializes gameplay
     * @param {String} playerPiece - piece (x or o) that player will use
     */
    initializeGame(playerPiece, playerName = 'Player1')
    {
        this.active = true;
        this.board.drawBoard('boardArea');
        this.createPlayers(playerPiece, playerName);
        this.players[0].active = true;
        this.players[1].active = false;
    }


    /**
     * Check if no more spaces are available + no player wins
     * Add game over message to screen
     */
    checkForGameOver()
    {
        if (!this.win) {
            if (this.board.emptySpaces.length === 0) {
                this.active = false;
                document.getElementById('gameStatus').innerHTML = `
                    <h5 class="text-danger">No more available spaces. Game over!</h5>
                `;
            }
        }
    }


    /**
     * Toggle the active value of each player
     */
    togglePlayers()
    {
        this.players.forEach(player => player.active = !player.active);
    }


    /**
     * Creator method for Player objects
     * @param {String} playerPiece - 'x' or 'o' to be played
     */
    createPlayers(playerPiece, name)
    {
        this.players.push(new Player(playerPiece, name));
        if (playerPiece === 'o') {
            var computerPiece = 'x'
        } else {
            var computerPiece = 'o';
        }
        switch (this.difficulty) {
            case "easy":
                this.players.push(new Computer(computerPiece, 'Computer'));
                break;
            case "hard":
                this.players.push(new HardComputer(computerPiece, 'Computer'));
                break;
        }
    }


    /**
     * Computer move
     * @param {Array} spaces - array of empty Space objects
     * @param {Array} rows - array of all the rows and columns on the board
     * @return {Object} Computer object to be passed to checkForWin() method
     */
    computerMove(spaces, rows)
    {
        if (this.active) {
            if (this.players[1].move(spaces, rows)) {
                this.togglePlayers();
                return this.players[1];
            }
        }
    }


    /**
     * Player move
     * @param {String} id - DOM id of clicked space
     * @return {Object} Player object to be passed to checkForWin() method
     */
    playerMove(id)
    {
        if (this.active) {
            if (this.players[0].active) {
                if (this.players[0].move(this.board.emptySpaces, id)) {
                    this.togglePlayers();
                    return this.players[0];
                }
            }
        }
    }


    /**
     * Run methods to check for vertical, horizontal and diagonal wins
     * @param {Object} player - Player object for whom game win is being checked
     * @return {bool} true on win, else false
     */
    checkForWin(player)
    {
        if (
            this.verticalWin(player) ||
            this.horizontalWin(player) ||
            this.leftDiagonalWin(player) ||
            this.rightDiagonalWin(player)
            ) {
                this.win = true;
                this.active = false;
                document.getElementById('gameStatus').innerHTML = `
                    <h5 class="text-dark">${player.name} wins!</h5>
                `;
                return true;
        } else {
            return false;
        }
    }


    /**
     * Check for right diagonal win
     * @param {Object} player - player for which win is being checked
     */
    rightDiagonalWin(player)
    {
        if (this.board.rightDiagonalSpaces.filter(space => space.occupied)
            .filter(space => space.piece.owner === player)
            .length === 3) return true;
        return false;
    }


    /**
     * Check for left diagonal win
     * @param {Object} player - player for which win is being checked
     */
    leftDiagonalWin(player)
    {
        if (this.board.leftDiagonalSpaces.filter(space => space.occupied)
            .filter(space => space.piece.owner === player)
            .length === 3) return true;
        return false;
    }


    /**
     * Checks for a horizontal win in all columns of the game board
     * To be called in checkForWin
     * @param {Object} player - the player object for which a win is being checked
     */
    horizontalWin(player)
    {
        for (let row of this.board.horizontalSpaces) {
            if (row.filter(space => space.occupied)
                .filter(space => space.piece.owner === player)
                .length === 3) return true;
        }
        return false;
    }


    /**
     * Checks for a vertical win in all columns of the game board
     * To be called in checkForWin
     * @param {Object} player - the player object for which a win is being checked
     */
    verticalWin(player)
    {
        for (let column of this.board.spaces) {
            if (column.filter(space => space.occupied)
                .filter(space => space.piece.owner === player)
                .length === 3) return true;
        }
        return false;
    }
}
