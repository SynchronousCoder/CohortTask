var arr = [
  "Be yourself; everyone else is already taken",
  "In the middle of every difficulty lies opportunity",
  "Do not go where the path may lead, go instead where there is no path and leave a trail",
  "The only thing we have to fear is fear itself",
  "Injustice anywhere is a threat to justice everywhere",
  "I am the BEST",
];
const fonts = ["cursive", "monospace", "serif", "sans-serif"];
var count = 0;
var main = document.querySelector("#main");
var btn = document.querySelector("button");

btn.addEventListener("click", function () {
  count++;

  console.log(arr.length);

  var num = Math.floor(Math.random() * arr.length);
  var c1 = Math.random() * 257;
  var c2 = Math.random() * 257;
  var c3 = Math.random() * 257;

  var r = Math.random() * 360;
  var x = Math.random() * 100;
  var y = Math.random() * 100;

  let h1 = document.createElement("h1");
  h1.innerHTML = `${arr[num]}`;
  h1.style.top = y + "%";
  h1.style.left = x + "%";
  h1.style.rotate = r + "deg";
  h1.style.background = `linear-gradient(${r}deg, rgb(${c1},${c2},${c3}), rgb(${c2},${c3},${c1}))`;
  h1.style.webkitBackgroundClip = "text";
  h1.style.color = "transparent";
  h1.style.mixBlendMode = "difference";

  h1.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
  h1.style.fontSize = 20 + Math.random() * 40 + "px";
  main.appendChild(h1);

  console.log("hello", h1);

  //Animating entrance
  if (count % 2 === 0) {
    gsap.from(h1, {
      duration: 1,
      y: 1000,
      ease: "power2.out",
    });
  } else if (count % 3 === 0) {
    gsap.from(h1, {
      duration: 1,
      x: 1000,
      ease: "power4.out",
    });
  } else if (count % 7 === 0) {
    gsap.from(h1, {
      duration: 1,
      x: -1000,
      ease: "power4.out",
    });
  } else {
    gsap.from(h1, {
      duration: 1,
      y: -1000,
      ease: "power4.out",
    });
  }

  //After Coming
});
