class Player
{

    /**
     * @param {String} item - the piece Player will use on the board: either 'x' or 'o'
     */
    constructor(item, name = null)
    {
        this.item = item;
        if (name !== null) {
            this.name = name;
        }
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
}
