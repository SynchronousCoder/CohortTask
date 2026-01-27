let elements = [];
// let selectedElementId = null;

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
//=====================================================================================
// Resize Functionality
function attachResize(div) {
  const handle = document.createElement("div");
  handle.classList.add("resize-handle", "br");
  div.appendChild(handle);

  let isResizing = false;
  let startX, startY, startW, startH;

  handle.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isResizing = true;

    startX = e.clientX;
    startY = e.clientY;
    startW = div.offsetWidth;
    startH = div.offsetHeight;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isResizing) return;

    const canvasRect = canvas.getBoundingClientRect();
    const rectLeft = div.offsetLeft;
    const rectTop = div.offsetTop;

    let newWidth = startW + (e.clientX - startX);
    let newHeight = startH + (e.clientY - startY);

    // 🔒 boundary check
    if (rectLeft + newWidth > canvas.clientWidth) return;
    if (rectTop + newHeight > canvas.clientHeight) return;

    // apply resize
    div.style.width = newWidth + "px";
    div.style.height = newHeight + "px";

    div.style.width = startW + (e.clientX - startX) + "px";
    div.style.height = startH + (e.clientY - startY) + "px";
  });

  document.addEventListener("mouseup", () => {
    isResizing = false;
  });
}

//=====================================================================================
// Rotation Functionality
function attachRotate(div, el) {
  const rotate = document.createElement("div");
  rotate.classList.add("rotate-handle");
  div.appendChild(rotate);

  let isRotating = false;

  rotate.addEventListener("mousedown", (e) => {
    e.stopPropagation();
    isRotating = true;
  });

document.addEventListener("mousemove", (e) => {
  if (!isRotating) return;

  const canvasRect = canvas.getBoundingClientRect();
  const rect = div.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  // 🔒 TEMP rotate to test boundary
  const prevTransform = div.style.transform;
  div.style.transform = `rotate(${angle}deg)`;

  const rotatedRect = div.getBoundingClientRect();

  // ❌ agar rotated box canvas ke bahar ja raha → revert
  if (
    rotatedRect.left < canvasRect.left ||
    rotatedRect.top < canvasRect.top ||
    rotatedRect.right > canvasRect.right ||
    rotatedRect.bottom > canvasRect.bottom
  ) {
    div.style.transform = prevTransform;
    return;
  }

  // ✅ safe rotation
  el.rotation = angle;
});


  document.addEventListener("mouseup", () => {
    isRotating = false;
  });
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
    div.style.overflow = "hidden";
    div.style.wordBreak = "break-word";

    //Enable editing on double click
    div.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      div.setAttribute("contenteditable", "true");
      div.focus();
    });

    //Save text & exit edit mode
    div.addEventListener("blur", () => {
      div.removeAttribute("contenteditable");
      el.text = div.textContent; // save to state
    });
  }
  attachResize(div);
  attachRotate(div, el);
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
// exit text edit when clicking outside
document.addEventListener("click", (e) => {
  document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
    if (!el.contains(e.target)) {
      el.removeAttribute("contenteditable");
    }
  });
});

//=====================================================================================
//Adding Drag Feature

let isDragging = false;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dragEl = null;

canvas.addEventListener("mousedown", (e) => {
  if (!e.target.classList.contains("element")) return;

  dragEl = e.target;
  isDragging = true;

  dragOffsetX = e.offsetX;
  dragOffsetY = e.offsetY;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !dragEl) return;

  const canvasRect = canvas.getBoundingClientRect();
  console.log(canvasRect);

  let x = e.clientX - canvasRect.left - dragOffsetX;
  let y = e.clientY - canvasRect.top - dragOffsetY;

  // boundary lock (important)
  x = Math.max(0, Math.min(x, canvas.clientWidth - dragEl.offsetWidth));
  y = Math.max(0, Math.min(y, canvas.clientHeight - dragEl.offsetHeight));

  dragEl.style.left = x + "px";
  dragEl.style.top = y + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  dragEl = null;
});

//=====================================================================================

// let elements = [];
// // let selectedElementId = null;

