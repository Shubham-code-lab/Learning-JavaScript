'use strict';

let player1Score = document.getElementById('score--0');
let player2Score = document.getElementById('score--1');
let player1Current = document.getElementById('current--0');
let player2Current = document.getElementById('current--1');
let diceImg = document.querySelector('.dice');

diceImg.classList.add('hidden');

player1Score.textContent = 0;
player2Score.textContent = 0;

let activePlayer = 0;
let currentScore = 0;
let gameOver = false;

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (!gameOver) {
    diceImg.classList.remove('hidden');
    let draw = Math.trunc(Math.random() * 6) + 1;
    document.querySelector('.dice').src = `dice-${draw}.png`;
    if (draw === 1) {
      currentScore = 0;
      hold();
    } else {
      currentScore += draw;
      document.getElementById('current--' + activePlayer).textContent =
        currentScore;
    }
  }
});

const hold = function () {
  let winner;
  if (!gameOver) {
    winner = activePlayer;
    let activePlayerScore = document.getElementById('score--' + activePlayer);
    let highScore = Number(activePlayerScore.textContent);
    let newScore = highScore + currentScore;
    document.getElementById('score--' + activePlayer).textContent = newScore;
    gameOver = newScore >= 20 ? true : false;
    document.getElementById('current--' + activePlayer).textContent = 0;
    document
      .querySelector('.player--' + activePlayer)
      .classList.remove('player--active');
    activePlayer = activePlayer ? 0 : 1;
    document
      .querySelector('.player--' + activePlayer)
      .classList.add('player--active');
  }
  if (gameOver) {
    document.getElementById('name--' + winner).textContent =
      'PLayer ' + (winner + 1) + ' Win ';
  }
};

document.querySelector('.btn--hold').addEventListener('click', hold);

document.querySelector('.btn--new').addEventListener('click', function () {
  diceImg.classList.add('hidden');
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  gameOver = false;
  activePlayer = 0;
  currentScore = 0;
  document.querySelector('.player--' + 0).classList.add('player--active');
  document.querySelector('.player--' + 1).classList.remove('player--active');
});
