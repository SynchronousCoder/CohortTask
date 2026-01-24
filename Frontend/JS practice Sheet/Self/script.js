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
//   let input = prompt("Enter your Marks : ");

//   if (input === null || input.trim() === "") {
//     console.error("Input cancelled by user");
//     continue;
//   }

//   marks = Number(input);
//   if (marks > 100 || marks < 0 || isNaN(marks)) {
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
// let high = arr[arr.length - 1];
// console.log(`Lowest Marks is : ${arr[0]}`);
// console.log(`Highest Marks is : ${high}`);

// //Sum of all marks
// let sum = arr.reduce(function (acc, val) {
//   return acc + val;
// }, 0);
// let average = sum / 5;
// console.log(`Average Marks is : ${average}`);

// //Assigning marks on the basis of grade
// for (let i = 0; i < arr.length; i++) {
//   if (arr[i] === undefined || arr[i] === null) {
//     continue;
//   }
//   if (arr[i] < average) {
//     console.log(`The student no ${i+1} has ${arr[i]} marks hence grade : D`);
//   } else {
//     if (arr[i] >= 90) {
//       console.log(`The student no ${i+1} has ${arr[i]} marks hence grade : A`);
//     } else if (arr[i] >= 75) {
//       console.log(`The student no ${i+1} has ${arr[i]} marks hence grade : B`);
//     } else if (arr[i] >= 60) {
//       console.log(`The student no ${i+1} has ${arr[i]} marks hence grade : C`);
//     }
//   }
// }

//Q.3 ATM SIMULATOR USING JS
// let balance = 1000;
// let pin = 1234;
// let enterPin;
// let input;
// let attempt = 0;

// //Login into your account
// while (attempt < 3 && enterPin !== pin) {
//   input = prompt(`Enter Your Pin Below - Attempt ${attempt+1}`);

//   if (input === null || input.trim() === "" || isNaN(input)) {
//     console.error("Pls Write the Pin");
//     continue;
//   }
//   enterPin = Number(input);
//   if (enterPin === pin) {
//     console.log("Succefull, You have accesed your account!!");
//     break;
//   } else {
//     console.error("Incorrect Pin, Try Again!!");
//     attempt++;
//   }

//   if (attempt === 3) {
//     console.error("Sorry You've used all attempts, Your Account is Locked!!");
//   }
// }

// //Choose Action you need to Perform
// if (enterPin === pin) {
//   let action;
//   let num =
//     prompt(`Write Down the Follwong no to perform the following function :
//     1. Withdraw
//     2. Deposit
//     3. Check Balance
//     4. Exit`);

//   if (num === null || num.trim() === "") {
//     console.error("Write the valid No : ");
//   }
//   action = Number(num);

//   // if(action === 4){ console.log("Exited Succesfully, Thanks For Coming");}

//   while (action !== 4) {
//     //WithDraw
//     if (action === 1) {
//       let w = prompt("Enter Your Withdraw Amount: ");
//       if (w === null || w.trim() === "") {
//         console.log("Write Down The Balance : ");
//         continue;
//       }

//       let Withdraw = Number(w);

//       if (Withdraw > balance) {
//         console.log("Insufficient Balance");
//       } else if (Withdraw < balance) {
//         balance -= Withdraw;
//         console.log(`Withdrawal Successful. New Balance is: ${balance}`);
//       }
//     }
//     //Deposit
//     else if (action === 2) {
//       let d = prompt("Enter Your Deposit Amount: ");
//       if (d === null || d.trim() === "") {
//         console.log("Write Down The Balance : ");
//         continue;
//       }

//       let Deposit = Number(d);
//       if (Deposit > 0) {
//         balance += Deposit;
//         console.log(`Deposit Successful. New Balance is: ${balance}`);
//       } else {
//         console.log("Invalid Deposit Amount");
//       }
//     }
//     //Check Balance
//     else if (action === 3) {
//       console.log(`Your Current Balance is: ${balance}`);
//     }

//     let num =
//       prompt(`Write Down the Follwong no to perform the following function :
//     1. Withdraw
//     2. Deposit
//     3. Check Balance
//     4. Exit`);

//     if (num === null || num.trim() === "") {
//       console.error("Write the valid No : ");
//     }
//     action = Number(num);
//   }
// }

//Now q is about task perform karne hai mai 1 2 3 4 likhu and task perform ho in a loop
//1> mai no enter karunga
//2> woh no baar check hoga action konsa hai
//3> action hone ke baad phir no enter karunga

// 🧮 Q3. Statistics Analyzer
// let i =0;
// let arr = [];

// while(i<10){
//   let n = prompt(`Enter the ${i+1} Natural Number`);
//   if(n === null || n.trim() === "" || isNaN(n)){
//     console.error("Pls Enter the Natural No");
//     continue;
//   }

