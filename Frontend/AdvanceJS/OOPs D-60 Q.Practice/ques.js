//## Exercise 1 — Very Easy (Warming up)

// **Task (Hindi):** Ek function banao `afterDelay`

// **Requirements:**
// - Ye function do cheezein lega:
//   1. `time` (milliseconds)
//   2. `callback` function
// - Given `time` ke baad `callback` call kare
// - Callback ke andar `"Callback executed"` print hona chahiye

// **Use case:**
// > “2 second baad ek kaam karna hai”

// **Goal:**
// - Samajhna ki callback delay ke baad kaise execute hota hai
// - Ye `setTimeout` + callback connection hai

//ans:
// function afterDelay(time, cb){
//     setTimeout(function(){
//         cb("RUN HO RAHA HU", time);
//     }, time)
// }
// afterDelay(2000, function(details, t){
//     console.log(details, "-", `${t/1000}s time baad`);
// });

// ---

// ## Exercise 2 — Intermediate (Data flow)

// **Task (Hindi):** Ek function banao `getUser`

// **Requirements:**
// - `getUser` `username` lega
// - 1 second ke baad `callback` ko ek object de:
//   - `id`
//   - `username`

// **Then:**
// - Callback ke andar ek aur function call karo `getUserPosts`

// **`getUserPosts` requirements:**
// - `userId` lega
// - 1 second ke baad `callback` ko `posts` ka array de

// **Final output:**
// - User ka `username` print ho
// - Fir uske `posts` print ho

// **Goal:**
// - Samajhna ki ek async ka result next async ko kaise milta hai
// - Callback chaining practice

//ans:
// function getUserPosts(userId, cb){
//     setTimeout(() => {
//         // console.log(userId);
//         cb([1,2,3]); 
//     }, 1000);
// }
// function getUser(username, cb){
//     setTimeout(() => {
//         cb({id: "001",
//             username: username
//         })
//     }, 1000);
// }
// getUser("Aryan Tyagi", function(details){
//     console.log(details.username);

//     getUserPosts(details.id, function(post){
//         console.log(post);
//     })
// })

// ---

// ## Exercise 3 — Intermediate (Callback dependency — thoda painful)

// **Task (Hindi):** Teen functions banao:

// 1. `loginUser`
//    - 1 second baad callback ko `user` object de
// 2. `fetchPermissions`
//    - `userId` lega
//    - 1 second baad callback ko `permissions` array de
// 3. `loadDashboard`
//     - `permissions` lega
//     - 1 second baad callback ko `"Dashboard loaded"` bole

//     **Flow:**
//     - Pehle `loginUser`
//     - Uske andar `fetchPermissions`
//     - Uske andar `loadDashboard`
//     - Final output console mein print ho

//     **Goal:**
//     - Callback nesting ko feel karna
//     - Yehi structure baad mein callback hell banta hai

//ans:
function loginUser(cb){
    console.log("Login into Account...");
    setTimeout(() => {
        user= {
            name: "Aren",
            id: 12
        }
        cb(user);
    }, 1000);
}
function fetchPermissions(userID, cb){
    console.log("Fetching permissions...");
    setTimeout(() => {
        permission = ["Captcha", "Password", "2FA"]
        cb(permission)
    }, 1000);
}
function loadDashboard(permission, cb){
    console.log("Permission Given!!, Loading Ur Dashboard...");
    setTimeout(() => {
        console.log("✅ Dashboard loaded");
    }, 1000);
}

loginUser(function(details){
    console.log(`${details.name} - ${details.id} Account Logined`);
    fetchPermissions(details.id, function(permission){
        console.log(permission);
        loadDashboard(permission, function(){
        })
    })
})
//     ---