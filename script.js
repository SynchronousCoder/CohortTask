const board = document.querySelector(".board");

var h = 60;
var w = 60;
var rows = Math.floor(board.clientHeight / h);
var cols = Math.floor(board.clientWidth / w);

var boxs = [];
var snake = [{ x: 1, y: 1 }];
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
  let head = null;

  boxs[`${food.x}-${food.y}`].classList.add("foody");

  if (direction === "left") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "right") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  if (head.x < 0 || head.y < 0 || head.y >= cols || head.x >= rows) {
    alert("Game Over");
    clearInterval(clear);
  }

  snake.forEach((segment) => {
    boxs[`${segment.x}-${segment.y}`].classList.remove("fill");
  });

  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    boxs[`${segment.x}-${segment.y}`].classList.add("fill");
  });

  //Food Consumption + Snake Growing
  if (head.x == food.x && head.y == food.y) {
    boxs[`${food.x}-${food.y}`].classList.remove("foody");
    food = {
      x: Math.floor(Math.random() * rows),
      y: Math.floor(Math.random() * cols),
    };
    boxs[`${food.x}-${food.y}`].classList.add("foody");
    snake.unshift(head)
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


clear = setInterval(() => {
  render();
}, 300);