//   let num = Number(n);
//   arr.push(num);
//   i++
// }

// arr.sort(function(a, b){
//   return a - b; //ascending order
// })

// //Sorted Array in Ascending Order:
// console.log(`The Number input by you are : ${arr}`);

// //Highest and Lowest
// console.log(`Highest no : ${arr[arr.length - 1]}`);
// console.log(`Lowest no : ${arr[0]}`);

// //Odd & Even
// arr.forEach(function(val){
//   if(val % 2 === 0){
//     console.log(`This Number Enter by user is "Even" : ${val}`);
//   }else{
//     console.log(`This Number Enter by user is "Odd" : ${val}`);
//   }
// })

// //Counting pos and neg value
// let positive = 0;
// let negative = 0;
// let zero = 0;
// arr.forEach(function(val){
//   if(val > 0){
//     positive++
//   }else if(val ===0){
//     zero++;
//   }else{
//     negative++
//   }
// })
// console.log(`No. Enter by user are positive : ${positive}`);
// console.log(`No. Enter by user are neagtive : ${negative} `);
// console.log(`No. Enter by user are zero : ${zero} `);

// //Sum & Average
// let sum = arr.reduce(function(acc, val){
//   return acc + val;
// },0)
// console.log(`The TOTAL sum of user Arr is : ${sum}`);

// let avg = sum/(arr.length);
// console.log(`The average of No. enter by user is : ${avg.toFixed(2)}`);

//Q3. Quiz App Simulator
// let correct = 0;
// let wrong = 0;
// let test = [
//   {
//     question: `What is let a = "5";
// let b = 2;
// console.log(a + b);
// console.log(a * b);`,

//     options: [" 7 and 10 ",
//               " 52 and 10 ",
//               " 7 and 10 ",
//               " 80 and 10 "],

//     answer: "52 and 10",
//   },
// ];

// let i = 0;

// while (i < test.length) {
//   test.forEach(function (val) {
//     let a = prompt(`${val.question}

// Write y to see options`);

//     if (
//       a === null ||
//       a.trim().toLowerCase() !== "y" ||
//       a.trim() === "" ||
//       isNaN(a)
//     ) {
//       console.error("Please Write y to continue");
//     }

//     if (a.trim().toLocaleLowerCase() === "y") {
//       let options = prompt(`${val.options}`);

//       if (
//         options === null ||
//         options.trim().toLowerCase() !== "y" ||
//         options.trim() === "" ||
//         isNaN(options)
//       ) {
//         console.error("Please Write correct answer [exact same]");
//       }

//       if(options === val.answer){
//         console.log("Your ans is correct");
//         correct++;
//       }else{
//         console.log("Your ans is wrong");
//         wrong++;
//       }
//     }
//   });

//   i++;
// }

// console.log(`Hence Your ScoreCard :
//   Correct Ans : ${correct}
//   Wrong Ans: ${wrong}`);

// Employee Salary Manager
let user = [];
let n = +prompt("Enter No. of User");
let i;
let username, dept, s, salary;
let obj;

for (i = 0; i < n; i++) {

  while (true) {
    username = prompt(`Enter the NAME of ${i + 1} Employee`);

    if (username === null || username.trim() === "") {
      console.error("UserName should only contain letters!");
      continue;
    }
    if (!/^[A-Za-z\s]+$/.test(username)) {
      console.error("UserName should only contain letters!");
      continue;
    }

    break;
  }

  while (true) {
    dept = prompt(`Enter the DEPARTMENT of ${i + 1} Employee`);

    if (dept === null || dept.trim() === "") {
      console.error("UserName should only contain letters!");
      continue;
    }
    if (!/^[A-Za-z\s]+$/.test(dept)) {
      console.error("UserName should only contain letters!");
      continue;
    }

    break;
  }

  while (true) {
    s = prompt(`Enter the SALARY of ${i + 1} Employee`);
    if (s === null || s.trim() === "" || isNaN(s)) {
      console.error("Invalid Salary!! Write Correct One...");
    } else {
      salary = Number(s);
      break;
    }
  }

  obj = {
    Name: `${username}`,
    Department: `${dept}`,
    Salary: salary,
  };

  user.push(obj);
}

console.table(user);
// console.log(user.Name);

let total = 0;
let avg;
let max = -Infinity;
let min = Infinity;

for (i = 0; i < n; i++) {
  total += user[i].Salary;

  avg = (total / n).toFixed(2);

  if (max < user[i].Salary) {
    max = user[i].Salary;
  }

  if (min > user[i].Salary) {
    min = user[i].Salary;
  }
}
console.log(`Total Salary of Company : ${total}`);
console.log(`Average Salary of Company : ${avg}`);

console.log(`The Highest Salary is : ${max}`);
console.log(`The Lowest Salary is : ${min}`);
