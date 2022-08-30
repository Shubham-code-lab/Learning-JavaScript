'use strict';

let random_number = Math.trunc(Math.random() * 20) + 1;  
let chances = 20;

const updateMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  let newGuess = Number(document.querySelector('.guess').value);  //conversion reqired as it return string even if type of input ifled is number
  if (chances > 0) {
    if (!newGuess) {
      updateMessage('Plz enter Valid Number');
    } else if (newGuess === random_number) {
      updateMessage('Your Guess is Correct');
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.number').style.width = '20rem';
      document.querySelector('.number').textContent = String(random_number);
      if (chances > Number(document.querySelector('.highscore').textContent)) {
        document.querySelector('.highscore').textContent = String(chances);
      }
    } else if (newGuess != random_number) {
      updateMessage(
        newGuess < random_number
          ? 'Your Guess is Low 📉'
          : 'Your Guess is High 📈'
      );
      chances--;
      document.querySelector('.score').textContent = String(chances);
    }
  } else {
    updateMessage('Game Over You Lose');
  }
});

document.querySelector('.again').addEventListener('click', function () {
  random_number = Math.trunc(Math.random() * 20) + 1;
  chances = 20;
  updateMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('.score').textContent = String(chances);
});
