// Computer inherits from Player, represents the computer opponent

class Computer extends Player
{

    constructor(item, name)
    {
        super(item, name);
    }


    /* For development purposes only. Currently only selects a random space.
    Future version should compute a strategic space */
    move(emptySpaces)
    {
        if (emptySpaces.length > 0) {
            const space = emptySpaces[ Math.floor(Math.random() * emptySpaces.length) ];
            space.piece = this.drawPiece(space.id);
            space.occupied = true;
            return true;
        }
    }
}

/*
Developing computer move calculation algorithm:

-Write getters for the Board object to return arrays containing all
 rows, columns, and left and right diagonals
-Use those getters in the Game object methods to check for wins
-Also use those getters in a Computer object method to assign each space
 on the board a rating of -10, -5, 0, 5, 10 (or some kind of rating) based on
 how likely completing the row is by moving to each piece. Return an array of objects
 that each contain a rating and set of coordinates
-Loop through the objects containing ratings and coordinates, select the highest
-Pass the id of the highest rated space to the move() method
-If there are multiple spaces with the same rating, select one randomly?
-Do some version of this to intelligently select a Computer move
*/
