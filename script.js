const board = document.querySelector(".board");
let btnstart = document.querySelector(".btnStart");
let btnend = document.querySelector(".btnEnd");
let open = document.querySelector(".start-game");
let end = document.querySelector(".game-over");

//Navbar
let score = document.querySelector(".score")
let highScore = document.querySelector(".hs")

let s = 0;
let hs = localStorage.getItem("hs") || 0;
let time = `00-00`

highScore.innerHTML = hs;

var h = 60;
var w = 60;
var rows = Math.floor(board.clientHeight / h);
var cols = Math.floor(board.clientWidth / w);

let boxs = [];
let snake = [{ x: 1, y: 1 }];
let direction = "right";

var clear = null;
var food = {
  x: Math.floor(Math.random() * rows),
  y: Math.floor(Math.random() * cols),
};
// console.log("horizontal count", rows);
// console.log(cols);

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const box = document.createElement("div");
    box.classList.add("box");
    board.appendChild(box);
    box.textContent = `${row}-${col}`;

    boxs[`${row}-${col}`] = box;
  }
}


function render() {

  // 1️⃣ SHOW FOOD ON GRID (safe)
  const foodCell = boxs[`${food.x}-${food.y}`];
  if (foodCell) foodCell.classList.add("foody");


  // 2️⃣ CALCULATE NEXT HEAD POSITION (based on direction)
  let head = null;

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }


  // 3️⃣ GAME OVER CHECK — SEQUENCE MAT CHANGE KARNA
  if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
    end.style.display = "flex";
    clearInterval(clear);
    return;   // BAHUT BADA POINT – render Yahin BAND hona chahiye
  }


  // 4️⃣ REMOVE OLD SNAKE FROM BOARD (safe deletion)
  snake.forEach((segment) => {
    const cell = boxs[`${segment.x}-${segment.y}`];
    if (cell) cell.classList.remove("fill");
  });


  // 5️⃣ UPDATE SNAKE ARRAY (head add, tail remove)
  snake.unshift(head);
  snake.pop();


  // 6️⃣ DRAW NEW UPDATED SNAKE ON BOARD
  snake.forEach((segment) => {
    const cell = boxs[`${segment.x}-${segment.y}`];
    if (cell) cell.classList.add("fill");
  });


  // 7️⃣ FOOD EAT LOGIC — at the END only
  if (head.x === food.x && head.y === food.y) {

    s += 10;
    score.innerHTML = s;

    if(s > hs){
      hs = s;
      localStorage.setItem("hs", hs)
    }
    // remove eaten food
    const foodCell = boxs[`${food.x}-${food.y}`];
    if (foodCell) foodCell.classList.remove("foody");

    // set new food
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };

    // show new food
    const newFood = boxs[`${food.x}-${food.y}`];
    if (newFood) newFood.classList.add("foody");

    // grow snake (do NOT pop tail)
    snake.unshift(head);
  }
}


document.addEventListener("keydown", (event) => {
  console.log(event.key);

  if (event.key === "ArrowUp") {
    direction = "up";
  } else if (event.key === "ArrowDown") {
    direction = "down";
  } else if (event.key === "ArrowRight") {
    direction = "right";
  } else if (event.key === "ArrowLeft") {
    direction = "left";
  }
});

btnstart.addEventListener("click", function () {
  open.style.display = "none";
  clear = setInterval(() => {
    render();
  }, 300);
});

btnend.addEventListener("click", restartGame);


function restartGame() {
  s = 0;
  time = `00-00`
  // 1️⃣ STOP OLD INTERVAL (sabse bada fix)
  clearInterval(clear);


  // 2️⃣ REMOVE OLD FOOD (safe check)
  const oldFood = boxs[`${food.x}-${food.y}`];
  if (oldFood) oldFood.classList.remove("foody");


  // 3️⃣ REMOVE OLD SNAKE (safe check)
  snake.forEach((segment) => {
    const cell = boxs[`${segment.x}-${segment.y}`];
    if (cell) cell.classList.remove("fill");
  });


  // 4️⃣ RESET VALUES (direction, snake position, new food)
  end.style.display = "none"; // hide game over screen

  direction = "right";
  snake = [{ x: 1, y: 1 }];

  food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
  };


  // 5️⃣ START NEW GAME LOOP
  clear = setInterval(render, 300);
}
