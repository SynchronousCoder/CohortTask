// ===============================
// CENTRAL STATE
// ===============================

let elements = []; // all elements data
let selectedElementId = null;

// ===============================
// DOM REFERENCES
// ===============================

const canvas = document.getElementById("canvas");
const addRectBtn = document.getElementById("add-rect");
const addTextBtn = document.getElementById("add-text");

let idCounter = 0;

function generateId() {
  idCounter++;
  return "el-" + idCounter;
}

function createElement(type) {
  const newElement = {
    id: generateId(),
    type: type,
    x: 50,
    y: 50,
    width: type === "rect" ? 120 : 150,
    height: type === "rect" ? 80 : 40,
    text: type === "text" ? "Text" : "",
  };

  elements.push(newElement);
  renderElement(newElement);
}

function renderElement(el) {
  const div = document.createElement("div");

  div.classList.add("element");
  div.setAttribute("draggable", "true");
  div.dataset.id = el.id;

  div.style.position = "absolute";
  div.style.left = el.x + "px";
  div.style.top = el.y + "px";
  div.style.width = el.width + "px";
  div.style.height = el.height + "px";

  if (el.type === "rect") {
    div.style.background = "#4caf50";
  }

  if (el.type === "text") {
    div.textContent = el.text;
    div.style.color = "#fff";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.background = "#333";
  }
  canvas.appendChild(div);
}

addRectBtn.addEventListener("click", () => {
  createElement("rect");
});

addTextBtn.addEventListener("click", () => {
  createElement("text");
});

//=====================================================================================
// Logic For Selection of Text or Rectangle
let selectedEl = null;

canvas.addEventListener("click", (event) => {
  //Agar mai canvas prr click kar raha hu tab chalna
  if (!event.target.classList.contains("element")) {
    //agar koi element selected hai tab chalna
    if (selectedEl) {
      const prevEl = document.querySelector(`[data-id="${selectedEl}"]`);
      if (prevEl) prevEl.classList.remove("selected");
    }

    selectedEl = null;
    return;
  }

  const clicked = event.target.dataset.id;

  //Agar pehle se koi element selected hai
  if (selectedEl) {
    const prevEl = document.querySelector(`[data-id="${selectedEl}"]`);
    if (prevEl) prevEl.classList.remove("selected");
  }

  //New Element selected
  event.target.classList.add("selected");
  selectedEl = clicked;
  console.log("Selected:", selectedEl);
});

//=====================================================================================
//Adding Drag Feature

// let isDragging = false;
// let dragOffsetX = 0;
// let dragOffsetY = 0;
// let dragEl = null;

// canvas.addEventListener("mousedown", (e) => {
//   if (!e.target.classList.contains("element")) return;

//   dragEl = e.target;
//   isDragging = true;

//   dragOffsetX = e.offsetX;
//   dragOffsetY = e.offsetY;
// });

// document.addEventListener("mousemove", (e) => {
//   if (!isDragging || !dragEl) return;

//   const canvasRect = canvas.getBoundingClientRect();
//   console.log(canvasRect);

//   let x = e.clientX - canvasRect.left - dragOffsetX;
//   let y = e.clientY - canvasRect.top - dragOffsetY;

//   // boundary lock (important)
//   x = Math.max(0, Math.min(x, canvas.clientWidth - dragEl.offsetWidth));
//   y = Math.max(0, Math.min(y, canvas.clientHeight - dragEl.offsetHeight));

//   dragEl.style.left = x + "px";
//   dragEl.style.top = y + "px";
// });

// document.addEventListener("mouseup", () => {
//   isDragging = false;
//   dragEl = null;
// });

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dragEl = null;

canvas.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("element")) {
    console.log("time to drag");
    isDragging = true;

    dragOffsetX = event.offsetX;
    dragOffsetY = event.offsetY;

    document.addEventListener("mousemove", (e) => {
      const canvasRect = canvas.getBoundingClientRect();
      let x = e.clientX - canvasRect.left - dragOffsetX;
      let y = e.clientY - canvasRect.top - dragOffsetY;

      dragEl.style.left = x + "px";
      dragEl.style.top = y + "px";
    });

    document.addEventListener("mouseup", (e) => {
      isDragging = false;
      dragEl = null;
    });
  }
});
