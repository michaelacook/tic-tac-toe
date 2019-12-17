class Board
{

    constructor()
    {
        this.spaces = this.createSpaces();
    }

    /**
     * Draws the game board
     * @param {String} id - DOM id for parent element of board
     */
    drawBoard(id)
    {
        document.getElementById(id).innerHTML = `
            <table class="mx-auto mt-5" id="board">
                <tr>
                    <td class="border-right border-bottom border-dark" id="col-0-row-0"></td>
                    <td class="border-bottom border-right border-dark" id="col-1-row-0"></td>
                    <td class="border-bottom border-left border-dark" id="col-2-row-0"></td>
                </tr>
                <tr>
                    <td class="border-right border-top border-bottom border-dark" id="col-0-row-1"></td>
                    <td class="border border-dark" id="col-1-row-1"></td>
                    <td class="border-bottom border-top border-left border-dark" id="col-2-row-1"></td>
                </tr>
                <tr>
                    <td class="border-top border-right border-dark" id="col-0-row-2"></td>
                    <td class="border-top border-left border-right border-dark" id="col-1-row-2"></td>
                    <td class="border-top border-left border-dark" id="col-2-row-2"></td>
                </tr>
            </table>
        `;
    }


    /**
     * Generates internal representation of game board spaces
     * @return {Array} two-dimensional array of Space objects
     */
    createSpaces()
    {
        const spaces = new Array();
        for (let i = 0; i < 3; i++) {
            const row = new Array();
            for (let j = 0; j < 3; j++) {
                row.push(new Space(i, j));
            }
            spaces.push(row);
        }
        return spaces;
    }


    /**
     * Getter for all spaces on the board that are not occupied
     * Used to determine if game over
     * @return {Array} array of all empty spaces
     */
    get emptySpaces()
    {
        return [ ...this.spaces[0], ...this.spaces[1], ...this.spaces[2] ]
            .filter(space => !space.occupied);
    }


    /**
     * Getter for all DOM ids for empty spaces
     * Used in app.js in click-handler to prevent function calls when non-space is clicked
     * @return {Array} array if DOM ids
     */
    get emptySpaceIDs()
    {
        const ids = new Array();
        this.emptySpaces.forEach(space => ids.push(space.id));
        return ids;
    }


    /**
     * Getter for an object of key-value pairs of Space coordinates and instances
     * @return {Object} key-value pairs of coordinates and Space instances
     */
    get spacesByCoordinate()
    {
        const coordinates = new Object();
        for (let column of this.spaces) {
            for (let space of column) {
                coordinates[`${space.x}:${space.y}`] = space;
            }
        }
        return coordinates;
    }


    /**
     * Getter for right diagonal spaces
     * @return {Array} array of spaces
     */
    get rightDiagonalSpaces()
    {
        const diagonal = new Array();
        for (let i = 0; i < 3; i++) {
            diagonal.push(this.spaces[i][i]);
        }
        return diagonal;
    }


    /**
     * Getter for left diagonal spaces
     * @return {Array} array of spaces
     */
    get leftDiagonalSpaces()
    {
        const diagonal = new Array();
        let count = 0;
        for (let i = 2; i >= 0; i--) {
            diagonal.push(this.spaces[i][count]);
            count++;
        }
        return diagonal;
    }


    /**
     * Getter for horizontal spaces
     * @return {Array} array of spaces
     */
    get horizontalSpaces()
    {
        const horizontal = new Array();
        for (let i = 0; i < 3; i++) {
            const row = new Array();
            for (let j = 0; j < 3; j++) {
                row.push(this.spaces[j][i]);
            }
            horizontal.push(row);
        }
        return horizontal;
    }
}
