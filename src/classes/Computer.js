class Computer extends Player
{

    constructor(item, name = null)
    {
        super(item, name = null);
    }



    /* For development purposes only. Currently only selects a random space.
    Future version should compute a strategic space */
    move(emptySpaces)
    {
        const self = this;
        if (emptySpaces.length > 0) {
            const space = emptySpaces[ Math.floor(Math.random() * emptySpaces.length) ];
            setTimeout(() => {
                space.piece = self.drawPiece(space.id);
                space.occupied = true;
            }, 1500);
        }
    }
}
