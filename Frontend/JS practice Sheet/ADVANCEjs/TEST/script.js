// Coding Q1 (Callbacks → 20 marks)
// Create functions:
// getUser(cb) → after 1s → { id: 1, name: "Arii" }
// getPosts(userId, cb) → after 1s → ["Post1", "Post2"]
// showPosts(posts) → logs posts
// 👉 Use nested callbacks.

//ANS:
// function getUser(cb) {
//   let user = {
//     name: "Ariii",
//     id: 1,
//   };
//   setTimeout(() => {
//     cb(user);
//   }, 1000);
// }
// function getPosts(userId, cb) {
//   let post = ["Hola", "Amigo"];
//   setTimeout(() => {
//     cb(post);
//   }, 1000);
// }
// function showPosts(posts) {
//   console.log(posts);
// }

// console.log("Loggign into Account...");

// getUser(function (user) {
//   console.log("Fetching out ID...");
//   getPosts(user.id, function (post) {
//     console.log(`USER ID : ${user.id}`);

//     console.log("Loading Posts...");
//     showPosts(`USER POSTS : ${post}`);
//   });
// });

// Coding Q2 (Promises → 20 marks)

// Rewrite this using Promises:

// getUser()
//   .then(user => getPosts(user.id))
//   .then(posts => showPosts(posts))
//   .catch(err => console.log(err));

// 👉 You must create your own promises.

//ANS:
// function getUser() {
//   return new Promise((resolve, reject) => {
//     let user = {
//       name: "Ariii",
//       id: 1,
//     };
//     setTimeout(() => {
//       resolve(user);
//     }, 1000);
//   });
// }
// function getPosts() {
//   return new Promise((res, rej) => {
//     let post = ["Hola", "Amigo"];
//     setTimeout(() => {
//       res(post);
//     }, 1000);
//   });
// }
// getUser()
//   .then((user) => {
//     console.log("Loading Profile...")
//     console.log(user);
//     return getPosts(user);
//   })
//   .then((post) => {
//     console.log("Loading Posts...");
//     console.log(`User Posts ${post}`);
//   })
//   .catch((err) => {
//     console.log(error);
//   })


// Coding Q3 (Async/Await → 20 marks)

// Same flow using:

// async function
// await
// try/catch

//ans:
function getUser() {
  return new Promise((resolve, reject) => {
    let user = {
      name: "Ariii",
      id: 1,
    };
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
}
function getPosts() {
  return new Promise((res, rej) => {
    let post = ["Hola", "Amigo"];
    setTimeout(() => {
      res(post);
    }, 1000);
  });
}

async function run() {
  try {
    console.log("Loading Profile...")
    const data = await getUser();
    console.log(data);

    console.log("Loading Posts...");
    const posts = await getPosts(data.id);
    console.log(posts);
    
  } catch (error) {
    console.log(error);
    
  }
}
run();