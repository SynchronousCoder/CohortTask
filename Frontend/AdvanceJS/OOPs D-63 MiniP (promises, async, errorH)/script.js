// // https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}
// // let apikey = 'b92657938eabc6ded1fcf3a2f5b4bc3';

// // async function getWeather(city) {
// //   let raw = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`)
// //   let realdata = raw.json();
// //   console.log(realdata);  
// // }
// // getWeather("London");


// // ## Scenario 2 — Bulk Email Sending Simulation with Parallel Promises and Error Handling

// // Simulate sending bulk emails to 5 users. Treat each email-sending operation as a `Promise` (simulate delays with `setTimeout`).

// // ### Requirements

// // - Send all emails in parallel using `Promise.all`.
// // - If any email fails (e.g., due to a simulated random failure), catch the error and clearly indicate which 
// // specific email failed.
// // - Use a `finally` block to display a message indicating that the "Email process is complete." 
// // (regardless of success/failure).

// // ### Suggested tasks

// // - Create an array of 5 mock email tasks that resolve or reject based on a random condition.
// // - Call `Promise.all` and handle success and failure cases. Show a breakdown of which emails succeeded and 
// // which failed.
// // - Ensure the `finally` block runs to update the UI or console indicating completion.

// // ---

// // Optional: combine both scenarios into a small dashboard that fetches weather and then attempts to send a report-email, demonstrating error handling across both network and simulated async operations.
// user = ["h@h.com", "gopibau@gmail.com", "soumya@som.com", "abc@def.gh", "bt@yahoo.com"];
// function sendEmail(email){
//     return new Promise(function(resolve, reject){
//         let time = Math.floor(Math.random()*5);

//         setTimeout(() => {
//             let probability = Math.floor(Math.random() * 10);
//             if(probability <= 5) resolve("Email Sent Successfully");
//             else reject("Email not sent");
//         }, time*1000);
//     })
// }

// // sendEmail(user)
// // .then(function(data){
// //     console.log(data);
// // })
// // .catch(function(err){
// //     console.log(err);
// // })
// async function sendEmails(userlist){
//     let allresposes = userlist.map(function(email){
//         return sendEmail(email)
//         .then(function(data){
//             return data;
//         })
//         .catch(function(err){
//             return err;
//         });
//     });
//     let ans = await Promise.all(allresposes);

//     // console.log(ans);
//     ans.forEach((status, idx) => console.log(`${idx+1} - ${status}`));
// }
// sendEmails(user);


// //=====================================================================================
// function throughtle(fn, delay){
//     let last = 0;
//     return function () {
//         let now = Date.now();
//         if(now - last >= delay){
//         last = now;
//         fn();
//     }
// }
// }
// window.addEventListener('mousemove', throughtle(function(e){
//     console.log("e")
// }, 2000)
// )


