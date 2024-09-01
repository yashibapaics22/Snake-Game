let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");
let cellsize = 50; //height and width for each cell
let snakecells = [[0, 0]]; //2d array to store starting points of snake ka rectangle
let boardwidth = 1000;
let boardheight = 600;
let direction = "right";
let gameover = false; // wall se touch hone ke bad ho jaye true
let foodcells = generatefood(); //bcz we need two values x and y
let score = 0;


//bar bar repeat karna
let intervalID = setInterval(function () {
  update();
  draw();
}, 180);

//keydown event is trigerred
//har event aone sath ek event nam ka object leke aata hai
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  } else {
    direction = "right";
  }
});
// down : x-> no , y-> +ve cellsize
// up : x-> no , y-> -ve cellsize
// left : x -> -ve cellsize , y-> no
// right : x -> +ve cellsize , y-> no

//function to draw snake
function draw() {
  if (gameover === true) {
    clearInterval(intervalID);
    ctx.fillStyle='red';
    ctx.font='50px monospace'
    ctx.fillText('GAME OVER !!!',350,300);
     return;
  }
  //snake draw
  ctx.clearRect(0, 0, boardwidth, boardheight);
  for (let cell of snakecells) {
    ctx.fillStyle = "red";
    // Create a gradient effect
    let gradient = ctx.createLinearGradient(cell[0], cell[1], cell[0] + cellsize, cell[1] + cellsize);
    gradient.addColorStop(0, "red");
    gradient.addColorStop(1, "orange");

    ctx.fillStyle = gradient;
    ctx.fillRect(cell[0], cell[1], cellsize, cellsize);
    ctx.strokeStyleStyle = "orange";
    ctx.strokeRect(cell[0], cell[1], cellsize, cellsize);
  }

  //draw food
  ctx.fillStyle = "green";
  ctx.fillRect(foodcells[0], foodcells[1], cellsize, cellsize);

  //draw score
  ctx.font=`24px monospace`
  ctx.fillText(`Score: ${score}`,20,25);
}

//function to update snake
function update() {
  let headX = snakecells[snakecells.length - 1][0];
  let headY = snakecells[snakecells.length - 1][1];

  //    let newheadX=headX+cellsize;
  //    let newheadY=headY;
  let newheadX;
  let newheadY;

  if (direction === "right") {
    newheadX = headX + cellsize;
    newheadY = headY;
    if (newheadX === boardwidth || khagyakhudko(newheadX,newheadY)) {
      gameover = true;
    }
  } else if (direction === "left") {
    newheadX = headX - cellsize;
    newheadY = headY;
    if (newheadX < 0 || khagyakhudko(newheadX,newheadY)) {
      gameover = true;
    }
  } else if (direction === "up") {
    newheadX = headX;
    newheadY = headY - cellsize;
    if (newheadY < 0 || khagyakhudko(newheadX,newheadY)) {
      gameover = true;
    }
  } else {
    newheadX = headX;
    newheadY = headY + cellsize;
    if (newheadY === boardheight || khagyakhudko(newheadX,newheadY)) {
      gameover = true;
    }
  }

  snakecells.push([newheadX, newheadY]); //pushing in array new heads

  if (newheadX === foodcells[0] && newheadY === foodcells[1]) {
    foodcells = generatefood();
    score+=1;
  } else {
    snakecells.shift();
  } //peeche se remove bhi toh karna hai
}

//pehle update kyunki first we dip our brush in color then draw

function generatefood() {
  return [
    Math.round((Math.random() * (boardwidth - cellsize)) / cellsize) * cellsize,
    Math.round((Math.random() * (boardheight - cellsize)) / cellsize) *
      cellsize,
  ];
}

function khagyakhudko(newheadX,newheadY){
  //loop
    for (let item of snakecells){
      if (item[0]===newheadX && item[1]===newheadY){
        return true;
      }
    }
    return false;
}