// const canvas = document.getElementById("canvas");
// const addRectBtn = document.getElementById("add-rect");
// const addTextBtn = document.getElementById("add-text");
// const layersList = document.getElementById("layers-list");

// const propertiesConfig = {
//   x:        { label: "X", min: 0, max: 800 },
//   y:        { label: "Y", min: 0, max: 600 },
//   width:    { label: "Width", min: 20, max: 500 },
//   height:   { label: "Height", min: 20, max: 500 },
//   rotation: { label: "Rotate", min: 0, max: 360 },
//   opacity:  { label: "Opacity", min: 0, max: 100 },
//   bgColor:  { label: "Background" }
// };

// let idCounter = 0;

// function generateId() {
//   idCounter++;
//   return "el-" + idCounter;
// }

// function createElement(type) {
//   const newElement = {
//     id: generateId(),
//     type: type,
//     x: 50,
//     y: 50,
//     width: type === "rect" ? 120 : 150,
//     height: type === "rect" ? 80 : 40,
//     zIndex: elements.length + 1,
//     rotation: 0,
//     opacity: 1,
//     text: type === "text" ? "Text" : "",
//   };

//   elements.push(newElement);
//   renderElement(newElement);
//   renderLayersPanel();
//   saveToLocalStorage();
// }


// //=====================================================================================
// // Resize Functionality
// function attachResize(div) {
//   const handle = document.createElement("div");
//   handle.classList.add("resize-handle", "br");
//   div.appendChild(handle);

//   let isResizing = false;
//   let startX, startY, startW, startH;

//   handle.addEventListener("mousedown", (e) => {
//     e.stopPropagation();
//     isResizing = true;

//     startX = e.clientX;
//     startY = e.clientY;
//     startW = div.offsetWidth;
//     startH = div.offsetHeight;
//   });

//   document.addEventListener("mousemove", (e) => {
//     if (!isResizing) return;

//     const canvasRect = canvas.getBoundingClientRect();
//     const rectLeft = div.offsetLeft;
//     const rectTop = div.offsetTop;

//     let newWidth = startW + (e.clientX - startX);
//     let newHeight = startH + (e.clientY - startY);

//     // 🔒 boundary check
//     if (rectLeft + newWidth > canvas.clientWidth) return;
//     if (rectTop + newHeight > canvas.clientHeight) return;

//     // apply resize
//     div.style.width = newWidth + "px";
//     div.style.height = newHeight + "px";

//     div.style.width = startW + (e.clientX - startX) + "px";
//     div.style.height = startH + (e.clientY - startY) + "px";
//   });

//   document.addEventListener("mouseup", () => {
//     isResizing = false;
//   });
// }

// //=====================================================================================
// // Rotation Functionality
// function attachRotate(div, el) {
//   const rotate = document.createElement("div");
//   rotate.classList.add("rotate-handle");
//   div.appendChild(rotate);

//   let isRotating = false;

//   rotate.addEventListener("mousedown", (e) => {
//     e.stopPropagation();
//     isRotating = true;
//   });

// document.addEventListener("mousemove", (e) => {
//   if (!isRotating) return;

//   const canvasRect = canvas.getBoundingClientRect();
//   const rect = div.getBoundingClientRect();

//   const centerX = rect.left + rect.width / 2;
//   const centerY = rect.top + rect.height / 2;

//   const dx = e.clientX - centerX;
//   const dy = e.clientY - centerY;

//   const angle = Math.atan2(dy, dx) * (180 / Math.PI);

//   // 🔒 TEMP rotate to test boundary
//   const prevTransform = div.style.transform;
//   div.style.transform = `rotate(${angle}deg)`;

//   const rotatedRect = div.getBoundingClientRect();

//   // agar rotated box canvas ke bahar ja raha → revert
//   if (
//     rotatedRect.left < canvasRect.left ||
//     rotatedRect.top < canvasRect.top ||
//     rotatedRect.right > canvasRect.right ||
//     rotatedRect.bottom > canvasRect.bottom
//   ) {
//     div.style.transform = prevTransform;
//     return;
//   }

