// Computer inherits from Player, represents the computer opponent

/*
Need to alter the calculateMove() and analyzeBoard() algorithm as it favours any row
or column with an occupied length of 2 most, when it should favour
rows or columns that it can win
*/

class Computer extends Player
{

    constructor(item, name)
    {
        super(item, name);
    }


    /**
     *
     */
    move(spaces, rows)
    {
        const space = this.calculateMove(spaces, rows);
        space.piece = this.drawPiece(space.id);
        space.occupied = true;
        return true;
    }


    /**
     * Calculate the highest-rated potential move
     * @param {Array} spaces - an array of all currently empty spaces on the board
     * @param {Array} rows - multidimensional array of all rows and columns including diagonal
     */
    calculateMove(spaces, rows)
    {
        const potentialSpaces = this.analyzeBoard(spaces, rows);
        console.log(potentialSpaces)
        const targetSpace = potentialSpaces.reduce((highest, space) => {
                if (space.rating > highest.rating) {
                    highest = space;
                    return highest;
                }
                return highest;
            });
        return targetSpace.el;
    }


    /**
     * @param {Array} spaces - an array of all currently empty spaces on the board
     * @param {Array} rows - multidimensional array of all rows and columns including diagonal
     */
    analyzeBoard(spaces, rows)
    {
        const analyzed = new Array();
        const [horizontal, leftDiagonal, rightDiagonal, vertical] = rows;

        spaces.forEach(space => {
            const x = space.x;
            const y = space.y;
            const potential = { el: space, rating: 0 };
            const occupiedHorizontals = horizontal[y].filter(space => space.occupied);
            const occupiedVerticals = vertical[x].filter(space => space.occupied);

            if (occupiedHorizontals.lenth === 2) {
                potential.rating += 10;
            } else if (occupiedHorizontals.length === 1) {
                potential.rating += 5;
            } else {
                potential.rating = potential.rating;
            }
            if (occupiedVerticals.lenth === 2) {
                potential.rating += 10;
            } else if (occupiedVerticals.length === 1) {
                potential.rating += 5;
            } else {
                potential.rating = potential.rating;
            }

            // analyze diagonal spaces
            if (
                space.x !== 1 && space.y !== 0 ||
                space.x !== 0 && space.y !== 1 ||
                space.x !== 2 && space.y !== 1 ||
                space.x !== 1 && space.y !== 2
            ) {
                const occupiedRightDiagonal = rightDiagonal.filter(space => space.occupied);
                const occupiedLeftDiagonal = leftDiagonal.filter(space => space.occupied);

                // center space
                if (space.x === 1 && space.y === 1) {
                    if (occupiedRightDiagonal.length === 2) {
                        potential.rating += 10;
                    } else if (occupiedRightDiagonal.length === 1) {
                        potential.rating += 5;
                    } else {
                        potential.rating = potential.rating;
                    }

                    if (occupiedLeftDiagonal.length === 2) {
                        potential.rating += 10;
                    } else if (occupiedLeftDiagonal.length === 1) {
                        potential.rating += 5;
                    } else {
                        potential.rating = potential.rating;
                    }
                } else if (
                    (space.x === 2 && space.y === 2) ||
                     space.x === 0 && space.y === 0
                    ) {
                        if (occupiedRightDiagonal.length === 2) {
                            potential.rating += 10;
                        } else if (occupiedRightDiagonal.length == 1) {
                            potential.rating += 5;
                        } else {
                            potential.rating = potential.rating;
                        }
                } else if (
                    (space.x === 2 && space.y === 0) ||
                           space.x === 0 && space.y === 2
                    ) {
                        if (occupiedLeftDiagonal.length === 2) {
                            potential.rating += 10;
                        } else if (occupiedLeftDiagonal.length == 1) {
                            potential.rating += 5;
                        } else {
                            potential.rating = potential.rating;
                        }
                    }
            }
            analyzed.push(potential);
        });

        return analyzed;
    }
}
