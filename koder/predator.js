let LivingCreature = require('./livingCreature')
let random = require("./random");
module.exports =class Predator extends LivingCreature {
  constructor(x, y) {
    super(x, y)
    this.energy = 8;
    this.directions = [];
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1]
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates()
    return super.chooseCell(character)
  }
  mul() {
    var newCell = random(this.chooseCell(2));
    if (newCell) {
      var newGrassP = new Predator(newCell[0], newCell[1], this.index);
      predatorArr.push(newGrassP);
      matrix[newCell[1]][newCell[0]] = 3;
      this.energy = 8;
    }
  }
  eat() {
    let xndzorner = this.chooseCell(2)
    let xndzor = random(xndzorner)
    if (xndzor) {
      this.energy++;
      matrix[this.y][this.x] = 0
      let newX = xndzor[0]
      let newY = xndzor[1]
      matrix[xndzor[1]][xndzor[0]] = 3
      this.x = newX
      this.y = newY
      for (var i in grassEaterArr) {
        if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    }
    else {
      this.move()
    }
  }

  move() {
    this.energy--;
    let xndzorner = this.chooseCell(0)
    let xndzor = random(xndzorner)
    if (xndzor) {
      let newX = xndzor[0]
      let newY = xndzor[1]
      matrix[this.y][this.x] = 0
      matrix[xndzor[1]][xndzor[0]] = 3
      this.x = newX
      this.y = newY
    }
    if (this.energy <= 0) {
      this.die()
    }
  }

  die() {
    matrix[this.y][this.x] = 0;
    for (var i in grassEaterArr) {
      if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
        grassEaterArr.splice(i, 1);
        break;
      }

    }

  }

}