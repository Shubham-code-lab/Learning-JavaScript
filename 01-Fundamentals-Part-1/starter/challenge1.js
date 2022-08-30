let mark_bmi, john_bmi,height, weight;

height= prompt('Enter the mark height');
weight = prompt('Enter the mark weight');
mark_bmi = weight / (height*height)

height= prompt('Enter the john height');
weight = prompt('Enter the john weight');
john_bmi = weight / (height*height)

let markHeiherBmi
if (mark_bmi > john_bmi){
    markHeiherBmi = true
}
else {
    markHeiherBmi = false
}
console.log(markHeiherBmi)