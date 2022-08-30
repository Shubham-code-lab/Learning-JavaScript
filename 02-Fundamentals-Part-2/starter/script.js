

const arr = [1,2,3];
//pass by reffrence non prmitive type 
const fun1 = function(arra){
    // arra= [7,8,5];  //arra point to new array but arr still point to old object
    arra[2]+=1;
}
console.log(arr);
fun1(arr);
console.log(arr);


const fun2 = function(fun){
    // passing function to another function
    fun(arr)
}
console.log(arr);
fun2(fun1);
console.log(arr);


{
    function fun3(){                 //on global window object
        console.log("HII");
    }
}
fun3();


let temp1 = 56;
var temp2 = 78;    //global window object


//this keyword 
const fun4 = function(){
    console.log("this keyword",this);   
}

function fun5(){
    console.log("this keyword",this);   
}

fun4();
fun5();


const obj ={
    fName: "Shubham",
    arrowObj: ()=>{console.log("this = global window",this)},
    methodObj: function(){
        
        const fun8 =function(){   //global window
            console.log("function insinde method of an object without strict mode", this);
        }
        fun8();
        console.log("this = calling obj",this)}
};

obj.arrowObj();
const fun6 = obj.methodObj;        //don't call function is just value assigning it to other function
fun6();            //strict mode == undefine otherwise global window



//map ans object

const map= new Map(
    [
        [1,"one"],
        [2,"two"]   
    ]
);

const obj1 ={
    1:"one",
    2:"two"
};

console.log([...map]);
console.log([...map.entries()]);
console.log(Object.entries(obj1));


//===================================================================================================================
//this keyword

console.log(''.padStart(100,'*'));
const button = document.querySelector('.h1-class');

function foo() { console.log('button clicked', this) }

button.addEventListener('click', foo);

/****/

const obj3 = {
  name: "shubham",
  method: function (cb) {
  	console.log('method', this);
    // cb.bind(this);
    // cb(this.method.bind(obj3));        //recursion
  }
};

// obj3.method(function() { console.log('cb', this) }); 
obj3.method(obj3.method.bind(obj3));   
function temp3(){
    console.log('temp',this);
}

temp3.bind(obj3);
temp3();
