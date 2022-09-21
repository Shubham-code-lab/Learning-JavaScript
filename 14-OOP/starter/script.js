'use strict';


//use constructor function to built object  we use new operator to acll them
//arrow function can't be use becoz it don't have this keyword

const Person = function(name, birthYear){
    this.name = name;
    this.birthYear = birthYear;
    
    // this.calYear = function(){                 //not usefull as it create mutiple copies
    //     console.log(2037 - this.birthYear);
    // }
    
    console.log(this);    //Person {}   //object of type Person
}

//new empty object {} is created 
//function is called and this keyword is set to this new create object
//newly created object{} is linked to prototype
//function return that object 

//prototype
Person.prototype.calYear = function(){         //only one copy of function is created and all object get access to this method from pro
    console.log(2037 - this.birthYear);        //this keyword is set to who ever is calling the object
    this.whe = "hlo";
}


const Student = function(name, birthYear, course ){
    Person.call(this, name, birthYear);
    this.course = course;
}

// Student.prototype = Object.create(Person.prototype);

Student.prototype = Person.prototype;

Student.prototype.calYear = function(){
    console.log("Peraon CF calYear() override by Student CF calYear");
}

Student.prototype.information = function(){
    console.log(`my name is ${this.name} and attending course ${this.course}`);
}


const shubhamObj1 = new Person("shubham", 56);
// shubhamObj1.calYear();
const JeevanObj1 = new Person("Jeevan", 36);
console.log(shubhamObj1 instanceof Person);


console.log("contructor function", Person);
console.log("contructor function protoype", Person.prototype);
// console.log();
// console.log();
// console.log(shubhamObj1);
shubhamObj1.calYear();

const saurabh = new Student("saurabh", 34, "python");
console.log(saurabh.__proto__ === Student.prototype);
console.log(saurabh.__proto__.__proto__ === Person.prototype);
console.log(saurabh.__proto__.__proto__.__proto__ === Object.prototype);
console.log(Student.__proto__ === Person.prototype);
console.log(Student.prototype === Person.prototype);1
saurabh.information();
saurabh.calYear();


const temp3= {
    ha:"huhu"
}

let h1 =  true;

const fun = function(){
    console.log("df");
    h1="fdf";
}

shubhamObj1.__proto__ = temp3;



// -The prototype is itself an object, so the prototype will 
// have its own prototype, making what iss called a prototype chain.

// -The chain ends when we reach a prototype that has null for 
// its own prototype.

// -Prototypes are the mechanism by which JavaScript objects inherit
// features from one another

//prototype property is diffrent for  diffrent object
const temp5 = ()=>{};
console.log(Person.prototype.constructor);
Person.prototype.checkVal = true;
const obj1 = new Person("hii", 78);
const obj2 = new Person("hlo", 85);
console.log(obj1.checkVal)
console.log(obj2.checkVal)
obj1.checkVal = false;
console.log(obj1.checkVal)
console.log(obj2.checkVal)


///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/


const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("mercedes", 95);

Car.prototype.accelerate = function(){
    this.speed += 10;
    console.log(`${this.make} speed is ${this.speed} km/hr`);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(`${this.make} speed is ${this.speed} km/hr`);
}


bmw.accelerate();
bmw.brake();
bmw.accelerate();

mercedes.accelerate();
mercedes.brake();
mercedes.accelerate();

const EV = function(make, speed, charge){
    Car.call(this, make, speed);
    this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
    console.log(`Battery charge to ${this.charge}`);
}

