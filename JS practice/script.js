// Q.1
// a
// var a =10;
// var b = 3;

// let sum = a+b;
// let dif = a-b;
// let mul = a*b;
// let div = a/b;
// let mod = a%b;

// console.log(sum, dif, mul, div, mod);

// e
var X = 10;
if(X > 10 || X < 20 || X==10){
    console.log("True");
}

// f : false , true , false

// Q.2
// a undefined
// b not intilizie
// c hello ,will print the value
    // test();
    // var test = function(){
    //     console.log("hello");
    // }
// e -> hoisted is the concept in which decerleation of variable moves at top and intilization stay where it want to be ex:var, ex: let no get hoisted fully


// Q.3
// a
// let age = prompt("Enter your age ?");
// if(age > 18) console.log("eligible for voting");
// else console.log("not voiting");

//b
// let marks = prompt("Enter your marks ?");
// if(marks > 90) console.log("A");
// else if(marks >= 75) console.log("B");
// else console.log("fail");

// c
// let city = "Bhopal";
// if(city == "Bhopal") console.log("MP");
// else if(city == "Delhi") console.log("Cap");
// else console.log("Unkown city");

// d
let score = 40;
score > 35 ? console.log("Pass") : console.log("Fail");

// e
let temp = 40;
temp > 30 ? console.log("hot") : console.log("cold");

// g
let age = 19;
let country = "India";
if(age >= 18 && country === "India") console.log("Eligible for Voting");
else console.log("No");


//FIBIONACI
var n = 9;
let a = 0;
let b = 1;
console.log(a);
console.log(b);

for(let i =0; i<n; i++){
    let c = a+b;
    console.log(c);
    a=b;
    b=c;
    // console.log(b,a);  
}

