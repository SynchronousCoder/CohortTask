//Level 1 – Pure Beginner Practice
// Q.9
// let count = 0;
// for(let i =1; i<16; i++){
//     if(i > 8){
//         console.log(`The no greater than 8 is ${i}`);
//         count++;
//     }
// }
// console.log(count);

// Q.10
// let og = "jaimahakal";

// let input = prompt("Enter the password");
// if(input === og){
//     console.log("Correct! The password you entered matches the original password");
// }else{
//     console.log("Incorrect password");
// }

// Level 2 – Slightly Tougher but Logical
// Q.11
// let attempt = 1;
// let og = "jaimahakal";

// while(attempt < 4){
//     let user = prompt("Enter Password");
//     if(user === og){
//         console.log("Correct! The password you entered matches the original password");
//         break
//     }else{
//         attempt++;
//         console.log("Inncorect Password, try again");
//     }

//     if(attempt >= 4){
//         console.log("Account Locked");
//     }

// }

// Q.12
// let s = 0;
// let count = 0;
// while(s < 1){
//     let word = prompt("Enter the WOrd");

//     if(word.toLowerCase() === "stop"){
//         console.log("STOPPED");
//         s++;
//         break;
//     }
//     if(word.toLowerCase() === "yes"){
//         count++;
//     }
//     console.log(word);
// }
// console.log(`The No. of time yes occurs is ${count}`);

//Q.13
// for(let i = 1; i<51; i++){
//     if(i%7 === 0){
//         console.log(`The no divisible by 7 is: ${i}`);
//     }
// }

//Q.14
// let sum = 0;
// for(let i =1; i<31; i++){
//     if(i%2 === 1){
//         sum += i;
//     }
// }
// console.log(`The Final sum of odd no from 1-30: ${sum}`);

//Q.15
let count = 0;
while(count < 1){
    let input = prompt("Enter the no");
    if(input%2 === 0){
        console.log(input);
        count++;
    }
}

//Q.16
// let i = prompt("Enter the starting no");
// let j = prompt("Enter the ending no");

// for(i; i<=j; i++){
//     console.log(i);
// }

//Q.17
// let count = 1;
// for (let i = 1; i <= 20; i++) {
//   if (count < 4) {
//     if (i % 3 === 0) {
//       console.log(`The ${count} divible by 3 is ${i}`);
//       count++;
//     }
//   }
// }

//Q.18
// let i = 1;
// let count = 0;
// while(i < 6){
//     let input = prompt(`Enter the ${i} No`);
//     if(input > 0){
//         count++;
//         console.log(`${input} is positive`);
        
//     }
//     i++;
// }
// console.log(`The no of positive no is ${count}`);

//Q.19
// let i = 1;
// let balance = 1000;
// while(i < 4){
//     let withdraw = prompt(`Amount to withdraw ${i} time`);
    
//     if(balance - withdraw > 0){
//         console.log(`Balance left after ${i} time is ${balance - withdraw}`);
//         balance -= withdraw;
//     }else if(balance - withdraw === 0){
//         console.log("Your account is empty");
//         break;
//     }else{
//         console.log(`Insufficient balance [If you will do it then : ${balance - withdraw}]`);
//         break;
//     }


//     i++;
// }