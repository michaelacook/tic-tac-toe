class Game
{

    constructor()
    {
        this.board = new Board();
        this.active = false;
        this.players = new Array();
    }


    /**
     * Initializes gameplay
     */
    initializeGame()
    {
        this.active = true;
        this.board.drawBoard('boardArea');
        this.createPlayers('x');
        this.players[0].active = true;
    }


    createPlayers(playerPiece)
    {
        this.players.push(new Player(playerPiece));
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
                        console.log(id)
                        if (this.players[0].active) {
                            space.occupied = true;
                            space.piece = this.players[0].drawPiece(id);
                        }
                        break;
                    }
                }
            }
        }
    }
}