EV.prototype.accelerate = function(){     //override Car acclerate methdod
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EV("Tesla", 120, 23);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();
tesla.accelerate();




//===================================================================================================================================
console.log('*'.padEnd(100,'*'));
//ES6 classes 

//class expression
// const ClassName = class {};

//class declaration
class ClassName {
    constructor(name, birthYear){
        this.name = name;                   //this.name is set name()
        this.birthYear = birthYear;
        this.copyFunction = function(){          // not on prototype
            console.log("hii");
        }
    }

    //below three method are called instance method
    calAge(){                               //om prototype
        console.log(2022 - this.birthYear);
    }

    //this._name is property while this.name is setter for _name

    set name(name){
        this._name = name;    // recursion :- this.name = name
    }

    get name(){
        return this._name;
    }

    //
    static staticFunction(){
        console.log(this);
        console.log("only access using ClassName.staticFunction()");
    }
}
//we can also create method explicitly on ClassName.prototype
ClassName.prototype.newMethod = function(){
    console.log("base class newMethod");
}

class DeriveClass extends ClassName{
    constructor(name, birthYear, course){
        super(name, birthYear)     //base class cosntructor if all parameter have to pass to base class contructor no need to write derived class constructor
        this.course = course
    }
    calAge(){        //overridde method 
        console.log("override calAge() of base class");
        console.log(2023 - this.birthYear);
    }
    information(){  //specilization
        console.log("new method of derived class");
    }
}

const shubham = new ClassName("Shubham", 1999);
console.log(shubham);
shubham.newMethod();
shubham.calAge();
shubham.copyFunction();
ClassName.staticFunction();    
console.log(shubham.__proto__ === ClassName.prototype);

const jeevan = new DeriveClass("Jeevan", 1998, "java");
console.log(jeevan.name); //base class method
jeevan.newMethod();       //base class method
jeevan.information();     //deroved class method
jeevan.calAge();          //derived class method overeride base class methos
console.log(jeevan.__proto__ === DeriveClass.prototype);
console.log(jeevan.__proto__.__proto__ === ClassName.prototype);


//1. classes are not hoisted
//2. classes are aslo first class citizen classes are just value as they can first to function or return from function 
    //because behind the sence class are implemented using cnstructor function
//3. classes are executed strict mode


//====================================================================================================================================
console.log('*'.padEnd(100,'*'));
//getters and setters
const account = {
    owner : 'shubham',
    movements: [67,98,34],
    get latest(){
        return  this.movements.slice(-1).pop();
    },
    set latest(value){   //require one parameter
        this.movements.push(value);
    }
}


console.log(account.latest);
account.latest = 90;
console.log(account.latest);


///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Car2{
    constructor(make , speed){
        this.make = make
        this.speed = speed
    }
    accelerate(increaseSpeed){
        this.speed += increaseSpeed;
        console.log(`${this.make} speed increased to ${this.speed}`);
    }
    brake(reduceSpeed){
        this.speed -= reduceSpeed;
        console.log(`${this.make} speed is decreased to ${this.speed}`)
    }
    set speedUS(speed){
        this.speed = speed *1.6;
    }
    get speedUS(){
        return this.speed/1.6;
    }
}

const ford = new Car2('Ford', 120);
ford.accelerate(10);
console.log(ford.speedUS);
ford.brake(5);


//===============================================================================================================================
//Object.create()
console.log('*'.padEnd(100,'*'));

const objProto = {  
    calAge(){
        console.log(2022 - this.birthYear);
    },
    init(name, birthYear){
        this.nameVal = name;
        this.birthYear = birthYear;
    },
    get nameVal(){
        return this.name;
    },
    set nameVal(name){
        this.name = name;
    },
}

const baseObj = Object.create(objProto); //mnualy setting prototype property
baseObj.baseMethod = function(){
    console.log("i am base specialization method");
}
baseObj.init("Shubham", 67);
baseObj.calAge();
baseObj.baseMethod();

const deriveObj = Object.create(baseObj);                 //object is created {} and prototype set to baseObj
deriveObj.init = function(name, birthYear, course){       //method on object
    // console.log(this);
    objProto.init.call(this, name, birthYear);            //as method is on object this point to object where this method exist 
    // baseObj.init.call(this, name, birthYear);          //base class init
    this.course = course;
}
deriveObj.calAge = function(){   //override calAge 
    console.log("Overriding calAge method  " + (2023 - this.birthYear));
}
deriveObj.information= function(){  //specilize method of derive 
    console.log(`dericved object information method ${this.course}`);
}
deriveObj.init("Jeevan", 1998, "Python");
deriveObj.information();
deriveObj.calAge();
deriveObj.baseMethod();
deriveObj.nameVal = "Saurabh";
console.log(deriveObj.nameVal);