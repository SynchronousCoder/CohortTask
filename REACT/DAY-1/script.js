let obj = {
    name: "Aryan",
    age: 19,
    city: "Folorida",
    address: "Aman kulchewale ke pass",
    girlfriend: "Soumya Upreti"
}

let {name, age, ...obj2} = obj;
obj2.city= "bengluru";

console.log(name);
console.log(age);
console.log(obj2);