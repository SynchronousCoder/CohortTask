// class Car{
//     constructor(b, s){
//         this.brand = b;
//         this.speed = s;
//     }
//     drive(){
//         console.log(`The ${this.brand} is driving at a speed of ${this.speed} km/h.`);      
//     }
// }
// let car1 = new Car("Lamborghini", 200);
// let car2 = new Car("Porshe911", 300);

//call apply bind
function abcd(){
    console.log(this.name);
}
let obj = {
    name: "Aryan"
}
abcd.call(obj);
