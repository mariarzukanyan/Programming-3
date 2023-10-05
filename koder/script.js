
var matrix = [];
var side = 40;
var grassArr = [];
var grassEaterArr = [];
var predatorArr = [];
var avastArr = [];
var betmanArr = [];
var bombArr = [];
function matrixGenerator(size, countGrass, countGrassEater, PredatoCount, AvastCount, BetmanCount, BombCount) {
    for (let i = 0; i < size; i++) {
        matrix.push([]);
        for (let j = 0; j < size; j++) {
            matrix[i].push(0);

        }
    }

    for (let k = 0; k < countGrass; k++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 1
    }
    for (let u = 0; u < countGrassEater; u++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 2
    }
    for (let o = 0; o < PredatoCount; o++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 3
    }
    for (let s = 0; s < AvastCount; s++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 4
    }
    for (let v = 0; v < BetmanCount; v++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 7 ////chgitem xi 7 bayc tenc uzeci
    }
    for (let g = 0; g < BombCount; g++) {
        let x = Math.floor(random(size))
        let y = Math.floor(random(size))
        matrix[y][x] = 13 ////chgitem xi 13 bayc tenc uzeci
    }
}
function setup() {

    matrixGenerator(30, 150, 70, 40, 40, 7, 8)
    console.log(matrix);
    frameRate(3);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                var gre = new GrassEater(x, y, 2)
                grassEaterArr.push(gre)
            }
            else if (matrix[y][x] == 3) {
                var pre = new Predator(x, y, 3)
                predatorArr.push(pre)
            }
            else if (matrix[y][x] == 4) {
                var ave = new Avast(x, y, 4)
                avastArr.push(ave)
            }
            else if (matrix[y][x] == 7) {
                var bet = new Betman(x, y, 7)
                betmanArr.push(bet)
            }
            else if (matrix[y][x] == 13) {
                var bbb = new Bomb(x, y, 13)
                bombArr.push(bbb)
            }
        }
    }

}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow")
            }
            else if (matrix[y][x] == 3) {
                fill("red")
            }
            else if (matrix[y][x] == 4) {
                fill("blue")
            }
            else if (matrix[y][x] == 7) {
                fill("indigo")
            }
            else if (matrix[y][x] == 13) {
                fill("black")
            }
            rect(x * side, y * side, side, side);
        }
    }

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].eat();
    }
    for (var i in predatorArr) {
        predatorArr[i].eat();
    }
    for (var i in avastArr) {
        avastArr[i].eat();
    }
    for (var i in betmanArr) {
        betmanArr[i].eat();
    }
    for (var i in bombArr) {
        bombArr[i].start();
    }
}


