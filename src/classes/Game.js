class Game
{

    constructor()
    {
        this.board = new Board();
        this.active = false;
        this.players = new Array();
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
            if (this.emptySpaces.length === 0) {
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
     */
    createPlayers(playerPiece, name)
    {
        this.players.push(new Player(playerPiece, name));
        if (playerPiece === 'x') {
            this.players.push(new Computer('o', 'Computer'));
        } else {
            this.players.push(new Computer('x', 'Computer'));
        }
    }


    /**
     * Computer move
     * @param {bool} bool - boolean value passed in from player move
     * @param (Array) spaces - array of empty Space objects
     */
    computerMove(spaces)
    {
        if (this.active) {
            if (this.players[1].move(spaces)) {
                this.togglePlayers();
                return this.players[1];
            }
        }
    }


    /**
     * Player move
     * @param {String} id - DOM id of clicked space
     * @return {Array} array containing boolean true and Player object instance
     */
    playerMove(id)
    {
        if (this.active) {
            if (this.players[0].active) {
                if (this.players[0].doMove(this.emptySpaces, id)) {
                    this.togglePlayers();
                    return this.players[0];
                }
            }
        }
    }


    /**
     * Run methods to check for vertical, horizontal and diagonal wins
     * @param {Object} player - Player object for whom game win is being checked
     * @return {bool} true on win
     */
    checkForWin(player)
    {
        if (this.verticalWin(player) ||
            this.horizontalWin(player) ||
            this.rightDiagonalWin(player) ||
            this.diagonalWin(player)) {
            this.win = true;
            this.active = false;
            document.getElementById('gameStatus').innerHTML = `<h5 class="text-dark">${player.name} wins!</h5>`;
            return true;
        } else {
            return false;
        }
    }


    /**
     * Call leftDiagonalWin and rightDiagonalWin methods
     * @param {Object} player - player for which win is being checked
     */
     diagonalWin(player)
     {
         if (this.rightDiagonalWin(player)) {
             return true;
         } else if (this.leftDiagonalWin(player)) {
             return true;
         }
         return false;
     }


    /**
     * Check for right diagonal win
     * @param {Object} player - player for which win is being checked
     */
    rightDiagonalWin(player)
    {
        const diagonal = new Array();
        for (let i = 0; i < 3; i++) {
            diagonal.push(this.board.spaces[i][i]);
        }
        const owners = diagonal.filter(space => space.occupied)
            .filter(space => space.piece.owner === player);
        if (owners.length === 3) {
            return true;
        }
        return false;
    }


    /**
     * Check for left diagonal win
     * @param {Object} player - player for which win is being checked
     */
    leftDiagonalWin(player)
    {
        const diagonal = new Array();
        let count = 0;
        for (let i = 2; i >= 0; i--) {
            diagonal.push(this.board.spaces[i][count]);
            count++;
        }
        const owners = diagonal.filter(space => space.occupied)
            .filter(space => space.piece.owner === player);
        if (owners.length === 3) {
            return true;
        }
        return false;
    }


    /**
     * Checks for a horizontal win in all columns of the game board
     * To be called in checkForWin
     * @param {Object} player - the player object for which a win is being checked
     */
    horizontalWin(player)
    {
        for (let i = 0; i < 3; i++) {
            const row = new Array();
            for (let j = 0; j < 3; j++) {
                row.push(this.board.spaces[j][i]);
            }
            const owners = row.filter(space => space.occupied)
                .filter(space => space.piece.owner === player);
            if (owners.length === 3) {
                return true;
            }
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
            const owners = column.filter(space => space.occupied)
                .filter(space => space.piece.owner === player);
            if (owners.length === 3) {
                return true;
            }
        }
        return false;
    }


    /**
     * Getter for all spaces on the board that are not occupied
     * Used to determine if game over
     * @return {Array} array of all empty spaces
     */
    get emptySpaces()
    {
        return [
            ...this.board.spaces[0],
            ...this.board.spaces[1],
            ...this.board.spaces[2]
        ]
        .filter(space => !space.occupied);
    }


    get emptySpaceIDs()
    {
        const ids = new Array();
        this.emptySpaces.forEach(space => ids.push(space.id));
        return ids;
    }
}