//   // ✅ safe rotation
//   el.rotation = angle;
// });


//   document.addEventListener("mouseup", () => {
//     isRotating = false;
//   });
// }

// function renderElement(el) {
//   const div = document.createElement("div");

//   div.classList.add("element");
//   div.setAttribute("draggable", "true");
//   div.dataset.id = el.id;

//   div.style.position = "absolute";
//   div.style.left = el.x + "px";
//   div.style.top = el.y + "px";
//   div.style.width = el.width + "px";
//   div.style.height = el.height + "px";
//   div.style.zIndex = el.zIndex;


//   if (el.type === "rect") {
//     div.style.background = "#4caf50";
//   }

//   if (el.type === "text") {
//     div.textContent = el.text;
//     div.style.color = "#fff";
//     div.style.display = "flex";
//     div.style.alignItems = "center";
//     div.style.justifyContent = "center";
//     div.style.background = "#333";
//     div.style.overflow = "hidden";
//     div.style.wordBreak = "break-word";

//     //Enable editing on double click
//     div.addEventListener("dblclick", (e) => {
//       e.stopPropagation();
//       div.setAttribute("contenteditable", "true");
//       div.focus();
//     });

//     //Save text & exit edit mode
//     div.addEventListener("blur", () => {
//       div.removeAttribute("contenteditable");
//       el.text = div.textContent; // save to state
//     });
//   }
//   attachResize(div);
//   attachRotate(div, el);
//   canvas.appendChild(div);
// }

// addRectBtn.addEventListener("click", () => {
//   createElement("rect");
// });

// addTextBtn.addEventListener("click", () => {
//   createElement("text");
// });

// //=====================================================================================
// // Selection Logic
// let selectedEl = null;

// canvas.addEventListener("click", (event) => {
//   if (!event.target.classList.contains("element")) {
//     if (selectedEl) {
//       const prevEl = document.querySelector(`[data-id="${selectedEl}"]`);
//       if (prevEl) prevEl.classList.remove("selected");
//     }
//     selectedEl = null;
//     propsContainer.innerHTML = "<p>Select an element</p>";
//     renderLayersPanel()
//     return;
//   }

//   // remove old selection
//   if (selectedEl) {
//     const prevEl = document.querySelector(`[data-id="${selectedEl}"]`);
//     if (prevEl) prevEl.classList.remove("selected");
//   }

//   // new selection
//   event.target.classList.add("selected");
//   selectedEl = event.target.dataset.id;

//   renderLayersPanel(); 
  
//   const elData = elements.find(el => el.id === selectedEl);
//   renderPropertiesPanel(elData, event.target);
// });
// function renderLayersPanel() {
//   layersList.innerHTML = "";

//   // top-most element upar dikhane ke liye
//   [...elements].slice().reverse().forEach(el => {
//     const layer = document.createElement("div");
//     layer.className = "layer-item";

//     if (el.id === selectedEl) {
//       layer.classList.add("active");
//     }

//     // layer name
//     const name = document.createElement("span");
//     name.textContent = `${el.type} (${el.id})`;

//     // z-index input
//     const zInput = document.createElement("input");
//     zInput.type = "number";
//     zInput.min = 0;                 // ✅ HTML level guard
//     zInput.value = el.zIndex;

//     zInput.addEventListener("input", (e) => {
//       let value = Number(e.target.value);

//       // ✅ JS level guard
//       if (value < 0) value = 0;

//       el.zIndex = value;
//       e.target.value = value;

//       const domEl = document.querySelector(`[data-id="${el.id}"]`);
//       if (domEl) domEl.style.zIndex = el.zIndex;
//     });

//     // layer click = select element
//     layer.addEventListener("click", () => {
//       document.querySelectorAll(".element.selected").forEach(d =>
//         d.classList.remove("selected")
//       );

//       const domEl = document.querySelector(`[data-id="${el.id}"]`);
//       if (!domEl) return;

//       domEl.classList.add("selected");
//       selectedEl = el.id;

