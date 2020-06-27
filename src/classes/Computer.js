// Computer inherits from Player, represents the computer opponent

class Computer extends Player {
  constructor(item, name) {
    super(item, name)
  }

  /**
   * Make a move on the board grid
   * @param {Array} spaces - an array of all currently empty spaces on the board
   * @param {Array} rows - multidimensional array of all rows and columns including diagonal
   * @return {Bool} true
   */
  move(spaces, rows) {
    const space = this.calculateMove(spaces, rows)
    space.piece = this.drawPiece(space.id)
    space.occupied = true
    return true
  }

  /**
   * Generates an object of objects containing empty spaces and their ratings
   * @return {Object} ratingsObject
   */
  generateRatings(spaces) {
    const ratingsObject = new Object()
    spaces.forEach((space) => {
      ratingsObject[space.id] = {
        el: space,
        rating: 0,
      }
    })
    return ratingsObject
  }

  /**
   * Update an empty space rating
   * @param {Object} ratings - the object returned by generateRatings()
   * @param {String} spaceId - the DOM id string for the space being updated
   * @param {Number} rating - the amount by which the rating is increased
   */
  updateRating(ratings, spaceId, rating) {
    ratings[spaceId].rating += rating
  }

  /**
   * Analyzes an array of spaces and assigns a rating to each empty space
   * @param {Object} ratings - object of rating objects from generateRatings method
   * @param {Array} rows - an array of rows to be analyzed
   */
  analyzeSpaces(ratings, rows) {
    const priority = {
      win: 300,
      second: 175,
      third: 70,
      fourth: 30,
      fifth: 10,
    }
    rows.forEach((row) => {
      let emptySpace
      for (let i = 0; i < row.length; i++) {
        if (!row[i].occupied) {
          emptySpace = row[i]
          break
        }
      }
      const occupied = row.filter((space) => space.occupied)
      if (occupied.length === 2) {
        if (
          occupied.filter((space) => space.piece.owner.name === this.name)
            .length === 2
        ) {
          this.updateRating(ratings, emptySpace.id, priority.win)
          return
        } else if (
          occupied.filter((space) => space.piece.owner.name !== this.name)
            .length === 2
        ) {
          this.updateRating(ratings, emptySpace.id, priority.second)
        } else {
          this.updateRating(ratings, emptySpace.id, priority.fifth)
        }
      } else if (occupied.length === 1) {
        if (occupied[0].piece.owner.name === this.name) {
          this.updateRating(ratings, emptySpace.id, priority.third)
        } else {
          this.updateRating(ratings, emptySpace.id, priority.fourth)
        }
      } else if (occupied.length === 0) {
        const space = row[Math.floor(Math.random() * 3)]
        this.updateRating(ratings, space.id, priority.fifth)
      }
    })
  }

  /**
   * Calculate the highest-rated potential move
   * @param {Array} spaces - an array of all currently empty spaces on the board
   * @param {Array} rows - multidimensional array of all rows and columns including diagonal
   */
  calculateMove(spaces, rows) {
    const ratings = this.analyzeBoard(spaces, rows)
    const ratingsArray = new Array()
    for (let key in ratings) {
      ratingsArray.push(ratings[key])
    }
    const targetSpace = ratingsArray.reduce((acc, curr) => {
      if (curr.rating > acc.rating) {
        acc = curr
        return acc
      }
      return acc
    })
    return targetSpace.el
  }

  /**
   * @param {Array} spaces - an array of all currently empty spaces on the board
   * @param {Array} rows - multidimensional array of all rows and columns including diagonal
   */
  analyzeBoard(spaces, rows) {
    const ratings = this.generateRatings(spaces)
    rows.forEach((spaces) => this.analyzeSpaces(ratings, spaces))
    return ratings
  }
}
