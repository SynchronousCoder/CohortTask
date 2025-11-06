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
// var X = 10;
// if(X > 10 || X < 20 || X==10){
//     console.log("True");
// }

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
// let score = 40;
// score > 35 ? console.log("Pass") : console.log("Fail");

// e
// let temp = 40;
// temp > 30 ? console.log("hot") : console.log("cold");

// g
// let age = 19;
// let country = "India";
// if(age >= 18 && country === "India") console.log("Eligible for Voting");
// else console.log("No");





//FIBIONACI
// var n = 9;
// let a = 0;
// let b = 1;
// console.log(a);
// console.log(b);

// for(let i =0; i<n; i++){
//     let c = a+b;
//     console.log(c);
//     a=b;
//     b=c;
// console.log(b,a);
// }

// PRACTICE OF LOOPS - JAVASCRIPT FULL COURSE 8hr
// Q.2
// let i = 10;
// while(i > 0){
//     console.log(i);
//     i--;
// }
// Q.3
// for(let i =1; i < 21; i++){
//     if(i%2 === 0){
//         console.log(i);
//     }
// }
// Q.4
// for(let i =1; i < 16; i++){
//     if(i%2 === 1){
//         console.log(i);
//     }
// }
// Q.5
// for(let i =1; i<11; i++){
//     console.log(`5 X ${i} = ${5*i}`);
// }
// Q.6
// let sum = 0;
// for(let i =1; i<101; i++){
//     sum += i;
//     console.log(`sum till ${i} = ${sum}`)
// }
// console.log(sum);
// Q.7
// for(let i =1; i<51; i++){
//     if(i%3 === 0){
//         console.log(`The no. ${i} is divisble by 3`);

//     }
// }
// Q.8
// let n = prompt("Give me NO");
// for (let i = 1; i <= n; i++) {
//   if (n <= 0) {
//     console.log("Put the valid natural No");
//   } else if (i % 2 === 0) {
//     console.log(`The no from 1 to ${n} which is ${i}: Even`);
//   } else {
//     console.log(`The no from 1 to ${n} which is ${i}: Odd`);
//   }
// }

//Q.9
// let n =0;
// for(let i =1; i<101; i++){
//     if(i%3 === 0){
//         console.log(`The No. ${i} is divisble by 3`);
//     }
//     if(i%5 === 0){
//         console.log(`The No. ${i} is divisble by 5`);
//     }
//     if(i%(5*3) === 0){
//         console.log(`The No. ${i} is divisble by 3 & 5 both`);
//         n++;
//     }
// }
// console.log(`The No. is divisble by 3 & 5 both are ${n}`);

//Q.10 only No. not divisble by 3
// for(let i =0; i<21; i++){
//     if(i % 3 === 0){
//         continue;
//     }else{
//         console.log(i);
//     }
// }

// Q.11
// let n = 1;
// for (let i = 1; i < 101; i++) {
//   if (i % 5 === 0) {
//     if (n < 6) {
//       console.log(`The ${n} no. divisible by 5 is ${i}`);
//       n++;
//     }
//   }
// }

//Functions

// function dance(val){
//     console.log(`${val} is Dancing`);
// }

// dance("Aryan");
// dance("Rohan");
// dance("Sohan");

// //Use of rest operator (...)
// function name(...val){
//     console.log(val);
// }
// name("Aryan", "Rohan", "Sohan", "Mohan");

//HOF
// function greet(){
//     return function(){
//         console.log("Hello World");
//     }
// }
// greet()();

// let multiply = (a ,b) =>{
//     return a*b;
// }

// use rest parameter to accept any no. of score and return total
// let sum =0;
// function getScore(...scores){
//     for(let i =0; i<scores.length; i++){
//         sum += scores[i];
//     }
//     console.log(sum);

// }
// getScore(10,20,30,40);

// function abcd(val){
//     return val();
// }
// abcd(function(){
//     console.log("Hi");

// });

// function outer(){
//     let count = 0;
//     return function(){
//         count++;
//         console.log(count);
//     }
// }

// let counter = outer();
// counter();
// counter();

// function init(){
//     console.log("Hi");
// }
// (function(){
//     console.log("Hi");

// })();

//Function Practice Questions

// Q.1 BMI Calculator
// function bmi(weight, height){
//     let bmiValue = (weight)/(height*height);
//     return bmiValue;
// }
// console.log(bmi(68, 1.69).toFixed(2));

// Q.2 Discount Calculator
// MY APPROACH
// function discount(price, discount){
//     return function(){
//         let save = price*(discount/100);
//         let value = price - save;
//         return value
//     }
// }

// console.log(discount(560, 12)());

// SIR APPROACH
// function discount(discount){
//     return function(price){
//         return price - (price*(discount/100));
//     }
// }

// let ten = discount(10);
// console.log(ten(1000)); //900

// Q.3
// function counter(count){
//     count = 0;
//     return function(){
//         return ++count;
//     }
// }
// let c = counter();
// console.log(c());
// console.log(c());
// console.log(c());

// Q.4
// function double(n){
//     return n*2;
// }
// console.log(double(5));

// Q.5
// (function factorial(n) {
//   let fact = 1;

//   if (n === 0 || n === 1) {
//     console.log(1);
//   } else if (n > 1) {
//     for(let i = 1; i<=n; i++){
//         fact *= i;        
//     }
//     console.log(`Factorial of ${n} is ${fact}`);
//   }
// })(5);





//ARRAY - 8hr
let fruits = ["Apple", "Banana", "Orange"];
console.log(fruits[1]);

fruits.push("Mango"); //adds at last
fruits.unshift("Pineapple"); //adds at first


let names = ["Aryan", "Rohan", "Sohan", "Mohan"];
let nam = names.sort().reverse();
console.log(nam);

// let n = [10, 5, 20, 15, 30];
// let newn = n.map(function(val){
//     return val*val;
// })
// console.log(newn);


// let n = [5, 12, 8, 20, 3];
// let newn = n.filter(function(val){
//     return val > 10;
// })
// console.log(newn);


// let num = [10,20,30];
// let newNum = num.reduce(function(acc, val){
//     return acc + val;
// },0)
// console.log(`Sum of array num is : ${newNum}`);


// let arr = [12, 15, 3, 8, 20];
// let ans = arr.find(function(val){
//     return val < 10;
// })

// Objects in JS - 8hr
let obj = {
  "first-name": "John",
}
let {"first-name": firstName} = obj;

let course = {
  title: "JavaScript",
  lessons: 50,
}
Object.entries(course).forEach(function(val){
  console.log(val[0] +": "+ val[1]);
  
})

let obj1 = {info : {score: 100}}
let obj2 = JSON.parse(JSON.stringify(obj1));
obj2.info.score = 90;
console.log(obj1.info.score);
console.log(obj2.info.score);

const key = "role";
let obj3 = {
  [key]: "admin"
}
console.log(obj3);