//       const elData = elements.find(e => e.id === selectedEl);
//       if (elData) renderPropertiesPanel(elData, domEl);

//       renderLayersPanel();
//     });

//     layer.append(name, zInput);
//     layersList.appendChild(layer);
//   });
// }


// //=====================================================================================
// // exit text edit when clicking outside
// document.addEventListener("click", (e) => {
//   document.querySelectorAll('[contenteditable="true"]').forEach((el) => {
//     if (!el.contains(e.target)) {
//       el.removeAttribute("contenteditable");
//     }
//   });
// });

// //=====================================================================================
// // Drag Feature (canvas-locked)

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

//   let x = e.clientX - canvasRect.left - dragOffsetX;
//   let y = e.clientY - canvasRect.top - dragOffsetY;

//   x = Math.max(0, Math.min(x, canvas.clientWidth - dragEl.offsetWidth));
//   y = Math.max(0, Math.min(y, canvas.clientHeight - dragEl.offsetHeight));

//   dragEl.style.left = x + "px";
//   dragEl.style.top = y + "px";
// });

// document.addEventListener("mouseup", () => {
//   if (dragEl) {
//     const el = elements.find(e => e.id === dragEl.dataset.id);
//     if (el) syncDomToState(dragEl, el);
//     saveToLocalStorage();
//   }
//   isDragging = false;
//   dragEl = null;
// });



// //🔹 (B) Properties Panel Renderer
// const propsContainer = document.getElementById("props-content");

// function renderPropertiesPanel(el, domEl) {
//   propsContainer.innerHTML = "";

//   Object.keys(propertiesConfig).forEach((key) => {
//     const config = propertiesConfig[key];

//     const row = document.createElement("div");
//     row.className = "property-row";

//     const label = document.createElement("label");
//     label.textContent = config.label;

//     let input;

//     // COLOR
//     if (key === "bgColor") {
//       input = document.createElement("input");
//       input.type = "color";
//       input.value = domEl.style.background || "#4caf50";

//       input.addEventListener("input", () => {
//         domEl.style.background = input.value;
//       });
//     } 
//     // RANGE
//     else {
//       input = document.createElement("input");
//       input.type = "range";
//       input.min = config.min;
//       input.max = config.max;

//       // current values
//       if (key === "x") input.value = domEl.offsetLeft;
//       if (key === "y") input.value = domEl.offsetTop;
//       if (key === "width") input.value = domEl.offsetWidth;
//       if (key === "height") input.value = domEl.offsetHeight;
//       if (key === "rotation") input.value = el.rotation || 0;
//       if (key === "opacity") input.value = (domEl.style.opacity || 1) * 100;

//       input.addEventListener("input", () => {
//         applyProperty(el, domEl, key, input.value);
//       });
//     }

//     row.appendChild(label);
//     row.appendChild(input);
//     propsContainer.appendChild(row);
//   });
// }


// //🔹 (C) Apply Property Changes
// function applyProperty(el, domEl, key, value) {
//   switch (key) {
//     case "x":
//       domEl.style.left = value + "px";
//       break;
//     case "y":
//       domEl.style.top = value + "px";
//       break;
//     case "width":
//       domEl.style.width = value + "px";
//       break;
//     case "height":
//       domEl.style.height = value + "px";
//       break;
//     case "rotation":
//       domEl.style.transform = `rotate(${value}deg)`;
//       el.rotation = value;
//       break;
//     case "opacity":
//       domEl.style.opacity = value / 100;
//       break;
//   }
//   syncDomToState(domEl, el);
//   saveToLocalStorage();
// }


// //export + storing
// function saveToLocalStorage() {
//   localStorage.setItem("canvas-elements", JSON.stringify(elements));
// }

// function loadFromLocalStorage() {
//   const data = localStorage.getItem("canvas-elements");
//   if (!data) return;

//   elements = JSON.parse(data);

//   canvas.innerHTML = ""; // clear canvas
//   elements.forEach(el => {
//     renderElement(el);
//   });

