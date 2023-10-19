let LivingCreature = require('./livingCreature')
let random = require("./random");
module.exports = class Betman extends LivingCreature{
    constructor(x, y, index) {
        super(x, y)
        this.energy = 10;
        this.index = index;
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

    chooseCell(character, character2, character3, character4) {
        var found = [];
        this.getNewCoordinates()
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (newCell) {
            var newbetman = new Betman(newCell[0], newCell[1], this.index);
            betmanArr.push(newbetman);
            matrix[newCell[1]][newCell[0]] = 7;
            this.energy = 10;
        }
    }
    eat() {
        let foods = this.chooseCell(3, 2, 1, 4)
        let food = random(foods)
        if (food) {
            this.energy++;
            matrix[this.y][this.x] = 0
            let newX = food[0]
            let newY = food[1]
            matrix[food[1]][food[0]] = 7
            this.x = newX
            this.y = newY


            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassEaterArr) {
                if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            for (var i in avastArr) {
                if (newX == avastArr[i].x && newY == avastArr[i].y) {
                    avastArr.splice(i, 1);
                    break;
                }
            }
            if (this.energy >= 12) {
                this.mul()
            }
        }
        else {
            this.move()
        }
    }

    move() {
        this.energy--
        let emptyCells = this.chooseCell(0)
        let newCell = random(emptyCells)
        if (newCell) {
            let newX = newCell[0]
            let newY = newCell[1]
            matrix[this.y][this.x] = 0
            matrix[newY][newX] = 7
            this.x = newX
            this.y = newY
        }

        if (this.energy <= 0) {
            this.die()
        }

    }
    die() {
        matrix[this.y][this.x] = 0;
        for (var i in betmanArr) {
            if (this.x == betmanArr[i].x && this.y == betmanArr[i].y) {
                betmanArr.splice(i, 1);
                break;
            }

        }
    }
}