// Base class for all players of the game, human and computer

class Player
{

    /**
     * @param {String} item - the piece Player will use on the board: either 'x' or 'o'
     * @param {String} name - human player name
     */
    constructor(item, name)
    {
        this.item = item;
        this.name = name;
    }


    /**
     * Appends an piece to the board at the space with the given id
     * @param {String} id - DOM id for target space
     */
    drawPiece(id)
    {
        const piece = new Piece(this.item, this);
        document.getElementById(id).innerHTML = piece.html;
        return piece;
    }


    /**
     * Draw a piece at the selected space
     * @param {Array} spaces - array of empty spaces on the board
     * @param {String} id - target space DOM id
     */
    move(spaces, id)
    {
        for (let space of spaces) {
            if (space.id === id) {
                space.occupied = true;
                if (space.piece = this.drawPiece(id)) {
                    return true;
                }
                break;
            }
        }
    }
}
