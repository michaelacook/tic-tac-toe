// Represents the HTML X or O piece played on the board

class Piece
{

    /**
     * @param {String} piece - must be either 'x' or '0'
     * @param {String} owner - player that used the piece (player1 or computer)
     */
    constructor(piece, owner)
    {
        this.owner = owner;
        switch (piece) {
            case 'x':
                this.html = `
                    <div class="text-center">
                        <i class="fas fa-times fa-6x text-muted"></i>
                    </div>
                `;
                this.type = 'X';
                break;
            case 'o':
                this.html = `
                    <div class="text-center">
                        <i class="far fa-circle fa-5x text-secondary"></i>
                    </div>
                `;
                this.type = 'O';
                break;
        }
    }
}
