class Avast {
    constructor(x, y) {
      this.x = x;
      this.y = y;
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
      var found = [];
      this.getNewCoordinates()
      for (var i in this.directions) {
        var x = this.directions[i][0];
        var y = this.directions[i][1];
        if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
          if (matrix[y][x] == character) {
            found.push(this.directions[i]);
          }
        }
  
      }
      return found;
    }
    mul() {
      var newCell = random(this.chooseCell(0));
      if (newCell) {
        var newGrassA = new Avast(newCell[0], newCell[1], this.index);
        predatorArr.push(newGrassA);
        matrix[newCell[1]][newCell[0]] = 4;
        this.energy = 8;
      }
    }
    eat() {
      let virusner = this.chooseCell(3)
      let virus = random(virusner)
      if (virus) {
        this.energy++;
        matrix[this.y][this.x] = 0
        let newX = virus[0]
        let newY = virus[1]
        matrix[virus[1]][virus[0]] = 4
        this.x = newX
        this.y = newY
        for (var i in predatorArr) {
          if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
            predatorArr.splice(i, 1);
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
      let virusner = this.chooseCell(0)
      let virus = random(virusner)
      if (virus) {
        let newX = virus[0]
        let newY = virus[1]
        matrix[this.y][this.x] = 0
        matrix[virus[1]][virus[0]] = 4
        this.x = newX
        this.y = newY
      }
      if (this.energy <= 0) {
        this.die()
      }
    }
  
    die() {
      matrix[this.y][this.x] = 0;
      for (var i in predatorArr) {
        if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
            predatorArr.splice(i, 1);
          break;
        }
  
      }
  
    }
  
  }