//   renderLayersPanel();
// }
// function syncDomToState(domEl, el) {
//   el.x = domEl.offsetLeft;
//   el.y = domEl.offsetTop;
//   el.width = domEl.offsetWidth;
//   el.height = domEl.offsetHeight;
//   el.opacity = domEl.style.opacity || 1;
//   el.bgColor = domEl.style.background;

//   const match = domEl.style.transform?.match(/rotate\(([-\d.]+)deg\)/);
//   el.rotation = match ? Number(match[1]) : 0;
// }


// document.getElementById("export-json").addEventListener("click", () => {
//   const dataStr = JSON.stringify(elements, null, 2);
//   const blob = new Blob([dataStr], { type: "application/json" });

//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "canvas-data.json";
//   a.click();
// });

// document.getElementById("export-html").addEventListener("click", () => {
//   let html = `
// <!DOCTYPE html>
// <html>
// <head>
// <meta charset="UTF-8" />
// <title>Exported Canvas</title>
// <style>
//   body { margin:0; background:#111; }
//   .element { position:absolute; }
// </style>
// </head>
// <body>
// `;

//   elements.forEach(el => {
//     html += `
// <div class="element"
//   style="
//     left:${el.x}px;
//     top:${el.y}px;
//     width:${el.width}px;
//     height:${el.height}px;
//     background:${el.bgColor || "#333"};
//     transform: rotate(${el.rotation || 0}deg);
//     z-index:${el.zIndex};
//     opacity:${el.opacity || 1};
//     color:#fff;
//     display:flex;
//     align-items:center;
//     justify-content:center;
//   ">
//   ${el.text || ""}
// </div>`;
//   });

//   html += `
// </body>
// </html>`;

//   const blob = new Blob([html], { type: "text/html" });
//   const a = document.createElement("a");
//   a.href = URL.createObjectURL(blob);
//   a.download = "canvas.html";
//   a.click();
// });
// loadFromLocalStorage();

// // ===============================
// // KEYBOARD SHORTCUTS
// // ===============================
// document.addEventListener("keydown", (e) => {
//   if (!selectedEl) return;

//   const domEl = document.querySelector(`[data-id="${selectedEl}"]`);
//   const el = elements.find(item => item.id === selectedEl);
//   if (!domEl || !el) return;

//   const step = e.shiftKey ? 10 : 1;

//   // DELETE ELEMENT
//   if (e.key === "Delete" || e.key === "Backspace") {
//     domEl.remove();
//     elements = elements.filter(item => item.id !== selectedEl);
//     selectedEl = null;
//     renderLayersPanel();
//     propsContainer.innerHTML = "<p>Select an element</p>";
//     saveToLocalStorage();
//   }

//   // MOVE WITH ARROWS
//   if (e.key === "ArrowLeft") {
//     el.x = Math.max(0, el.x - step);
//   }
//   if (e.key === "ArrowRight") {
//     el.x = Math.min(canvas.clientWidth - domEl.offsetWidth, el.x + step);
//   }
//   if (e.key === "ArrowUp") {
//     el.y = Math.max(0, el.y - step);
//   }
//   if (e.key === "ArrowDown") {
//     el.y = Math.min(canvas.clientHeight - domEl.offsetHeight, el.y + step);
//   }

//   domEl.style.left = el.x + "px";
//   domEl.style.top = el.y + "px";

//   // DUPLICATE (CTRL + D)
//   if (e.ctrlKey && e.key.toLowerCase() === "d") {
//     e.preventDefault();

//     const clone = {
//       ...el,
//       id: generateId(),
//       x: el.x + 20,
//       y: el.y + 20,
//       zIndex: elements.length + 1
//     };

//     elements.push(clone);
//     renderElement(clone);
//     renderLayersPanel();
//     saveToLocalStorage();
//   }

//   // DESELECT (ESC)
//   if (e.key === "Escape") {
//     domEl.classList.remove("selected");
//     selectedEl = null;
//     propsContainer.innerHTML = "<p>Select an element</p>";
//     renderLayersPanel();
//   }

//   saveToLocalStorage();
// });