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
}
