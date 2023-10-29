let side = 10;
const sideX = 30;
const sideY = 30;
var initialMatrix = []
const socket = io();
const dzmer=  document.getElementById("winter");
const amar =  document.getElementById("summer");


function setup() {
   createCanvas(sideX * side, sideY * side);
   background('#acacac');

}
   

function drawful(matrix) {
    initialMatrix = matrix
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


}

socket.on("update matrix", (matrix)=>{
    drawful(matrix)
   })
 socket.on("update matrix", (matrix)=>{
  initialMatrix = matrix
 })
