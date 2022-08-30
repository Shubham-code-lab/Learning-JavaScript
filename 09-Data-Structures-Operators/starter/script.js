'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const dayOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

const openingHours = {
  [dayOfWeek[4]]: {
    open: 12,
    close: 22,
  },
  [dayOfWeek[5]]: {
    open: 11,
    close: 23,
  },
  [dayOfWeek[6]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  openingHours,
  //OR
  //open : openingHours,
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order(starter_SrNo, mainMenu_SrNo) {
    return [this.starterMenu[starter_SrNo], this.mainMenu[mainMenu_SrNo]];
  },

  deliverOrder({
    main: mainIndex,
    name: CustomerName = 'unknown',
    address,
    start: StartIndex = 3,
  }) {
    console.log(
      `Customer Name ${CustomerName} \nstarter order ${this.starterMenu[StartIndex]} \nMain order ${this.mainMenu[mainIndex]} \naddress ${address}`
    );
  },
  orderPasta(ing1, ing2, ing3) {
    console.log(`Your Pasta contain ingredient ${ing1}, ${ing2} and ${ing3}`);
  },

  orderPizza(mainIngredient, ...otherIndredient) {
    console.log(mainIngredient);
    console.log(otherIndredient);
  },
};

//Object key values
for (const key of Object.keys(restaurant.openingHours)) {
  console.log(key);
}

for (const val of Object.values(restaurant.openingHours)) {
  console.log(val.open, ' ', val.close);
  console.log(val);
}

for (const [day, { open, close }] of Object.entries(restaurant.openingHours)) {
  console.log('On :' + day + ' open at :' + open + ' close at :' + close);
}

//Optional Chainind
/*
for (const day of dayOfWeek) {
  console.log(
    `on ${day} our restaurant is ${
      restaurant.openingHours[day]?.open ?? 'Closed'
    }`
  );
}

console.log(restaurant.order?.(0, 1) ?? "Method don't exist");

const user = [{ name: 'Shubham', email: 'shubham@gmail.com' }];
console.log(user[0]?.name ?? 'User array empty');
*/

//Spread Operator
/*
const soarr = [67, 9, 3];
const badNewArr = [1, 2, soarr[0], soarr[1], soarr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...soarr];
console.log(newArr);

console.log(...soarr);

const ingArr = [
  prompt('Enter Your First Ingerdient'),
  prompt('Enter Your Fourth Ingerdient'),
  prompt('Enter Your Third Ingerdient'),
];
restaurant.orderPasta(...ingArr);
*/

//Rest Operator
//restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');

//for-of Loop
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item);

for (const item of menu.entries()) console.log(item);

for (const [i, ele] of menu.entries())
  console.log(`index: ${i} element:${ele}`);
*/

// Object Destructuring
/*
restaurant.deliverOrder({
  //creating and passing object as argumnet
  name: 'Shubham Shinde',
  main: 1,
  address: 'Umbraj tal: karad',
});

//Variable creation and accessing also trying to access object which are not present gives undefine value
const {
  openingHours: {
    thu: { open: op1 = 0, close: cl1 = 0 },
    fri: { open: op2 = 0, close: cl2 = 0 },
    unknownObj,
  },
} = restaurant;

console.log(op1, cl1, op2, cl2, unknownObj);
*/

//re-assigning variable value
/*
let name = 'Shubham';
let location = 'Umbraj';
({ name, location } = restaurant);
console.log(name, location);

let temp1 = 999;
let temp2 = 100;
const obj = { temp1: 67, temp2: 4 };
({ temp1, temp2 } = obj);
console.log(temp1, temp2);
*/

//Array Destructuring
/*
const arr = [45, 78, 23, 89];
const [a = 1, , , b = 1, c = 'no value'] = arr; //accessing array and default value
console.log(a, b, c);

const arr2 = [56, 34, [2, 4, 6]]; //nested array
let [x = 1, , [, y = 1]] = arr2; // accessing nexted array
console.log(`Before swaping ${x} , ${y}`);
[x, y] = [y, x]; // swapping two number
console.log(`Before swaping ${x} , ${y}`);
*/

// Coding Challenge #1

/* 
We're building a football betting app (soccer for my American friends 😅)!

Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:

1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2') 
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.

TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's continue with our football betting app!

1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉

BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }

GOOD LUCK 😀
*/

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

//Solution 2
/*
//1
for (const [goal, player] of game.scored.entries())
  console.log(`player :- ${player} scored :- ${goal + 1}`);

//2
let sum = 0;
for (let temp of Object.values(game.odds)) sum += temp;
console.log(`average of odds is :- ${sum / 3}`);

//3
for (let [name, score] of Object.entries(game.odds)) {
  name === 'x'
    ? console.log(`Odd of draw: ${score}`)
    : console.log(`Odd of victory ${game[name]}: ${score}`);
}

//4
let newObj = {};
for (const player of game.scored) {
  newObj[player] ? newObj[player]++ : (newObj[player] = 1);
}
console.log(newObj);
*/

//Solution 1
/*
//1
const [player1, player2] = game.players;
console.log(player1, player2);

//2
const [gk, ...fieldPlayers] = player1;
console.log(gk, fieldPlayers);

//3
const allPlayers = [...player1, ...player2];
console.log(allPlayers);

//4
const players1Final = [...player1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

//5   'team1', 'draw' and 'team2'
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//6
game.printGoals = function (...players) {
  console.log('Number of score ', players.length);
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
};

game.printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
game.printGoals(...game.scored);

//7
team1 < team2 && console.log('Team1 Win');

team2 < team1 && console.log('Team2 Win');
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).

1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL

GOOD LUCK 😀
*/
/*
const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

//1
const events = new Set([...gameEvents.values()]);
console.log(events);

//2
gameEvents.delete(64);
console.log([...gameEvents]);

//3
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);

//4
for (const [min, event] of gameEvents) {
  min <= 45
    ? console.log(`[FIRST HALF] ${min}: ${event}`)
    : console.log(`[SECOND HALF] ${min}:${event}`);
}
*/

///////////////////////////////////////
// Coding Challenge #4

/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure

SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅

HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!

Afterwards, test with your own test data!

GOOD LUCK 😀
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  let variables = document.querySelector('textarea').value;
  let variableArray = variables.split('\n');
  let maxLength = 0;
  let result = [];
  for (let unTrimVaiable of variableArray) {
    let subVarElementArray = unTrimVaiable.trim().split('_');
    for (let i = 0; i < subVarElementArray.length; i++) {
      if (!i) {
        subVarElementArray[i] = subVarElementArray[i].toLowerCase();
      } else {
        subVarElementArray[i] =
          subVarElementArray[i][0].toUpperCase() +
          subVarElementArray[i].slice(1).toLowerCase();
      }
    }
    const finalVariable = subVarElementArray.join('');
    if (maxLength < finalVariable.length) maxLength = finalVariable.length;
    result.push(finalVariable);
  }
  for (let [index, element] of result.entries()) {
    console.log(element.padEnd(maxLength + 2, ' '), '✅'.repeat(index + 1));
  }
});
