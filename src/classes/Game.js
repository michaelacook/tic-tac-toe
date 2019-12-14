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
    initializeGame(playerPiece, playerName)
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
        console.log('Game.js line 29')
        if (!this.win) {
            if (this.emptySpaces.length === 0) {
                this.active = false;
                document.getElementById('gameStatus').innerHTML = `<h5 class="text-danger">No more available spaces. Game over!</h5>`;
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
    createPlayers(playerPiece, name = null)
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
    computerMove(bool, spaces)
    {
        if (bool) {
            if (this.players[1].active) {
                this.players[1].move(spaces);
            }
            this.togglePlayers();
        }
    }


    /**
     * Player move
     * @param {String} id - DOM id of clicked space
     */
    move(id)
    {
        if (this.active) {
            for (let col of this.board.spaces) {
                for (let space of col) {
                    if (space.id == id) {
                        // for dev purposes
                        console.log(id)
                        if (this.players[0].active) {
                            this.togglePlayers();
                            space.occupied = true;
                            space.piece = this.players[0].drawPiece(id);
                            return true;
                        }
                        break;
                    }
                }
            }
        }
    }


    /**
     * Getter for all spaces on the board that are not occupied
     * @return {Array} array of all empty spaces
     */
    get emptySpaces()
    {
        return [
            ...this.board.spaces[0],
            ...this.board.spaces[1],
            ...this.board.spaces[2]
        ].filter(space => !space.occupied);
    }
}
