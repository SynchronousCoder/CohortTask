//CALLBACK DEPT LVL CODE

//1) Creating FXN
// function abcd(fn){
//     fn(function(fn2){
//         fn2(function(){
//             console.log("MOJO");
//         });
//     })
// }
// //2) Calling FXN
// abcd(function(fn1){
//     fn1(function(fn3){   
//         fn3();     
//     });
// })


//CALLBACK USEAGE
//raju ko icecream lene bhej hai woh icecream lekar aayega and batayega!!
// function rajuIcecreamLeneGaya(icecream, cb){
//     //Logic of Going + Purchasing icecream
//     cb("done")

// }
// rajuIcecreamLeneGaya("Mango Naturals", function(details){
//     console.log(details);
// })



//how callback actually work is :
// function rajuKamKar(kaam, cb){
//     console.log(kaam);
//     //Logic of doing kaam
//     cb("Malik Hogaya");
// }
// rajuKamKar("bartan dho", function(details){
//     console.log(details);
// })