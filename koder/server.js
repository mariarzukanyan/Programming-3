var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(3000, function () {
    console.log("App is running on port 3000");
});



let Predator = require('./predator')
let Grass = require('./grass')
let GrassEater = require('./grasseater')
let Betman = require('./betman')
let Avast = require('./avast')



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

matrixGenerator(30, 150, 70, 40, 40, 7, 8)

function createGame() {
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


function playGame() {

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
    io.emit('update matrix', matrix)
}

let intervalID;

function startPlaying() {
    clearInterval(intervalID)
    intervalID = setInterval(() => {
        playGame()
    }, 1000);
}



io.on('connection', function (socket) {
    socket.emit('update matrix', matrix)
    createGame()
    startPlaying()
})

