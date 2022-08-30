'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const createUserName = function (accountArray) {
  accountArray.forEach(function (account) {
    account.userName = account.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserName(accounts);

const displayMovement = function (account, sort = false) {
  containerMovements.innerHTML = '';
  const movements = sort
    ? account.movements.sort((currentTran, nextTran) => currentTran - nextTran)
    : account.movements;
  movements.forEach(function (transaction, number) {
    const tranType = transaction < 0 ? 'withdrawal' : 'deposit';
    const html = `<div class="movements__row">
<div class="movements__type movements__type--${tranType}">${
      number + 1
    } ${tranType}</div>
<div class="movements__value">${transaction}€</div>
</div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (account) {
  const balance = account.movements.reduce(
    (acc, currentTran) => acc + currentTran,
    0
  );
  labelBalance.textContent = `${balance}€`;
  return balance;
};

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(currentTransaction => currentTransaction > 0)
    .reduce((acc, currentTransaction) => acc + currentTransaction, 0);
  labelSumIn.textContent = `${income}€`;
  const out = account.movements
    .filter(currentTransaction => currentTransaction < 0)
    .reduce((acc, currentTransaction) => acc + currentTransaction, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  const interest = account.movements
    .filter(currentTransaction => currentTransaction > 0)
    .map(
      currentTransaction => (currentTransaction * account.interestRate) / 100
    )
    .filter(currentTransaction => currentTransaction >= 1)
    .reduce((acc, currentTransaction) => acc + currentTransaction);
  labelSumInterest.textContent = `${interest}€`;
};

let currentAccount = '';
const updateUI = function (currentAccount) {
  displayMovement(currentAccount);
  calcDisplayBalance(currentAccount);
  calcDisplaySummary(currentAccount);
};

btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); //form tag submit the page which led to page refresh and hence page reload again so all variable value get lost to prevent this use this
  currentAccount = accounts.find(
    currentAcc => currentAcc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    containerApp.style.opacity = 1;
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur(); //to lose focus(remove blinking cursor on text box)
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  let amount = Number(inputTransferAmount.value);
  let reciverUserName = inputTransferTo.value;
  let reciverAccount = accounts.find(
    account => account.userName === reciverUserName
  );
  if (
    amount > 0 &&
    calcDisplayBalance(currentAccount) >= amount &&
    reciverAccount &&
    reciverAccount !== currentAccount
  ) {
    currentAccount.movements.push(-amount);
    reciverAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      account =>
        account.userName === currentAccount.userName &&
        account.pin === currentAccount.pin
    );
    accounts.splice(index, index + 1);
    containerApp.style.opacity = 0;
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some(transaction => transaction >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

let sort = false;

btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovement(currentAccount, !sort);
  sort = !sort;
});

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const checkDogs = function (data1, data2) {
  return [data1.slice(1, 3), data2.slice(1, 3)];
};

const dogClassification = function (dogsData) {
  dogsData.forEach(function (dogAge, dogNumber) {
    dogAge < 3
      ? console.log(`Dog number ${dogNumber + 1} is still a puppy 🐶`)
      : console.log(
          `Dog number ${dogNumber + 1} is an adult, and is ${dogAge} years old`
        );
  });
};

const juliaData = [3, 5, 2, 12, 7];
const kateData = [4, 1, 15, 8, 3];

const [correctedJuliaData, correctedKateData] = checkDogs(juliaData, kateData);
dogClassification(correctedJuliaData);
dogClassification(correctedKateData);

console.log(juliaData, correctedJuliaData); //so we shallow copied array as both are diffrent in result
console.log(kateData, correctedKateData);
*/

/*
//////////working with map
const euroToUSD = 1.1;
let USDMovement = movements.map(function (currentElement) {
  return currentElement * euroToUSD;
});
console.log(USDMovement);

USDMovement = movements.map(currentElement => currentElement * euroToUSD);
console.log(USDMovement);
*/

////////////////////////////calculating maxvalue from array using reduce method
/*
const findMaxValue = function (movements) {
  return movements.reduce(
    (acc, currentValue) => (acc < currentValue ? currentValue : acc),
    0
  );
};
console.log(findMaxValue(movements));
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the
 dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge.
 If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const calcAverageHumanAge = function (dogsAge) {
  let humanAge = dogsAge.map(dogAge =>
    dogAge <= 2 ? 2 * dogAge : 16 + dogAge * 4
  );
  console.log(humanAge);
  let adultDogs = dogsAge.filter((dogAge, index) => humanAge[index] < 18);
  console.log(adultDogs);
  let totalAdultDogs = adultDogs.length;
  let averageAdultDogAge = adultDogs.reduce(
    (acc, adultDogAge) => acc + adultDogAge / totalAdultDogs,
    0
  );
  console.log(averageAdultDogAge);
};

calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property.
   Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the
   weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to 
   find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little 
   ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and
   Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are 
   inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10).
        Basically, the current portion should be between 90% and 110% of the recommended portion.


GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1
dogs.forEach(function (dog) {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});

//2
console.log(
  dogs.reduce((acc, dog) => {
    if (dog.owners.includes('Sarah')) acc = dog;
    return acc;
  }, {})
);

//3
let ownersEatTooMuch = dogs
  .filter(dog => dog.recommendedFood * 1.1 < dog.curFood)
  .flatMap(dog => dog.owners);

let ownersEatTooLittle = dogs
  .filter(dog => dog.recommendedFood * 0.9 > dog.curFood)
  .flatMap(dog => dog.owners);

//4
console.log(ownersEatTooMuch.join(' and ') + ' dogs eat too much!');
console.log(ownersEatTooLittle.join(' and ') + ' dogs eat too little!');

//6
const OkayFood = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(OkayFood));

//7
let HealthDogs = dogs.filter(OkayFood);
console.log(HealthDogs);

//8
let dogsSorted = dogs
  .slice()
  .sort(
    (currentDog, nextDog) =>
      currentDog.recommendedFood - nextDog.recommendedFood
  );
console.log(dogsSorted);