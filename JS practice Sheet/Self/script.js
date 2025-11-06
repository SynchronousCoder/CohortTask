//Q1. Number Guessing Game (Smart Attempts System)
// let num = 25;
// let attempt = 1;

// while(attempt < 6){
//     let guess = Number(prompt("Guess The correct No : "));

//     let sub = num - guess;
//     if(sub < 0){
//         sub = -sub;
//     }
//     if(sub === 0){
//         console.log(`huraah correct ans in ${attempt} attempt`);
//         break;
//     }else if(sub <= 5){
//         console.log("You're very close!");
//     }else{
//         console.log("Way too Far");
//     }
//     attempt++;
// }

// if(attempt === 6){
//     console.log("Sorry you've used all attempts. The correct number was " + num);
// }

//Q2. Highest & Lowest Marks Finder
// let marks;
// let arr = [];
// let i = 0;

// //Taking marks as input
// while (i < 5) {
//   let marks = Number(prompt("Enter your Marks : "));
//   if(marks > 100 || marks < 0 || isNaN(marks)){
//     console.error("Please enter valid marks between 0 to 100");
//     continue;
//   }
//   arr.push(marks);
//   i++;
// }
// console.log(`The actually array of marks is : ${arr}`);

// //Finding highest and lowest marks
// arr.sort(function (a, b) {
//   return a - b;
// });
// let high = arr[i-1];
// console.log(`Lowest Marks is : ${arr[0]}`);
// console.log(`Highest Marks is : ${high}`);

// //Sum of all marks
// let sum = arr.reduce(function (acc, val) {
//   return acc + val;
// }, 0);
// let average = sum / 5;

// //Assigning marks on the basis of grade
// for (let i = 1; i < 6; i++) {
//   if (arr[i] === undefined || arr[i] === null) {
//     continue;
//   }
//   if (arr[i] < average) {
//     console.log(`The student no ${i} has ${arr[i]} marks hence grade : D`);
//   } else {
//     let range = 0;
//     range += arr[i] - average;
//     if ((range + 15) > (high - average)) {
//       console.log(`The student no ${i} has ${arr[i]} marks hence grade : C`);
//     } else if ((range + 7.5) > (high - average)) {
//       console.log(`The student no ${i} has ${arr[i]} marks hence grade : B`);
//     } else {
//       console.log(`The student no ${i} has ${arr[i]} marks hence grade : A`);
//     }
//   }
// }



