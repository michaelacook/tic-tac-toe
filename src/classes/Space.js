// Represents a clickable space in the game board

class Space
{

    /**
     * @param {Number} x - column value
     * @param {Number} y - row value
     */
    constructor(x, y)
    {
        this.occupied = false;
        this.piece = null;
        this.id = `col-${x}-row-${y}`;
    }
}
