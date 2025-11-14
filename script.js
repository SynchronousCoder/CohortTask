var h1 = document.querySelector('h1')
var btn = document.querySelector('button')
let a = 1;

btn.addEventListener('click', function(){
    h1.textContent = a;
    a++
})

var b= (Math.random()*10).toFixed(0)
var c = Math.random()*10;
var d = Math.floor(c)
console.log(b, "===", d);